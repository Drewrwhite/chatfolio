const tracks = [
  "The Infinite, Unseen",
  "Where Belief Turns to Bone",
  "The Weight of Stillness",
  "Emptied",
  "Epistemic Decay",
  "Perdition without Periphery",
];

function MusicPage() {
  return (
    <section className="section-shell page-section">
      <div className="section-heading">
        <h2>Music</h2>
        <hr className="section-rule" />
      </div>

      <article className="card music-card">
        <div className="music-head">
          <h2>From This Remove</h2>
          <span className="status-badge">IN PROGRESS</span>
        </div>
        <hr className="section-rule section-rule-compact" />

        <div className="ep-layout">
          <img
            src="/images/IMG_8412.PNG"
            alt="Epistemic Decay EP cover"
            className="ep-cover"
          />
          <div className="ep-details">
            <h3>Epistemic Decay</h3>
            <ol className="track-list">
              {tracks.map((track) => (
                <li key={track}>{track}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="music-links">
          <a
            className="btn btn-small btn-disabled"
            href="#"
            aria-disabled="true"
            onClick={(e) => e.preventDefault()}
          >
            Bandcamp
          </a>
          <a
            className="btn btn-small btn-disabled"
            href="#"
            aria-disabled="true"
            onClick={(e) => e.preventDefault()}
          >
            Spotify
          </a>
          <a
            className="btn btn-small btn-disabled"
            href="#"
            aria-disabled="true"
            onClick={(e) => e.preventDefault()}
          >
            Apple Music
          </a>
        </div>

        <div className="music-other-links">
          <span className="music-other-label">Other music</span>
          <a
            className="btn btn-small"
            href="https://soundcloud.com/drew-r-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            SoundCloud
          </a>
        </div>
      </article>
    </section>
  );
}

export default MusicPage;
