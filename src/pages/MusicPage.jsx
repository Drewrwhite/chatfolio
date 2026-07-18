import {
  SiBandcamp,
  SiSpotify,
  SiApplemusic,
  SiSoundcloud,
} from "react-icons/si";

const tracks = [
  "Infinite, unseen",
  "From this remove",
  "Tide of decay",
  "Hollowed faces",
  "Choked by earth",
  "The red mouth",
  "Ground (Celtic Frost cover)",
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
          <h2>WightDross</h2>
          <span className="status-badge">IN PROGRESS</span>
        </div>
        <hr className="section-rule section-rule-compact" />

        <div className="music-cta">
          <span className="eyebrow">Now Live</span>
          <a
            className="link-underline"
            href="https://wightdrossmusic.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit WightDrossMusic.com ↗︎
          </a>
        </div>

        <div className="ep-layout">
          <img
            src="/images/WIGHTDROSS.png"
            alt="From this remove EP cover"
            className="ep-cover"
          />
          <div className="ep-details">
            <h3>From this remove</h3>
            <ol className="track-list">
              {tracks.map((track) => (
                <li key={track}>{track}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="listen-links">
          <span
            className="listen-links__link is-disabled"
            aria-disabled="true"
            title="Bandcamp — coming soon"
          >
            <SiBandcamp />
            <span className="sr-only">Bandcamp (coming soon)</span>
          </span>
          <span
            className="listen-links__link is-disabled"
            aria-disabled="true"
            title="Spotify — coming soon"
          >
            <SiSpotify />
            <span className="sr-only">Spotify (coming soon)</span>
          </span>
          <span
            className="listen-links__link is-disabled"
            aria-disabled="true"
            title="Apple Music — coming soon"
          >
            <SiApplemusic />
            <span className="sr-only">Apple Music (coming soon)</span>
          </span>
          <a
            className="listen-links__link"
            href="https://soundcloud.com/drew-r-white"
            target="_blank"
            rel="noopener noreferrer"
            title="SoundCloud"
          >
            <SiSoundcloud />
            <span className="sr-only">SoundCloud</span>
          </a>
        </div>
      </article>
    </section>
  );
}

export default MusicPage;
