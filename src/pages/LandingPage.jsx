import { Link } from 'react-router-dom';

/**
 * Landing (/) — Headline, subtext, CTA to /settings.
 */
export function LandingPage() {
  return (
    <section className="landing">
      <h1 className="landing__headline">Stop Missing The Right Jobs.</h1>
      <p className="landing__subtext">
        Precision-matched job discovery delivered daily at 9AM.
      </p>
      <div className="landing__cta">
        <Link to="/settings" className="btn btn-primary">
          Start Tracking
        </Link>
      </div>
    </section>
  );
}
