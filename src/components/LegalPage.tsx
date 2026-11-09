import Navbar from './Navbar';
import Footer from './Footer';
import PageWrapper from './PageWrapper';
import PageHero from './PageHero';

interface LegalPageProps {
  title: string;
  updated: string;
  sections: { title: string; body: string }[];
}

export default function LegalPage({ title, updated, sections }: LegalPageProps) {
  return (
    <PageWrapper>
      <Navbar />
      <PageHero crumbs={[{ label: title }]} eyebrow="Legal" title={title} lead={`Last updated: ${updated}`} />
      <section className="section bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-soft">On this page</p>
              <ol className="space-y-2 border-l border-cream-200 text-sm">
                {sections.map((s, i) => (
                  <li key={s.title}>
                    <a href={`#s-${i}`} className="-ml-px block border-l-2 border-transparent pl-4 text-ink-muted hover:border-gold hover:text-navy">{s.title}</a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <div className="max-w-3xl space-y-10">
            {sections.map((s, i) => (
              <article key={s.title} id={`s-${i}`} className="scroll-mt-28">
                <h2 className="heading-md">
                  <span className="mr-3 text-gold">{String(i + 1).padStart(2, '0')}</span>{s.title}
                </h2>
                <p className="mt-3 leading-relaxed text-ink-muted">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </PageWrapper>
  );
}
