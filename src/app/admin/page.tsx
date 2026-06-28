import Link from "next/link";

const sections = [
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experiences", label: "Experiences" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/social-links", label: "Social Links" },
  { href: "/admin/funding-links", label: "Funding Links" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

export default function AdminDashboard() {
  return (
    <nav className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {sections.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className="hover:bg-muted rounded-lg border p-6 text-center"
        >
          {s.label}
        </Link>
      ))}
    </nav>
  );
}
