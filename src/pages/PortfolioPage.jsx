import { useEffect, useMemo, useRef, useState } from 'react'
import UnicornStudioEmbed from '../components/UnicornStudioEmbed'

export default function PortfolioPage() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [isFigmaModalOpen, setIsFigmaModalOpen] = useState(false)
  const [isPastIntro, setIsPastIntro] = useState(false)

  const tracks = useMemo(
    () => [
      { label: ' 1', value: '/assets/track1.mp3' },
      { label: ' 2', value: '/assets/track2.mp3' },
      { label: ' 3', value: '/assets/track3.mp3' },
    ],
    [],
  )

  const [selectedTrack, setSelectedTrack] = useState(tracks[0]?.value ?? '/assets/track1.mp3')
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)

  const audioRef = useRef(null)
  const introRef = useRef(null)

  // Theme init + apply
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'dark'
    setTheme(currentTheme)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Body blur when modal open
  useEffect(() => {
    document.body.classList.toggle('modal-open', isFigmaModalOpen)
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [isFigmaModalOpen])

  // Intersection observer (fade-in sections)
  useEffect(() => {
    const sections = document.querySelectorAll('section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.2 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [])

  // Reveal header only after the Unicorn intro hero is scrolled past
  useEffect(() => {
    const intro = introRef.current
    if (!intro) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPastIntro(!entry.isIntersecting)
      },
      { threshold: 0.01 },
    )

    observer.observe(intro)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isPastIntro) setIsNavOpen(false)
  }, [isPastIntro])

  // Audio lifecycle
  useEffect(() => {
    audioRef.current = new Audio(selectedTrack)
    audioRef.current.volume = volume

    const handleEnded = () => {
      setIsPlaying(false)
    }

    audioRef.current.addEventListener('ended', handleEnded)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener('ended', handleEnded)
        audioRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!audioRef.current) return

    const wasPlaying = !audioRef.current.paused

    audioRef.current.pause()
    audioRef.current.currentTime = 0
    audioRef.current.src = selectedTrack

    setIsPlaying(false)

    if (wasPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          setIsPlaying(false)
        })
    }
  }, [selectedTrack])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume
  }, [volume])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const handleNavAnchorClick = (e) => {
    const anchor = e.currentTarget

    // Skip smooth scrolling for download links (exact behavior)
    if (anchor.classList.contains('download-cv')) {
      return
    }

    const href = anchor.getAttribute('href')
    if (!href || !href.startsWith('#')) return

    e.preventDefault()

    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)
    if (!targetElement) return

    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth',
    })

    setIsNavOpen(false)
  }

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          setIsPlaying(false)
        })
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  return (
    <>
      <section ref={introRef} className="intro-hero visible" aria-label="Hero">
        <UnicornStudioEmbed projectId="yExpbqWt49dHyxylZg8E" width="100vw" height="100vh" />
      </section>

      <header className={`site-header ${isPastIntro ? 'is-visible' : ''}`.trim()}>
        <nav className="container">
          <div className="nav-left">
            <a href="#" className="logo">
              Rishabh Karpe
            </a>
            <div
              className="hamburger"
              id="hamburger"
              onClick={() => setIsNavOpen((v) => !v)}
              role="button"
              aria-label="Toggle navigation menu"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setIsNavOpen((v) => !v)
              }}
            >
              ☰
            </div>
            <div
              className="theme-toggle"
              id="themeToggle"
              role="button"
              aria-label="Toggle between dark and light theme"
              onClick={toggleTheme}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') toggleTheme()
              }}
            ></div>
          </div>
          <ul className={`nav-links ${isNavOpen ? 'active' : ''}`}>
            <li>
              <a href="#home" onClick={handleNavAnchorClick}>
                Home
              </a>
            </li>
            <li>
              <a href="#skills" onClick={handleNavAnchorClick}>
                Skills
              </a>
            </li>
            <li>
              <a href="#experience" onClick={handleNavAnchorClick}>
                Experience
              </a>
            </li>
            <li>
              <a href="#in-progress" onClick={handleNavAnchorClick}>
                Projects
              </a>
            </li>
            <li>
              <a href="#figma-prototypes" onClick={handleNavAnchorClick}>
                Figma Prototypes
              </a>
            </li>
            <li>
              <a href="#footer" onClick={handleNavAnchorClick}>
                Contact
              </a>
            </li>
            <li>
              <a
                href="/assets/Rishabh_Karpe_res.pdf"
                className="download-cv"
                download="Rishabh_Karpe_res.pdf"
              >
                Download CV
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section id="home" className="hero">
        {isPastIntro ? (
          <div className="background-unicorn" aria-hidden="true">
            <UnicornStudioEmbed
              projectId="mUwWphzzKC1sPidwj9BR"
              width="100%"
              height="100%"
              className="background-unicorn-embed"
              startWhenVisible
            />
          </div>
        ) : (
          <video
            className="background-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/hero-poster.jpg"
            loading="lazy"
          >
            <source src="/bg/hero-video.mp4" type="video/mp4" />
          </video>
        )}
        <div className="section-overlay"></div>
        <div className="section-vignette"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="coder-text">IoT &amp; Software Developer</span>
              </h1>
              <p className="hero-subtitle">
                I build innovative solutions using IoT, Python, and web technologies to solve
                real-world problems like healthcare, automation, and accessibility. Passionate about
                creating impactful projects with clean code and user-centric design.
              </p>
              <a
                href="https://www.linkedin.com/in/rishabhkarpe/"
                className="download-cv"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                View LinkedIn
              </a>
            </div>
            <div className="hero-image">
              <div className="portrait">
                <img
                  src="/assets/rishabh_light.png"
                  alt="Rishabh Karpe Portrait (Light Theme)"
                  className="light-img"
                />
                <img
                  src="/assets/rishabh_dark.png"
                  alt="Rishabh Karpe Portrait (Dark Theme)"
                  className="dark-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="skills">
        <video
          className="background-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/skills-poster.jpg"
          loading="lazy"
        >
          <source src="/assets/skills-video.mp4" type="video/mp4" />
        </video>
        <div className="section-overlay"></div>
        <div className="section-vignette"></div>
        <div className="container">
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-icon">💻</div>
              <h3 className="skill-title">Programming</h3>
              <p className="skill-description">
                I develop solutions using a variety of programming languages and tools.
              </p>
              <ul className="skill-list">
                <li>Languages &amp; Tools:</li>
                <li>HTML5, CSS3, C, C++</li>
                <li>Python, Java</li>
                <li>Raspberry Pi, Automation</li>
              </ul>
            </div>

            <div className="skill-card">
              <div className="skill-icon">🌐</div>
              <h3 className="skill-title">IoT &amp; Automation</h3>
              <p className="skill-description">
                I specialize in IoT systems and automation for real-world applications.
              </p>
              <ul className="skill-list">
                <li>Key Projects:</li>
                <li>Farm Automation</li>
                <li>Home Electricity Saving System</li>
                <li>Smart Healthcare System</li>
              </ul>
            </div>

            <div className="skill-card">
              <div className="skill-icon">🎨</div>
              <h3 className="skill-title">Creative Design</h3>
              <p className="skill-description">
                I create engaging promotional materials as Creative Head at Ecesa Council.
              </p>
              <ul className="skill-list">
                <li>Experiences:</li>
                <li>Designed reels, posters, and digital content</li>
                <li>Increased audience participation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="experience">
        <video
          className="background-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/experience-poster.jpg"
          loading="lazy"
        >
          <source src="/assets/experience-video.mp4" type="video/mp4" />
        </video>
        <div className="section-overlay"></div>
        <div className="section-vignette"></div>
        <div className="container">
          <h2 className="experience-title">EXPERIENCE</h2>
          <p className="experience-subtitle">
            A summary of my professional journey, showcasing roles and achievements.
          </p>

          <div className="company-logos">
            <div className="company-logo">Improsys</div>
            <div className="company-logo">Ecesa Council</div>
            <div className="company-logo">PAN IIT Hackathon Winner</div>
          </div>

          <div className="timeline-bar">
            <div className="timeline-progress"></div>
          </div>
        </div>
      </section>

      <section id="in-progress" className="in-progress">
        <video
          className="background-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/projects-poster.jpg"
          loading="lazy"
        >
          <source src="/assets/projects-video.mp4" type="video/mp4" />
        </video>
        <div className="section-overlay"></div>
        <div className="section-vignette"></div>
        <div className="container">
          <h2 className="section-title">Top Projects</h2>
          <p className="section-subtitle">
            A showcase of my recent projects, demonstrating my skills in IoT, automation, and
            software development.
          </p>

          <div className="projects-showcase">
            <div className="project-info">
              <h3 className="project-name">Basic Communication for Paralyzed Patients</h3>
              <p className="project-type">Assistive Technology</p>
              <p className="project-description">
                Developed a system using Python, Open-CV, and Raspberry Pi to track eye movements
                of paralyzed patients, enabling basic communication via a speaker output.
              </p>
              <a
                href="https://github.com/rishikarpe/Basic-communication-for-paralysed"
                className="download-cv"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                View on GitHub
              </a>
            </div>
            <div className="project-mockup">
              <div className="mockup-tablet">
                <div className="mockup-screen"></div>
              </div>
              <div className="mockup-phone">
                <div className="mockup-screen">
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '40px',
                      height: '40px',
                      background: 'rgba(255,255,255,0.3)',
                      borderRadius: '50%',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="projects-showcase">
            <div className="project-info">
              <h3 className="project-name">IoT-Based Farm irrigation System</h3>
              <p className="project-type">IoT Solution</p>
              <p className="project-description">
                Built an IoT system for large-scale farms with sensor-driven irrigation control and
                real-time monitoring, optimizing water usage and providing data reports.
              </p>
            </div>
            <div className="project-mockup">
              <div className="mockup-tablet">
                <div className="mockup-screen"></div>
              </div>
              <div className="mockup-phone">
                <div className="mockup-screen">
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '40px',
                      height: '40px',
                      background: 'rgba(255,255,255,0.3)',
                      borderRadius: '50%',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="projects-showcase">
            <div className="project-info">
              <h3 className="project-name">
                V.I.S.T.A. AI – Vision Integrated Smart Technology Assistant
              </h3>
              <p className="project-type">Hobby Project</p>
              <p className="project-description">
                Created a multimodal AI assistant with speech recognition (Vosk), wake word
                detection (Porcupine), object detection (YOLOv4), and hand gesture recognition
                (MediaPipe). Integrated with FastAPI, Streamlit, and SocketIO for realtime
                interaction and modular control.
              </p>
            </div>
            <div className="project-mockup">
              <div className="mockup-tablet">
                <div className="mockup-screen"></div>
              </div>
              <div className="mockup-phone">
                <div className="mockup-screen">
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '40px',
                      height: '40px',
                      background: 'rgba(255,255,255,0.3)',
                      borderRadius: '50%',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="figma-prototypes" className="figma-prototypes">
        <video
          className="background-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/figma-poster.jpg"
          loading="lazy"
        >
          <source src="/assets/figma-video.mp4" type="video/mp4" />
        </video>
        <div className="section-overlay"></div>
        <div className="section-vignette"></div>
        <div className="container">
          <h2 className="section-title">Figma Prototypes</h2>
          <p className="section-subtitle">
            Explore my interactive design prototypes created in Figma, showcasing user-centric
            UI/UX solutions.
          </p>
          <button className="figma-button" id="openFigmaModal" onClick={() => setIsFigmaModalOpen(true)}>
            View Prototypes
          </button>
        </div>
      </section>

      <div
        className="modal"
        id="figmaModal"
        style={{ display: isFigmaModalOpen ? 'flex' : 'none' }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsFigmaModalOpen(false)
        }}
      >
        <div className="modal-content">
          <span
            className="modal-close"
            id="closeFigmaModal"
            onClick={() => setIsFigmaModalOpen(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setIsFigmaModalOpen(false)
            }}
          >
            ×
          </span>
          <h2>Figma Prototypes</h2>
          <p>
            Here are some of my Figma prototypes showcasing my design work. Click the links below
            to explore interactive UI/UX designs:
          </p>
          <ul className="skill-list">
            <li>
              <a
                href="https://www.figma.com/proto/R9sJdsF29AyzZVR1H82bb4/Trial2?node-id=3-3&t=Eu2gkA2MtviSSRnr-1"
                target="_blank"
                rel="noreferrer"
              >
                Healthcare Web App Prototype
              </a>
            </li>
            <li>
              <a
                href="https://www.figma.com/proto/Fi5BAy46J8tqTw69htxY1u/AgriDrip?node-id=2039-55&t=coUA71LpTzkQsqI3-1"
                target="_blank"
                rel="noreferrer"
              >
                Farm Produce Management Dashboard
              </a>
            </li>
            <li>
              <a
                href="https://blockchainvotingfrontendrishabh.vercel.app/Landing/landing.html"
                target="_blank"
                rel="noreferrer"
              >
                BlockChain Voting system
              </a>
            </li>
            <li>
              <a href="https://wpl-trial-irsg.vercel.app/start.html" target="_blank" rel="noreferrer">
                WellBeing Wave: Your Ultimate fitness Buddy
              </a>
            </li>
          </ul>
          <p>
            These prototypes demonstrate my ability to create intuitive and visually appealing
            interfaces for various applications.
          </p>
        </div>
      </div>

      <footer id="footer" className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-text">Interested in collaborating? Reach out to me!</div>
            <div className="social-dots">
              <a
                href="https://www.linkedin.com/in/rishabhkarpe/"
                className="social-dot"
                aria-label="LinkedIn profile"
              >
                <img src="/assets/linkedin.png" alt="LinkedIn" className="icon" />
              </a>
              <a href="https://github.com/rishikarpe" className="social-dot" aria-label="GitHub profile">
                <img src="/assets/github.png" alt="GitHub" className="icon" />
              </a>
              <a href="mailto:karperishabh@gmail.com" className="social-dot" aria-label="Email me">
                <img src="/assets/gmail.png" alt="Email" className="icon" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div className="vinyl-player">
        <div className="turntable-base">
          <div className="platter">
            <div className={`vinyl ${isPlaying ? 'playing' : ''}`} id="vinyl"></div>
          </div>
        </div>

        <div className="tonearm-assembly">
          <div className="tonearm-base"></div>
          <div className={`tonearm ${isPlaying ? 'playing' : ''}`} id="tonearm">
            <div className="headshell">
              <div className="needle"></div>
            </div>
          </div>
        </div>

        <div className="controls-panel">
          <button id="playPauseBtn" onClick={togglePlayPause}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <select id="trackSelector" value={selectedTrack} onChange={(e) => setSelectedTrack(e.target.value)}>
            {tracks.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="volume-control">
          <input
            type="range"
            id="volumeSlider"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>
      </div>
    </>
  )
}
