import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a passionate developer with expertise in full-stack web development. 
              I love creating elegant solutions to complex problems and building applications 
              that make a difference.
            </p>
            <p>
              With experience in modern technologies like React, Node.js, and various databases, 
              I'm dedicated to writing clean, maintainable code and following best practices.
            </p>
            <p>
              When I'm not coding, you can find me learning new technologies, contributing to 
              open-source projects, or exploring the latest web development trends.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat">
              <h3>5+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat">
              <h3>50+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat">
              <h3>100%</h3>
              <p>Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
