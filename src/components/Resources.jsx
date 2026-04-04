import React, { useState } from "react";
import "./Resources.css";

function Resources() {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const resourceMaterials = [
    { id: 1, title: "Water Purification Guide",       fileSize: "2 KB", icon: "💧" },
    { id: 2, title: "Standard Sanitation Protocols",  fileSize: "2 KB", icon: "🛡️" },
    { id: 3, title: "Emergency Contact Directory",    fileSize: "1 KB", icon: "📋" },
    { id: 4, title: "Malaria Prevention Steps",       fileSize: "2 KB", icon: "🔴" },
  ];

  const faqs = [
    {
      id: 1,
      question: "What should I do if the water looks cloudy?",
      answer:
        "If water appears cloudy, it may contain impurities. Boil it for at least 10 minutes before consumption, or use water purification tablets as recommended in our Water Purification Guide.",
    },
    {
      id: 2,
      question: "Who do I contact for a sudden outbreak?",
      answer:
        "Contact your local health department immediately or call the emergency helpline number mentioned in our Emergency Contact Directory. Report the outbreak with details of symptoms and affected individuals.",
    },
    {
      id: 3,
      question: "Where can I get chlorine tablets?",
      answer:
        "Chlorine tablets are available at local health centers, medical shops, and government health offices. Consult our resources section for nearby facilities in your region.",
    },
  ];

  const toggleFAQ = (id) => setExpandedFAQ(expandedFAQ === id ? null : id);
  const handleDownload = (title) => alert(`Downloading ${title}...`);

  return (
    <section className="resources-section" id="resources">
      {/* Mid orb decoration */}
      <div className="mid-orb" />

      {/* ── Knowledge Center ───────────────────── */}
      <div className="knowledge-center">
        <div className="kc-badge">📚 Educational Hub</div>
        <h2>Public Health Knowledge Center</h2>
        <p className="kc-description">
          Access vital safety guidelines, download official protocols, and find
          emergency contacts for your region.
        </p>

        <div className="materials-grid">
          {resourceMaterials.map((material) => (
            <div key={material.id} className="material-card">
              <span className="material-icon">{material.icon}</span>
              <h3>{material.title}</h3>
              <p className="file-size">TXT · {material.fileSize}</p>
              <button
                className="download-btn"
                onClick={() => handleDownload(material.title)}
              >
                ⬇ Download
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tutorial Section ────────────────────── */}
      <div className="tutorial-section">
        <div className="tutorial-content">
          <h3>Hygiene Tutorial</h3>
          <p>
            Watch our detailed 5-minute guide on proper water sanitation
            techniques for rural households.
          </p>
          <button className="watch-btn">Watch Now →</button>
        </div>

        <div className="tutorial-stats">
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Helpline</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">12+</div>
            <div className="stat-label">Protocols</div>
          </div>
        </div>
      </div>

      {/* ── FAQ Section ─────────────────────────── */}
      <div className="faq-section">
        <h3>Common Questions</h3>
        <p className="faq-subtitle">
          Quick answers to the most frequent community concerns.
        </p>

        <div className="faq-container">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`faq-item ${expandedFAQ === faq.id ? "active" : ""}`}
            >
              <button className="faq-question" onClick={() => toggleFAQ(faq.id)}>
                <span>{faq.question}</span>
                <span className="faq-icon">
                  {expandedFAQ === faq.id ? "−" : "+"}
                </span>
              </button>
              {expandedFAQ === faq.id && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Resources;
