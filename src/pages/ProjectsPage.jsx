import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

function ProjectsPage() {
  return (
    <section className="section-shell page-section">
      <div className="section-heading">
        <h2>Projects</h2>
        <hr className="section-rule" />
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsPage;
