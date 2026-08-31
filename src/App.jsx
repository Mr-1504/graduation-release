import { useEffect, useState } from "react";
import { changelog, releaseInfo } from "./data";

const Arrow = () => <span aria-hidden="true">↗</span>;

function App() {
  const [booted, setBooted] = useState(false);
  const [rsvp, setRsvp] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 2100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!booted) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [booted]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key.toLowerCase() === "g" && e.ctrlKey) {
        e.preventDefault();
        document.querySelector("#ceremony")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!booted) return <BootScreen />;

  return (
    <div className="app">
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <header className="nav">
        <a href="#top" className="brand">TVM<span>/</span>26</a>
        <div className="nav-right">
          <span className="status"><i /> PRODUCTION</span>
          <a href="#ceremony">CEREMONY</a>
        </div>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="eyebrow">RELEASE / {releaseInfo.release}</div>
          <h1>
            TRUONG
            <br />
            <span>VAN MINH</span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-copy">
              Four years in development.
              <br />
              Now ready for release.
            </p>
            <div className="build-card">
              <div><span>BUILD</span><strong>2026.09</strong></div>
              <div><span>TYPE</span><strong>GRADUATION</strong></div>
              <div><span>STATUS</span><strong>STABLE</strong></div>
            </div>
          </div>
          <a className="scroll-link" href="#changelog">SCROLL TO RELEASE NOTES <Arrow /></a>
        </section>

        <section id="changelog" className="section">
          <SectionHead number="01" title="CHANGELOG" label="THE JOURNEY" />
          <div className="changelog">
            {changelog.map((item, index) => (
              <article className={`change-row ${index === changelog.length - 1 ? "final" : ""}`} key={item.version}>
                <div className="change-version">{item.version}</div>
                <div className="change-year">{item.year}</div>
                <div className="change-content">
                  <h3>{item.title}</h3>
                  <ul>
                    {item.items.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="dark-section">
          <div className="section">
            <SectionHead number="02" title="KNOWN ISSUES" label="DEBUG LOG" dark />
            <div className="issues-grid">
              {[
                ["#001", "Still doesn't know what he's doing with his life."],
                ["#002", "Coffee dependency remains unresolved."],
                ["#003", "Occasional nostalgia may occur."],
                ["#004", "May continue coding unnecessarily."],
                ["#005", "Graduation ceremony requires actual human presence."],
              ].map(([code, text]) => (
                <div className="issue" key={code}>
                  <span>{code}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <SectionHead number="03" title="CONTRIBUTORS" label="PEOPLE BEHIND THE BUILD" />
          <div className="contributors">
            <Contributor role="CORE MAINTAINERS" title="Family" text="The infrastructure that kept this project running for the last four years." />
            <Contributor role="TECHNICAL ADVISORS" title="Lecturers" text="For the knowledge, guidance and corrections along the way." />
            <Contributor role="DEVELOPMENT PARTNERS" title="Friends" text="For the conversations, deadlines, jokes and memories." />
            <Contributor role="CONTRIBUTORS" title="Everyone who stayed" text="For being part of this release, in ways big and small." />
          </div>
        </section>

        <section className="release-break">
          <div className="terminal-window">
            <div className="terminal-bar"><i /><i /><i /><span>build.log</span></div>
            <div className="terminal-body">
              <p><span>$</span> npm run build</p>
              <p className="muted">building graduation...</p>
              <div className="progress"><span /></div>
              <p className="success">✓ BUILD SUCCESSFUL</p>
              <p className="muted">release/2026.0 ready for production</p>
            </div>
          </div>
        </section>

        <section className="section ceremony" id="ceremony">
          <SectionHead number="04" title="DEPLOYMENT" label="THE FINAL BUILD" />
          <div className="ceremony-layout">
            <div>
              <div className="deploy-status"><i /> SCHEDULED</div>
              <h2>GRADUATION<br /><span>CEREMONY</span></h2>
              <p className="ceremony-intro">
                The final build will be deployed with the people
                who made the journey worth remembering.
              </p>
            </div>
            <div className="event-card">
              <EventRow label="DATE" value={releaseInfo.date} />
              <EventRow label="TIME" value={releaseInfo.time} />
              <EventRow label="VENUE" value={releaseInfo.venue} />
              <EventRow label="ADDRESS" value={releaseInfo.address} />
              <a className="map-button" href={releaseInfo.mapUrl} target="_blank" rel="noreferrer">
                OPEN LOCATION <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section className="rsvp-section">
          <div className="section">
            <div className="rsvp-box">
              <div className="eyebrow">DEPLOYMENT CONFIRMATION</div>
              <h2>WILL YOU BE THERE<br />FOR THE FINAL DEPLOYMENT?</h2>
              {!rsvp ? (
                <div className="rsvp-actions">
                  <button onClick={() => setRsvp("yes")}>I&apos;LL BE THERE <Arrow /></button>
                  <button onClick={() => setRsvp("no")}>CAN&apos;T MAKE IT</button>
                </div>
              ) : (
                <div className="rsvp-result">
                  <span>✓</span>
                  <strong>{rsvp === "yes" ? "CONTRIBUTOR CONFIRMED" : "STATUS UPDATED"}</strong>
                  <p>{rsvp === "yes" ? "See you at the ceremony." : "Thanks for being part of the journey."}</p>
                  <button className="reset" onClick={() => setRsvp(null)}>CHANGE RESPONSE</button>
                </div>
              )}
            </div>
          </div>
        </section>

        <footer className="footer">
          <div>
            <div className="eyebrow">RELEASE {releaseInfo.release}</div>
            <h2>STABLE.</h2>
          </div>
          <div className="footer-meta">
            <span>MAINTAINER / {releaseInfo.name.toUpperCase()}</span>
            <span>RELEASED / 2026</span>
            <span>STATUS / PRODUCTION</span>
          </div>
          <p className="next-version">This is not the end.<br />It&apos;s just the next version.</p>
          <div className="footer-bottom">
            <span>© 2026 TVM</span>
            <span>v2027 → ?</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

function BootScreen() {
  const lines = [
    "[ OK ] memories",
    "[ OK ] friendships",
    "[ OK ] sleepless nights",
    "[ OK ] exams",
    "[ OK ] projects",
    "[ OK ] research",
    "[ OK ] 4 years",
  ];
  return (
    <div className="boot">
      <div className="boot-inner">
        <div className="boot-brand">TRUONG-VAN-MINH / graduation.release</div>
        <div className="boot-lines">
          {lines.map((x, i) => <div key={x} style={{ animationDelay: `${i * 0.13}s` }}>{x}</div>)}
        </div>
        <div className="boot-final">BUILD SUCCESSFUL <span>release/2026.0</span></div>
      </div>
    </div>
  );
}

function SectionHead({ number, title, label, dark = false }) {
  return (
    <div className={`section-head ${dark ? "dark" : ""}`}>
      <span>{number}</span>
      <h2>{title}</h2>
      <span>{label}</span>
    </div>
  );
}

function Contributor({ role, title, text }) {
  return (
    <article className="contributor">
      <span>{role}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function EventRow({ label, value }) {
  return (
    <div className="event-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;