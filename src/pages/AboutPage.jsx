import { usePageMeta } from "../hooks/usePageMeta";

function AboutPage() {
  usePageMeta({
    title: "About",
    description:
      "Drew White is a software engineer and data engineer based in Portland, Oregon.",
    path: "/about",
  });

  return (
    <section className="section-shell page-section">
      <div className="section-heading">
        <h2>About</h2>
        <hr className="section-rule" />
      </div>

      <article className="card about-card">
        <div className="about-grid">
          <div className="about-image-wrap">
            <img
              className="about-image"
              src="/images/IMG_7126.jpeg"
              alt="Drew White portrait"
            />
          </div>

          <div className="about-copy">
            <p>
              Drew White is a software engineer and data engineer based in
              Portland, Oregon. He builds practical systems around AI workflows,
              data infrastructure, and product delivery — currently serving as
              the lead engineer on ActionResponder, an AI platform for trademark
              law workflows.
            </p>
            <p>
              Before getting into tech, he ran a barbershop in American Fork,
              Utah. That background — moving between structure and craft,
              process and people — still shows up in how he approaches
              engineering work.
            </p>
            <p>
              Outside of work, he writes and records metal music, practices
              Danzan Ryu Jujutsu, and is usually either cooking something,
              enjoying new food or finding an excuse to enjoy what the Pacific
              Northwest has to offer.
            </p>
            <p>
              Drew lives in Portland with his wife and two daughters. He’s
              always up for a chat about tech, music, martial arts, or
              whatever’s on your mind — feel free to reach out on{" "}
              <a
                href="https://www.linkedin.com/in/drew-riley-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>{" "}
              or check out his work on{" "}
              <a
                href="https://github.com/drewwhite"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

export default AboutPage;
