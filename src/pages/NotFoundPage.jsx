import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";

function NotFoundPage() {
  usePageMeta({
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist.",
    path: "/404",
    noindex: true,
  });

  return (
    <section className="section-shell page-section">
      <div className="section-heading">
        <h2>404</h2>
        <hr className="section-rule" />
      </div>

      <article className="card about-card">
        <p>The page you're looking for doesn't exist, or it may have moved.</p>
        <p>
          <Link className="link-underline" to="/">
            Back to home ↗︎
          </Link>
        </p>
      </article>
    </section>
  );
}

export default NotFoundPage;
