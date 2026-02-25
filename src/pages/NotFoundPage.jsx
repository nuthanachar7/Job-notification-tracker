/**
 * 404 — never show a blank screen.
 */

export function NotFoundPage() {
  return (
    <section className="page-placeholder">
      <h1>Page Not Found</h1>
      <p className="context-subtext">
        The page you are looking for does not exist.
      </p>
    </section>
  );
}
