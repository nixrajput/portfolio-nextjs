import { Reveal } from "@/components/motion/Reveal";
import { SkillCard } from "./SkillCard";

export type SkillRow = {
  name: string;
  iconPath: string;
  category: string;
  order: number;
};

function groupByCategory(skills: SkillRow[]) {
  const map = new Map<string, SkillRow[]>();
  for (const s of [...skills].sort((a, b) => a.order - b.order)) {
    const list = map.get(s.category) ?? [];
    list.push(s);
    map.set(s.category, list);
  }
  return [...map.entries()];
}

export function Skills({ skills }: { skills: SkillRow[] }) {
  const groups = groupByCategory(skills);

  return (
    <section id="skills" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-foreground/50 mb-2 font-mono text-sm tracking-widest uppercase">
            Skills
          </p>
          <h2 className="mb-12 text-3xl font-bold sm:text-4xl">Tools I work with</h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {groups.map(([category, items], i) => (
            <Reveal key={category} delay={i * 0.05}>
              <div className="border-foreground/10 bg-foreground/[0.02] rounded-3xl border p-6">
                <h3 className="text-foreground/70 mb-4 text-sm font-semibold">{category}</h3>
                <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {items.map((s) => (
                    <SkillCard key={s.name} name={s.name} iconPath={s.iconPath} />
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
