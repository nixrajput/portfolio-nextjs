export function AdminPageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div>
      <h1 className="text-foreground text-2xl font-semibold">{title}</h1>
      {description ? <p className="text-muted mt-1 text-sm">{description}</p> : null}
    </div>
  );
}
