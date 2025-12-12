import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <h1>Hi, I'm Rishabh</h1>
          <p className="subtitle">Full Stack Developer & Problem Solver</p>
          <p className="description">
            Passionate about building beautiful, efficient, and user-friendly web applications.
            I specialize in modern web technologies and love turning ideas into reality.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="blob"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
