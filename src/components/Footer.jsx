function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-icons" aria-label="Social links">
        <a
          href="https://www.linkedin.com/in/drew-riley-white/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5ZM.5 8h4V24h-4V8Zm7 0h3.84v2.19h.05c.53-1.01 1.84-2.08 3.79-2.08 4.05 0 4.8 2.67 4.8 6.15V24h-4v-7.7c0-1.84-.03-4.2-2.56-4.2-2.57 0-2.97 2-2.97 4.07V24h-4V8Z" />
          </svg>
        </a>
        <a
          href="https://github.com/Drewrwhite"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.79 8.21 11.38.6.11.82-.26.82-.58 0-.29-.01-1.23-.02-2.23-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.83 1.23 1.83 1.23 1.08 1.84 2.82 1.31 3.51 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.48-1.34-5.48-5.96 0-1.32.47-2.41 1.23-3.26-.12-.3-.53-1.52.12-3.16 0 0 1.01-.32 3.3 1.24a11.43 11.43 0 0 1 6 0c2.29-1.56 3.29-1.24 3.29-1.24.65 1.64.24 2.86.12 3.16.77.85 1.23 1.94 1.23 3.26 0 4.63-2.82 5.65-5.5 5.95.43.37.81 1.1.81 2.22 0 1.61-.02 2.91-.02 3.31 0 .32.21.7.83.58A12.02 12.02 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
          </svg>
        </a>
      </div>
      <p className="footer-copy">Drew R. White · {year}</p>
    </footer>
  );
}

export default Footer;
