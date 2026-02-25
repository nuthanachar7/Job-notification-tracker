/**
 * Context Header: Large serif headline, one-line subtext. Clear purpose, no hype.
 */

export function ContextHeader({ title, subtext }) {
  return (
    <section className="context-header">
      <h1>{title}</h1>
      {subtext && <p className="context-subtext">{subtext}</p>}
    </section>
  );
}
