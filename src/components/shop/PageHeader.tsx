import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function PageHeader({
  crumbs,
  eyebrow,
  title,
  intro,
  children,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="bg-sand">
      <div className="container-page pb-12 pt-8 sm:pb-16">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 max-w-3xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-3 text-4xl font-semibold leading-[1.05] sm:text-[56px]">{title}</h1>
          {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
        </div>
        {children}
      </div>
    </header>
  );
}
