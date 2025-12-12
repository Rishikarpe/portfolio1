import React from 'react';
import '../styles/Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce application with product catalog, shopping cart, and payment integration.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management tool with real-time updates and team collaboration features.',
      tags: ['React', 'Firebase', 'Tailwind CSS'],
      link: '#'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A beautiful weather application with real-time data, forecasts, and multiple location support.',
      tags: ['React', 'API Integration', 'Charts.js'],
      link: '#'
    },
    {
      id: 4,
      title: 'Social Media App',
      description: 'A social networking platform with user profiles, posts, messaging, and notification system.',
      tags: ['React', 'Express', 'PostgreSQL', 'WebSocket'],
      link: '#'
    },
    {
      id: 5,
      title: 'Blog Platform',
      description: 'A modern blogging platform with markdown support, user authentication, and comments.',
      tags: ['Next.js', 'Prisma', 'PostgreSQL'],
      link: '#'
    },
    {
      id: 6,
      title: 'Analytics Dashboard',
      description: 'A comprehensive analytics dashboard for tracking metrics and generating reports.',
      tags: ['React', 'D3.js', 'Node.js', 'MongoDB'],
      link: '#'
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3>{project.title}</h3>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              <a href={project.link} className="project-link">View Project →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
