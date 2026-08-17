"use client";

import { useSyncExternalStore } from "react";
import * as Popover from "@radix-ui/react-popover";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { cn } from "@/utils/cn";
import { usePalette } from "@/hooks/usePalette";
import { PALETTES } from "@/lib/palettes";

const MODES = [
  { id: "light", label: "Light", Icon: Sun },
  { id: "dark", label: "Dark", Icon: Moon },
  { id: "system", label: "System", Icon: Monitor },
] as const;

type Mode = (typeof MODES)[number]["id"];

// useSyncExternalStore with a no-op subscribe gives false on the server and true on the
// client, so the trigger icon can stay neutral until the resolved theme is known.
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;
const useMounted = () => useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

/**
 * Light/dark/system plus the brand palette in one popover. Replaces a cycling button, which hid
 * the options and forced up to two wrong themes to reach the third.
 */
export function AppearanceMenu({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { palette, setPalette } = usePalette();
  const mounted = useMounted();

  const current = (mounted ? (theme as Mode) : "system") ?? "system";
  const TriggerIcon = (MODES.find((m) => m.id === current) ?? MODES[2]).Icon;

  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label="Appearance settings"
        className={cn(
          "text-foreground/80 hover:bg-foreground/10 hover:text-foreground grid size-9 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-deep)",
          className,
        )}
      >
        <TriggerIcon className="size-[18px]" aria-hidden suppressHydrationWarning />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={10}
          align="end"
          collisionPadding={12}
          // Same glass ground as the dialog and the nav overlay, so the site has one
          // surface language rather than a third one just for this menu.
          className="border-border dialog-pop z-50 w-60 rounded-2xl border bg-(--overlay-bg) p-3 shadow-2xl backdrop-blur-xl"
        >
          <fieldset>
            <legend className="text-muted mb-2 text-[0.65rem] font-semibold tracking-wider uppercase">
              Theme
            </legend>
            {/* Segmented control: all three states visible, so "back to system" is
                reachable in one click rather than by cycling past it. */}
            <div className="border-border grid grid-cols-3 gap-1 rounded-xl border p-1">
              {MODES.map(({ id, label, Icon }) => {
                const active = mounted && current === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTheme(id)}
                    aria-pressed={active}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-[0.7rem] font-medium transition-colors",
                      active
                        ? "bg-(--chip-surface) text-(--accent-on-chip)"
                        : "text-muted hover:bg-foreground/5 hover:text-foreground",
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                    {label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="mt-4">
            <legend className="text-muted mb-2 text-[0.65rem] font-semibold tracking-wider uppercase">
              Brand palette
            </legend>
            <div className="flex flex-col gap-0.5">
              {PALETTES.map(({ id, label, ramp }) => {
                const active = palette === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPalette(id)}
                    aria-pressed={active}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-xs font-medium transition-colors",
                      active
                        ? "bg-(--chip-surface) text-(--accent-on-chip)"
                        : "text-muted hover:bg-foreground/5 hover:text-foreground",
                    )}
                  >
                    {/* The swatch shows the actual ramp, so the choice is legible before
                        it is applied rather than being a name with no preview. */}
                    <span
                      aria-hidden
                      className="border-border flex size-5 shrink-0 overflow-hidden rounded-full border"
                    >
                      {ramp.map((hex) => (
                        <span key={hex} className="h-full flex-1" style={{ background: hex }} />
                      ))}
                    </span>
                    <span className="flex-1">{label}</span>
                    {active && <Check className="size-3.5 shrink-0" aria-hidden />}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
