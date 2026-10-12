import { useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3000/api/analyze";

const lessons = [
  {
    number: "01",
    category: "SCAM AWARENESS",
    title: "Recognising phishing",
    description:
      "Learn to recognise suspicious messages, fake websites, and online tricks.",
    icon: "⌕",
  },
  {
    number: "02",
    category: "ACCOUNT SECURITY",
    title: "Protect your accounts",
    description:
      "Discover practical ways to strengthen your accounts and protect your privacy.",
    icon: "◇",
  },
  {
    number: "03",
    category: "SAFE BROWSING",
    title: "Browse with confidence",
    description:
      "Build safer habits when visiting websites, downloading files, and clicking links.",
    icon: "↗",
  },
];

function App() {
  const [easyMode, setEasyMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [checking, setChecking] = useState(false);
  const [checkerError, setCheckerError] = useState("");
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactNotice, setContactNotice] = useState("");

  async function analyzeMessage(event) {
    event.preventDefault();

    if (!message.trim()) {
      setCheckerError("Please enter a message to analyse.");
      setAnalysis(null);
      return;
    }

    setChecking(true);
    setCheckerError("");
    setAnalysis(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message.trim() }),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message || "The message could not be analysed."
        );
      }

      setAnalysis(data);
    } catch {
      setCheckerError(
        "We couldn't reach the CYBERA API. Please make sure your backend is running on port 3000 and try again."
      );
    } finally {
      setChecking(false);
    }
  }

  function handleContactSubmit(event) {
    event.preventDefault();

    setContactNotice(
      "Your form passed browser validation, but this demo does not send messages yet. A contact service must be connected first."
    );
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className={`cybera-app ${easyMode ? "easy-mode" : ""}`}>
      {/* Navigation */}
      <header className="navbar">
        <a href="#home" className="brand" onClick={closeMenu}>
          <span className="brand-icon">⬡</span>
          <span>
            CYBERA<span className="brand-dot">.</span>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <a href="#home" onClick={closeMenu}>
            Home
          </a>
          <a href="#tools" onClick={closeMenu}>
            Security Tools
          </a>
          <a href="#learn" onClick={closeMenu}>
            Learn
          </a>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="easy-toggle"
            type="button"
            onClick={() => setEasyMode(!easyMode)}
          >
            {easyMode ? "Standard Mode" : "Easy Mode"}
          </button>

          <a href="#tools" className="button button-primary nav-cta">
            Get Started <span>→</span>
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero page-container" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              YOUR SAFETY. YOUR CONFIDENCE.
            </span>

            <h1>
              Cybersecurity
              <br />
              <span>Made Simple.</span>
            </h1>

            <p className="hero-description">
              Understand online threats, recognise suspicious messages,
              and learn how to protect yourself online — all in one place.
            </p>

            <div className="hero-buttons">
              <a href="#tools" className="button button-primary">
                Explore Security Tools <span>→</span>
              </a>

              <a href="#learn" className="button button-secondary">
                Start Learning
              </a>
            </div>

            <div className="trust-note">
              <span className="status-dot" />
              Making online safety easier for everyone.
            </div>

            <div className="hero-proof">
              <div className="proof-icon">✓</div>
              <div>
                <strong>Knowledge is protection.</strong>
                <span>Start building safer digital habits today.</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-orb orb-one" />
            <div className="visual-orb orb-two" />

            <div className="security-card">
              <div className="security-card-top">
                <div className="security-symbol">⬡</div>
                <span className="card-label">CYBERA SECURITY</span>
              </div>

              <span className="security-label">YOUR DIGITAL SAFETY</span>
              <h2>
                Stay alert.
                <br />
                <span>Stay protected.</span>
              </h2>

              <p>Small steps. Safer digital habits.</p>

              <div className="security-divider" />

              <div className="security-status">
                <span className="status-dot" />
                Awareness starts here
              </div>

              <div className="card-decoration">C</div>
            </div>

            <div className="floating-card floating-top">
              <span className="floating-icon">✓</span>
              <div>
                <strong>Think before you click</strong>
                <small>Check unexpected messages</small>
              </div>
            </div>

            <div className="floating-card floating-bottom">
              <span className="floating-icon">↗</span>
              <div>
                <strong>Learn every day</strong>
                <small>Build safer online habits</small>
              </div>
            </div>
          </div>
        </section>

        {/* Quick introduction */}
        <section className="intro-strip">
          <div className="intro-strip-inner page-container">
            <div>
              <span className="intro-number">01</span>
              <p>Recognise suspicious activity</p>
            </div>
            <div>
              <span className="intro-number">02</span>
              <p>Understand online risks</p>
            </div>
            <div>
              <span className="intro-number">03</span>
              <p>Make safer digital decisions</p>
            </div>
          </div>
        </section>

        {/* Security tools */}
        <section className="section page-container" id="tools">
          <div className="section-heading">
            <div>
              <span className="eyebrow">YOUR SECURITY HUB</span>
              <h2>What would you like to do today?</h2>
              <p>Simple tools and useful knowledge for safer online experiences.</p>
            </div>
            <span className="section-index">01 / TOOLS</span>
          </div>

          <div className="tools-grid">
            <a href="#scam-checker" className="tool-card">
              <div className="tool-card-top">
                <div className="tool-icon blue-icon">⌕</div>
                <span className="card-arrow">↗</span>
              </div>
              <span className="availability available">
                <span /> Available
              </span>
              <h3>Check for Scams</h3>
              <p>
                Examine a suspicious message for common warning signs and
                learn what to watch out for.
              </p>
              <span className="text-link">
                Check a message <span>→</span>
              </span>
            </a>

            <article className="tool-card">
              <div className="tool-card-top">
                <div className="tool-icon purple-icon">✳</div>
                <span className="card-arrow">↗</span>
              </div>
              <span className="availability coming-soon">
                <span /> Coming soon
              </span>
              <h3>Ask CYBERA AI</h3>
              <p>
                Get beginner-friendly explanations of cybersecurity
                concepts and common online threats.
              </p>
              <span className="text-link muted-link">
                In development
              </span>
            </article>

            <a href="#learn" className="tool-card">
              <div className="tool-card-top">
                <div className="tool-icon green-icon">▤</div>
                <span className="card-arrow">↗</span>
              </div>
              <span className="availability available">
                <span /> Explore lessons
              </span>
              <h3>Learn Cyber Safety</h3>
              <p>
                Explore practical advice that helps you develop safer
                online habits, one step at a time.
              </p>
              <span className="text-link">
                Start learning <span>→</span>
              </span>
            </a>
          </div>
        </section>

        {/* Scam checker */}
        <section className="checker-section" id="scam-checker">
          <div className="checker-layout page-container">
            <div className="checker-copy">
              <span className="eyebrow">
                <span className="eyebrow-line" />
                CHECK BEFORE YOU TRUST
              </span>

              <h2>
                Something doesn't
                <br />
                <span>feel right?</span>
              </h2>

              <p>
                Scammers often use urgency, fake prizes, and suspicious
                requests to trick people. Examine a message before deciding
                how to respond.
              </p>

              <div className="checker-benefit">
                <span>✓</span>
                Identify common warning signs
              </div>
              <div className="checker-benefit">
                <span>✓</span>
                Understand possible risks
              </div>
              <div className="checker-benefit">
                <span>✓</span>
                Get practical next steps
              </div>

              <div className="privacy-note">
                <span>🔒</span>
                Never paste passwords, PINs, or verification codes.
              </div>
            </div>

            <div className="checker-panel">
              <div className="checker-panel-header">
                <div className="checker-panel-logo">⬡</div>
                <div>
                  <strong>Message Checker</strong>
                  <span>CYBERA SECURITY TOOL</span>
                </div>
                <span className="checker-header-dot" />
              </div>

              <form className="checker-form" onSubmit={analyzeMessage}>
                <label htmlFor="suspicious-message">
                  Paste the message you want to examine
                </label>

                <textarea
                  id="suspicious-message"
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    setCheckerError("");
                    setAnalysis(null);
                  }}
                  placeholder="Paste a suspicious SMS, email, or message here..."
                  rows={5}
                  maxLength={5000}
                  required
                />

                <div className="input-footer">
                  <span>Do not include confidential information.</span>
                  <span>{message.length}/5000</span>
                </div>

                <button
                  className="button button-primary checker-submit"
                  type="submit"
                  disabled={checking}
                >
                  {checking ? "Analysing message..." : "Analyze Message"}
                  {!checking && <span>→</span>}
                </button>
              </form>

              {checkerError && (
                <div className="result-message result-error" role="alert">
                  <strong>Unable to complete the check</strong>
                  <p>{checkerError}</p>
                </div>
              )}

              {analysis && (
                <div className="analysis-result" aria-live="polite">
                  <div className="result-heading">
                    <span className="result-check-icon">✓</span>
                    <div>
                      <strong>Analysis complete</strong>
                      <span>Review the findings below.</span>
                    </div>
                  </div>

                  <div className="result-risk">
                    <span>Risk assessment</span>
                    <strong>
                      {analysis.riskLevel || "Review the findings"}
                    </strong>
                  </div>

                  {analysis.explanation && (
                    <div className="result-block">
                      <strong>What this means</strong>
                      <p>{analysis.explanation}</p>
                    </div>
                  )}

                  {Array.isArray(analysis.warningSigns) &&
                    analysis.warningSigns.length > 0 && (
                      <div className="result-block">
                        <strong>Warning signs found</strong>
                        <ul>
                          {analysis.warningSigns.map((sign, index) => (
                            <li key={`${sign}-${index}`}>{sign}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {analysis.recommendation && (
                    <div className="result-block">
                      <strong>Recommended next step</strong>
                      <p>{analysis.recommendation}</p>
                    </div>
                  )}

                  <p className="result-disclaimer">
                    This automated check may miss threats. A message with no
                    detected warning signs is not guaranteed to be safe.
                  </p>
                </div>
              )}

              <div className="checker-disclaimer">
                CYBERA checks for common warning signs. It cannot guarantee
                that a message is legitimate or fraudulent.
              </div>
            </div>
          </div>
        </section>

        {/* Learning centre */}
        <section className="section page-container" id="learn">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CYBER SAFETY ACADEMY</span>
              <h2>Knowledge is your first line of defence.</h2>
              <p>
                Learn practical skills that help you make smarter decisions online.
              </p>
            </div>
            <span className="section-index">02 / LEARN</span>
          </div>

          <div className="learning-grid">
            {lessons.map((lesson) => (
              <article className="lesson-card" key={lesson.number}>
                <div className={`lesson-art lesson-art-${lesson.number}`}>
                  <span className="lesson-number">{lesson.number}</span>
                  <span className="lesson-art-icon">{lesson.icon}</span>
                  <span className="lesson-art-caption">CYBERA ACADEMY</span>
                </div>

                <div className="lesson-info">
                  <span className="lesson-category">{lesson.category}</span>
                  <h3>{lesson.title}</h3>
                  <p>{lesson.description}</p>
                  <a href="#daily-tip" className="text-link">
                    Explore safety tips <span>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Daily tip */}
        <section className="tip-section page-container" id="daily-tip">
          <div className="tip-symbol">✦</div>
          <div className="tip-content">
            <span className="eyebrow">YOUR DAILY SECURITY TIP</span>
            <h2>Pause before you click.</h2>
            <p>
              Unexpected links can lead to fake websites. Check the sender
              and website address independently before sharing information.
            </p>
          </div>
          <div className="tip-side">
            <span className="tip-side-label">REMEMBER</span>
            <strong>Stop.</strong>
            <strong>Check.</strong>
            <strong>Then act.</strong>
          </div>
        </section>

        {/* About */}
        <section className="about-section section page-container" id="about">
          <div className="about-mark">C<span>.</span></div>

          <div className="about-copy">
            <span className="eyebrow">ABOUT CYBERA</span>
            <h2>Safer people. A safer internet.</h2>
            <p>
              CYBERA is being developed to make cybersecurity knowledge
              easier to understand and more accessible to everyday users.
              Our goal is to turn complicated security concepts into practical
              guidance anyone can learn from.
            </p>
            <a href="#contact" className="button button-secondary">
              Get in touch <span>→</span>
            </a>
          </div>
        </section>

        {/* Contact */}
        <section className="contact-section" id="contact">
          <div className="contact-layout page-container">
            <div className="contact-copy">
              <span className="eyebrow">
                <span className="eyebrow-line" />
                LET'S CONNECT
              </span>

              <h2>
                Have a question?
                <br />
                <span>Let's talk.</span>
              </h2>

              <p>
                Have feedback, a suggestion, or a question about CYBERA?
                We'd love to hear from you.
              </p>

              <div className="contact-detail">
                <span className="contact-detail-icon">@</span>
                <div>
                  <strong>General enquiries</strong>
                  <p>Use the contact form to prepare your message.</p>
                </div>
              </div>

              <div className="contact-detail">
                <span className="contact-detail-icon">◇</span>
                <div>
                  <strong>Built with purpose</strong>
                  <p>CYBERA · AAT Tech Solutions</p>
                </div>
              </div>

              <div className="contact-note">
                Please don't submit passwords, financial details, or other
                sensitive information through this form.
              </div>
            </div>

            <div className="contact-panel">
              <div className="contact-panel-heading">
                <h3>Send us a message</h3>
                <p>Complete the fields below.</p>
              </div>

              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-field">
                  <label htmlFor="contact-name">Your name</label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your name"
                    value={contact.name}
                    onChange={(event) => {
                      setContact({ ...contact, name: event.target.value });
                      setContactNotice("");
                    }}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="contact-email">Email address</label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={contact.email}
                    onChange={(event) => {
                      setContact({ ...contact, email: event.target.value });
                      setContactNotice("");
                    }}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="contact-message">Your message</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="How can we help?"
                    value={contact.message}
                    onChange={(event) => {
                      setContact({
                        ...contact,
                        message: event.target.value,
                      });
                      setContactNotice("");
                    }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="button button-primary contact-submit"
                >
                  Prepare Message <span>→</span>
                </button>

                {contactNotice && (
                  <p className="contact-notice" role="status">
                    {contactNotice}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main page-container">
          <div className="footer-brand-column">
            <a href="#home" className="brand footer-brand">
              <span className="brand-icon">⬡</span>
              <span>
                CYBERA<span className="brand-dot">.</span>
              </span>
            </a>

            <p>Knowledge. Awareness. Safer tomorrows.</p>
          </div>

          <div className="footer-column">
            <h4>Explore</h4>
            <a href="#home">Home</a>
            <a href="#tools">Security tools</a>
            <a href="#learn">Learn</a>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <a href="#about">About CYBERA</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-column">
            <h4>Stay safe online</h4>
            <p>Pause, check, and think before sharing information.</p>
            <a href="#daily-tip" className="footer-tip-link">
              Read our safety tip →
            </a>
          </div>
        </div>

        <div className="footer-bottom page-container">
          <span>
            &copy; {new Date().getFullYear()} CYBERA · AAT Tech Solutions
          </span>
          <span>Cybersecurity Made Simple</span>
        </div>
      </footer>
    </div>
  );
}

export default App;