import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
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
    <Section id="skills" className="scroll-mt-24">
      <Reveal>
        <SectionHeading eyebrow="Skills" title="Tools I work with" />
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 md:items-stretch">
        {groups.map(([category, items], i) => (
          <Reveal key={category} delay={i * 0.06} className="h-full">
            <Card className="flex h-full flex-col p-6">
              <h3 className="text-foreground/70 mb-4 text-sm font-semibold tracking-wide uppercase">
                {category}
              </h3>
              <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {items.map((s) => (
                  <SkillCard key={s.name} name={s.name} iconPath={s.iconPath} />
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Skills;
