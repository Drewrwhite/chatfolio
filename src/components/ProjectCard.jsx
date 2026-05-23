function ProjectCard({ title, description, image, tags, links }) {
  return (
    <article className="card project-card">
      <img className="project-image" src={image} alt={title} />
      <div className="project-body">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="project-tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="project-links">
          {links.map((link) => (
            <a
              key={`${title}-${link.label}`}
              className="btn btn-small"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
