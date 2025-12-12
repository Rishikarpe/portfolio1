import React from 'react';
import '../styles/Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Vue.js', 'Next.js']
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'Python', 'MongoDB', 'PostgreSQL', 'Firebase']
    },
    {
      category: 'Tools & Others',
      skills: ['Git', 'Docker', 'REST APIs', 'GraphQL', 'AWS', 'VS Code']
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>{category.category}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
