import React, { useEffect, useState } from "react";
import {
  releaseInfo,
  bootLogs,
  changelog,
  contributors,
} from "./data";
import {
  Terminal,
  ArrowUpRight,
  ArrowDown,
  MapPin,
  CheckCircle2,
  X,
  ExternalLink,
  Globe,
  ChevronDown,
  ChevronUp,
  SkipForward,
} from "lucide-react";

export default function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("graduation_lang") || "vi";
  });
  const [isBooted, setIsBooted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeContributor, setActiveContributor] = useState(null);
  const [rsvpStatus, setRsvpStatus] = useState(() => {
    return localStorage.getItem("graduation_rsvp") || null;
  });
  const [showTerminalModal, setShowTerminalModal] = useState(false);
  const [terminalCommand, setTerminalCommand] = useState("");
  const [terminalOutput, setTerminalOutput] = useState(null);

  // Accordion state for Changelog (default latest version open)
  const [expandedVersions, setExpandedVersions] = useState({
    "v2026.0": true,
  });

  const toggleVersion = (version) => {
    setExpandedVersions((prev) => ({
      ...prev,
      [version]: !prev[version],
    }));
  };

  // Enable body overflow once booted
  useEffect(() => {
    if (!isBooted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isBooted]);

  const handleScrollTo = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleLanguage = () => {
    const nextLang = lang === "vi" ? "en" : "vi";
    setLang(nextLang);
    localStorage.setItem("graduation_lang", nextLang);
  };

  // DevTools ASCII Banner on load
  useEffect(() => {
    console.log(
      `%c
╔══════════════════════════════════════════════════╗
║                                                  ║
║   Hey, you're looking under the hood! 🚀        ║
║                                                  ║
║   TRUONG VAN MINH — GRADUATION RELEASE 2026      ║
║   Thanks for being a part of this 4-year journey. ║
║                                                  ║
╚══════════════════════════════════════════════════╝
`,
      "color: #10b981; font-family: monospace; font-weight: bold; font-size: 12px;"
    );
  }, []);

  // Track scroll progress
  useEffect(() => {
    if (!isBooted) return;
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBooted]);

  // Keyboard shortcuts (Cmd/Ctrl + K for Easter egg terminal)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowTerminalModal((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleRsvp = (status) => {
    setRsvpStatus(status);
    localStorage.setItem("graduation_rsvp", status);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalCommand.trim().toLowerCase();
    if (cmd.startsWith("sudo graduate")) {
      setTerminalOutput(
        "Access Granted. Congratulations! 🎉 You have unlocked the developer master key."
      );
    } else if (cmd === "help") {
      setTerminalOutput("Available commands: sudo graduate, status, exit");
    } else if (cmd === "status") {
      setTerminalOutput("STATUS: PRODUCTION | UPTIME: 4 YEARS | GRADUATE: TRUONG VAN MINH");
    } else if (cmd === "exit") {
      setShowTerminalModal(false);
      setTerminalOutput(null);
    } else {
      setTerminalOutput(`Command not found: '${terminalCommand}'. Try 'sudo graduate'`);
    }
    setTerminalCommand("");
  };

  if (!isBooted) {
    return <BootScreen lang={lang} onLaunch={() => setIsBooted(true)} />;
  }

  return (
    <div className="app-container">
      {/* Top Scroll Progress Indicator */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Header Navigation */}
      <header className="header-nav">
        <a href="#top" className="nav-brand">
          TVM<span>/</span>2026.0
        </a>
        <div className="nav-right">
          <div className="status-badge">
            <span className="status-dot" />
            PRODUCTION
          </div>

          <a
            href="#ceremony"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("ceremony");
            }}
          >
            {lang === "vi" ? "THIỆP MỜI" : "CEREMONY"}
          </a>

          <a
            href="#changelog"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("changelog");
            }}
          >
            {lang === "vi" ? "HÀNH TRÌNH" : "JOURNEY"}
          </a>

          {/* Language Switcher Button */}
          <button
            className="nav-cmd-btn"
            onClick={toggleLanguage}
            title="Chuyển đổi ngôn ngữ / Switch Language"
            style={{ fontWeight: 700, color: "var(--accent-cyan)", borderColor: "rgba(6, 182, 212, 0.4)" }}
          >
            <Globe size={14} />
            <span>{lang.toUpperCase()}</span>
          </button>

          <button
            className="nav-cmd-btn"
            onClick={() => setShowTerminalModal(true)}
            title="Open Easter Egg Terminal (Ctrl+K)"
          >
            <Terminal size={14} />
            <span className="desktop-only">Ctrl+K</span>
          </button>
        </div>
      </header>

      <main id="top">
        {/* HERO SECTION */}
        <section className="section hero-section">
          <div className="hero-meta-top">
            <span className="tag">RELEASE / {releaseInfo.release}</span>
            <span>BUILD {releaseInfo.build}</span>
          </div>

          {/* Featured Top Slogan */}
          <div className="hero-slogan-top">
            <span>
              {lang === "vi"
                ? "Đây không phải là hồi kết. Đây là mở đầu cho phiên bản tiếp theo."
                : "This is not the end. This is the beginning of the next version."}
            </span>
          </div>

          <div className="hero-title-wrap">
            <h1 className="hero-title">
              TRUONG
              <br />
              <span>VAN MINH</span>
            </h1>
          </div>

          <div className="hero-grid">
            <div>
              <p className="hero-subtitle">
                {releaseInfo.subtitle[lang]}
              </p>

              <div className="hero-life-note">
                <span className="life-note-tag">[DEV NOTE / KNOWN ISSUE]</span>
                <p>
                  {lang === "vi"
                    ? "Dù vẫn chưa biết 100% mình sẽ làm gì với cuộc đời, nhưng luôn tự tin tiến về phía trước."
                    : "Still doesn't know 100% what I'll do with life, but always moving forward with confidence."}
                </p>
              </div>
            </div>

            <div className="hero-specs-card">
              <div className="spec-item">
                <span>STATUS</span>
                <strong>{releaseInfo.status}</strong>
              </div>
              <div className="spec-item">
                <span>UPTIME</span>
                <strong>{releaseInfo.uptime}</strong>
              </div>
              <div className="spec-item">
                <span>BUILD</span>
                <strong>{releaseInfo.build}</strong>
              </div>
              <div className="spec-item">
                <span>TYPE</span>
                <strong>{releaseInfo.type}</strong>
              </div>
            </div>
          </div>

          {/* Dual CTAs for fast & detailed navigation */}
          <div className="hero-dual-cta">
            <button
              onClick={() => handleScrollTo("ceremony")}
              className="btn-primary"
              style={{ cursor: "pointer", border: "none" }}
            >
              {lang === "vi" ? "XEM THIỆP MỜI →" : "VIEW INVITATION →"}
              <ArrowUpRight size={18} />
            </button>

            <button
              onClick={() => handleScrollTo("changelog")}
              className="btn-secondary"
              style={{ cursor: "pointer" }}
            >
              {lang === "vi" ? "XEM HÀNH TRÌNH 4 NĂM ↓" : "VIEW 4-YEAR JOURNEY ↓"}
              <ArrowDown size={16} />
            </button>
          </div>
        </section>

        {/* 01 — DEPLOYMENT (Ceremony Invitation) - Moved up right after Hero */}
        <section id="ceremony" className="section">
          <div className="section-head">
            <span className="num">01</span>
            <h2>DEPLOYMENT</h2>
            <span className="sub">CEREMONY DETAILS</span>
          </div>

          <div className="ceremony-grid">
            <div className="ceremony-info">
              <h3>
                {lang === "vi" ? "THỜI GIAN & ĐỊA ĐIỂM LỄ TỐT NGHIỆP." : "THE FINAL BUILD IS DEPLOYING."}
              </h3>
              <p>
                {lang === "vi"
                  ? "Trân trọng kính mời bạn đến tham dự Lễ tốt nghiệp và chia vui trong ngày trọng đại này!"
                  : "You are cordially invited to celebrate the graduation ceremony of mine."}
              </p>
            </div>

            <div className="deployment-card">
              <div className="deploy-row">
                <span className="deploy-label">EVENT / SỰ KIỆN</span>
                <strong className="deploy-value">GRADUATION CEREMONY</strong>
              </div>

              <div className="deploy-row">
                <span className="deploy-label">DATE / NGÀY</span>
                <strong className="deploy-value">{releaseInfo.date}</strong>
              </div>

              <div className="deploy-row">
                <span className="deploy-label">TIME / GIỜ</span>
                <strong className="deploy-value">{releaseInfo.time}</strong>
              </div>

              <div className="deploy-row">
                <span className="deploy-label">VENUE / TRƯỜNG</span>
                <strong className="deploy-value">{releaseInfo.venue}</strong>
              </div>

              <div className="deploy-row">
                <span className="deploy-label">ADDRESS / ĐỊA CHỈ</span>
                <strong className="deploy-value">{releaseInfo.address}</strong>
              </div>

              <a
                href={releaseInfo.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-location"
              >
                <MapPin size={16} />
                {lang === "vi" ? "MỞ VỊ TRÍ TRÊN GOOGLE MAPS" : "OPEN LOCATION IN GOOGLE MAPS"}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* 02 — RSVP (Deployment Confirmation) - Placed directly after Ceremony */}
        <section id="rsvp" className="section" style={{ paddingTop: "1rem" }}>
          <div className="rsvp-card">
            <div className="rsvp-eyebrow">DEPLOYMENT CONFIRMATION</div>
            <h2>
              {lang === "vi"
                ? "BẠN SẼ ĐẾN THAM DỰ CHỨ?"
                : "WILL YOU BE THERE FOR THE FINAL DEPLOYMENT?"}
            </h2>

            {!rsvpStatus ? (
              <div className="rsvp-buttons">
                <button
                  className="btn-rsvp-yes"
                  onClick={() => handleRsvp("yes")}
                >
                  [ I'LL BE THERE ]
                </button>
                <button
                  className="btn-rsvp-no"
                  onClick={() => handleRsvp("no")}
                >
                  [ CAN'T MAKE IT ]
                </button>
              </div>
            ) : (
              <div className="rsvp-confirmation-badge">
                <div className="rsvp-icon">
                  <CheckCircle2 size={28} />
                </div>
                <div className="rsvp-status-title">
                  {rsvpStatus === "yes"
                    ? "✓ CONTRIBUTOR CONFIRMED"
                    : "STATUS UPDATED"}
                </div>
                <div className="rsvp-status-sub">
                  {rsvpStatus === "yes"
                    ? (lang === "vi" ? "Rất mong được gặp bạn tại lễ tốt nghiệp!" : "See you at the ceremony!")
                    : (lang === "vi" ? "Cảm ơn bạn đã đồng hành cùng mình trong suốt 4 năm qua." : "Thanks for being a part of the journey.")}
                </div>
                <button
                  className="btn-reset-rsvp"
                  onClick={() => handleRsvp(null)}
                >
                  {lang === "vi" ? "Thay đổi câu trả lời" : "Change Response"}
                </button>
              </div>
            )}

            <div className="rsvp-device-note">
              {lang === "vi"
                ? "* Lưu ý: Lựa chọn của bạn được lưu trực tiếp trên thiết bị này."
                : "* Note: Your response is saved locally on this device."}
            </div>
          </div>
        </section>

        {/* 03 — RELEASE NOTES / CHANGELOG (Accordion Format) */}
        <section id="changelog" className="section">
          <div className="section-head">
            <span className="num">03</span>
            <h2>CHANGELOG</h2>
            <span className="sub">{lang === "vi" ? "HÀNH TRÌNH 4 NĂM (ACCORDION)" : "RELEASE HISTORY"}</span>
          </div>

          <div className="changelog-accordion-list">
            {changelog.map((item) => {
              const isOpen = !!expandedVersions[item.version];
              return (
                <div key={item.version} className={`changelog-accordion-item ${isOpen ? "open" : ""}`}>
                  <div
                    className="changelog-accordion-header"
                    onClick={() => toggleVersion(item.version)}
                  >
                    <div className="accordion-meta-left">
                      <span className="changelog-ver">{item.version}</span>
                      <span className="changelog-year">{item.year}</span>
                    </div>

                    <div className="accordion-title-wrap">
                      <h3 className="changelog-title">{item.title[lang]}</h3>
                      <span className="changelog-tag">{item.tag}</span>
                    </div>

                    <div className="accordion-chevron">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="changelog-accordion-body">
                      <ul className="changelog-items">
                        {item.items[lang].map((line, idx) => (
                          <li key={idx}>{line}</li>
                        ))}
                      </ul>

                      {item.breakingChange && (
                        <div className="breaking-change-box">
                          <strong>BREAKING CHANGE:</strong>
                          <code>{item.breakingChange[lang]}</code>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 04 — CONTRIBUTORS */}
        <section id="contributors" className="section">
          <div className="section-head">
            <span className="num">04</span>
            <h2>CONTRIBUTORS</h2>
            <span className="sub">{lang === "vi" ? "LỜI CẢM ƠN CHÂN THÀNH" : "CORE TEAM & PARTNERS"}</span>
          </div>

          <div className="contributors-grid">
            {contributors.map((item, idx) => (
              <div
                key={idx}
                className="contributor-card"
                onClick={() => setActiveContributor(item)}
              >
                <span className="contributor-role">{item.role}</span>
                <h3 className="contributor-group">{item.group[lang]}</h3>
                <p className="contributor-summary">{item.summary[lang]}</p>
                <div className="contributor-read-more">
                  <span>{lang === "vi" ? "Đọc tâm sự" : "Read note"}</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 05 — THE FINAL BUILD (Mood Shift: Dark -> Warm Light) - Grand Emotional Climax */}
        <section id="final-build" className="section">
          <div className="section-head">
            <span className="num">05</span>
            <h2>THE FINAL BUILD</h2>
            <span className="sub">GRADUATION SCAN</span>
          </div>

          <div className="final-build-wrapper">
            <div className="final-build-container">
              <div className="build-progress-box">
                <div className="build-progress-title">
                  "BUILDING GRADUATION... 100%"
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: "100%" }} />
                </div>
                <div className="build-status-text">
                  ✓ "BUILD SUCCESSFUL — STABLE RELEASE"
                </div>
              </div>

              <div className="polaroid-wrapper">
                <div className="polaroid-card">
                  <div className="polaroid-img-box">
                    <img src={releaseInfo.photoUrl} alt="Trương Văn Minh Graduation" />
                  </div>
                  <div className="polaroid-caption">
                    TRUONG VAN MINH | CLASS OF 2026
                  </div>
                </div>
              </div>

              <div className="grad-announcement">
                <h2>TRUONG VAN MINH</h2>
                <p>{"has officially graduated."}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <h3>RELEASE {releaseInfo.release}</h3>
              <p>STATUS: STABLE & READY</p>
            </div>

            <div className="footer-meta">
              <span>
                MAINTAINER
                <strong>{releaseInfo.name}</strong>
              </span>
              <span>
                RELEASED
                <strong>2026</strong>
              </span>
            </div>
          </div>

          <p className="footer-closing">
            {lang === "vi"
              ? "Đây không phải là hồi kết. Đây là mở đầu cho phiên bản tiếp theo."
              : "This is not the end. This is the beginning of the next version."}
          </p>

          <div className="footer-bottom">
            <span>© 2026 Trương Văn Minh</span>
            <span>v2027 ➔ ?</span>
          </div>
        </div>
      </footer>

      {/* Contributor Note Modal */}
      {activeContributor && (
        <div className="modal-overlay" onClick={() => setActiveContributor(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setActiveContributor(null)}
            >
              <X size={20} />
            </button>
            <div className="modal-role">{activeContributor.role}</div>
            <h3 className="modal-title">{activeContributor.group[lang]}</h3>
            <p className="modal-body">{activeContributor.detail[lang]}</p>
          </div>
        </div>
      )}

      {/* Easter Egg Terminal Modal */}
      {showTerminalModal && (
        <div className="terminal-modal" onClick={() => setShowTerminalModal(false)}>
          <div className="terminal-box" onClick={(e) => e.stopPropagation()}>
            <div className="terminal-topbar">
              <div className="terminal-dots">
                <span className="terminal-dot red" />
                <span className="terminal-dot yellow" />
                <span className="terminal-dot green" />
              </div>
              <span className="terminal-title">developer-console.sh</span>
              <button
                style={{ background: "none", border: "none", color: "#71717a", cursor: "pointer" }}
                onClick={() => setShowTerminalModal(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="terminal-content">
              <p style={{ color: "#a1a1aa" }}>
                Type <code style={{ color: "#10b981" }}>sudo graduate</code> to execute master trigger.
              </p>

              {terminalOutput && (
                <div style={{ color: "#00ff66", margin: "0.5rem 0", lineHeight: "1.4" }}>
                  {terminalOutput}
                </div>
              )}

              <form onSubmit={handleTerminalSubmit} className="terminal-input-line">
                <span style={{ color: "#10b981" }}>$</span>
                <input
                  type="text"
                  autoFocus
                  placeholder="sudo graduate"
                  value={terminalCommand}
                  onChange={(e) => setTerminalCommand(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 01 — BOOT SCREEN COMPONENT
function BootScreen({ lang, onLaunch }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [bootFinished, setBootFinished] = useState(false);
  const logs = bootLogs[lang] || bootLogs.vi;

  const handleSkipLog = (e) => {
    if (e) e.stopPropagation();
    if (!bootFinished) {
      setVisibleLines(logs.length);
      setBootFinished(true);
    }
  };

  useEffect(() => {
    if (bootFinished) return;

    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < logs.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setBootFinished(true);
          return prev;
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, [logs.length, bootFinished]);

  return (
    <div
      className="boot-screen"
      onClick={!bootFinished ? handleSkipLog : undefined}
      style={{ cursor: bootFinished ? "default" : "pointer" }}
    >
      <div className="boot-container" onClick={(e) => e.stopPropagation()}>
        <div className="boot-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="boot-title">TRUONG-VAN-MINH</div>
            <div className="boot-sub">graduation.release --initializing</div>
          </div>
          {!bootFinished && (
            <button
              className="boot-skip-btn"
              onClick={handleSkipLog}
              title="Bỏ qua / Skip log animation"
            >
              <SkipForward size={14} />
              <span>{lang === "vi" ? "BỎ QUA" : "SKIP"}</span>
            </button>
          )}
        </div>

        <div className="boot-logs" onClick={!bootFinished ? handleSkipLog : undefined}>
          {logs.slice(0, visibleLines).map((log, idx) => (
            <div key={idx} className="boot-line">
              <span className="boot-status">[ {log.status} ]</span>
              <span className="boot-label">{log.text}</span>
            </div>
          ))}
        </div>

        {bootFinished ? (
          <div className="boot-result">
            <div className="boot-success-badge">BUILD SUCCESSFUL</div>
            <div className="boot-version">release/2026.0</div>

            <button className="boot-launch-btn" onClick={onLaunch}>
              <Terminal size={18} />
              $ ./launch
            </button>
          </div>
        ) : (
          <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.75rem", color: "#00aa44", opacity: 0.8 }}>
            {lang === "vi" ? "(Chạm bất kỳ đâu để bỏ qua chạy log)" : "(Tap anywhere to skip logs)"}
          </div>
        )}
      </div>
    </div>
  );
}