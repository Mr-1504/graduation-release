import React, { useEffect, useState } from "react";
import {
  releaseInfo,
  changelog,
  contributors,
} from "./data";
import {
  ArrowUpRight,
  ArrowDown,
  MapPin,
  CheckCircle2,
  X,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function App() {
  const lang = "vi";
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeContributor, setActiveContributor] = useState(null);
  const [rsvpStatus, setRsvpStatus] = useState(() => {
    return localStorage.getItem("graduation_rsvp") || null;
  });

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

  const handleScrollTo = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // DevTools ASCII Banner on load
  useEffect(() => {
    console.log(
      `%c
╔══════════════════════════════════════════════════╗
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
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRsvp = (status) => {
    setRsvpStatus(status);
    localStorage.setItem("graduation_rsvp", status);
  };

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
            <span className="sub">{lang === "vi" ? "HÀNH TRÌNH 4 NĂM" : "RELEASE HISTORY"}</span>
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
    </div>
  );
}