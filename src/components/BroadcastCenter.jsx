import React, { useState } from 'react';

const BroadcastCenter = ({ dark, onAlertSent }) => {
  const th = {
    dark: {
      bg: '#030712',
      surface: 'rgba(15, 23, 42, 0.8)',
      text: '#e2e8f0',
      textMuted: '#64748b',
      border: 'rgba(99, 120, 255, 0.12)',
      glass: 'rgba(15, 23, 42, 0.6)',
    },
    light: {
      bg: '#f0f4ff',
      surface: 'rgba(255,255,255,0.85)',
      text: '#0f172a',
      textMuted: '#64748b',
      border: 'rgba(99, 102, 241, 0.15)',
      glass: 'rgba(255,255,255,0.7)',
    }
  };

  const theme = th[dark ? 'dark' : 'light'];
  const [showModal, setShowModal] = useState(false);
  const [broadcasts, setBroadcasts] = useState([]);
  const [formData, setFormData] = useState({
    state: '',
    region: '',
    village: '',
    alertType: 'Advisory',
    message: '',
  });

  const alertTypes = ['Advisory', 'Warning', 'Urgent', 'Critical'];
  const alertColors = {
    Advisory: '#3b82f6',
    Warning: '#f59e0b',
    Urgent: '#ef4444',
    Critical: '#dc2626',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.state || !formData.region || !formData.village || !formData.message) {
      alert('Please fill all fields');
      return;
    }

    const newBroadcast = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toLocaleTimeString('en-IN'),
      date: new Date().toLocaleDateString('en-IN'),
    };

    setBroadcasts([newBroadcast, ...broadcasts]);
    setFormData({ state: '', region: '', village: '', alertType: 'Advisory', message: '' });
    setShowModal(false);
    if (onAlertSent) onAlertSent(newBroadcast);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <button
          onClick={() => setShowModal(true)}
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: 10,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            fontWeight: 600,
            boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 28px rgba(99,102,241,0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.4)';
          }}
        >
          📡 Send Alert
        </button>
      </div>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: 20,
              padding: 32,
              maxWidth: 500,
              width: '90%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: theme.text, fontFamily: 'Inter, sans-serif' }}>
                📡 Send Alert
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: 24,
                  cursor: 'pointer',
                  color: theme.textMuted,
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, color: theme.textMuted, fontFamily: 'Inter, sans-serif', marginBottom: 6, display: 'block', fontWeight: 600 }}>
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="e.g., Uttar Pradesh"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 10,
                    border: `1px solid ${theme.border}`,
                    background: theme.glass,
                    color: theme.text,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, color: theme.textMuted, fontFamily: 'Inter, sans-serif', marginBottom: 6, display: 'block', fontWeight: 600 }}>
                  Region
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  placeholder="e.g., Eastern"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 10,
                    border: `1px solid ${theme.border}`,
                    background: theme.glass,
                    color: theme.text,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, color: theme.textMuted, fontFamily: 'Inter, sans-serif', marginBottom: 6, display: 'block', fontWeight: 600 }}>
                  Village
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  placeholder="e.g., Ramnagar"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 10,
                    border: `1px solid ${theme.border}`,
                    background: theme.glass,
                    color: theme.text,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, color: theme.textMuted, fontFamily: 'Inter, sans-serif', marginBottom: 6, display: 'block', fontWeight: 600 }}>
                  Alert Type
                </label>
                <select
                  value={formData.alertType}
                  onChange={(e) => setFormData({ ...formData, alertType: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 10,
                    border: `1px solid ${theme.border}`,
                    background: theme.glass,
                    color: theme.text,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    outline: 'none',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                  }}
                >
                  {alertTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12, color: theme.textMuted, fontFamily: 'Inter, sans-serif', marginBottom: 6, display: 'block', fontWeight: 600 }}>
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Enter alert message..."
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 10,
                    border: `1px solid ${theme.border}`,
                    background: theme.glass,
                    color: theme.text,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: `linear-gradient(135deg, ${alertColors[formData.alertType]}, ${alertColors[formData.alertType]}dd)`,
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: 10,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 700,
                  marginTop: 8,
                }}
              >
                Send Alert
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Live Broadcasts */}
      <div style={{ marginTop: 32 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: theme.text, fontFamily: 'Inter, sans-serif' }}>
          📡 Live Broadcasts ({broadcasts.length})
        </h3>

        {broadcasts.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: 40,
              background: theme.surface,
              borderRadius: 16,
              border: `1px solid ${theme.border}`,
              color: theme.textMuted,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            No alerts sent yet
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {broadcasts.map((alert) => (
              <div
                key={alert.id}
                style={{
                  background: theme.surface,
                  border: `2px solid ${alertColors[alert.alertType]}`,
                  borderRadius: 12,
                  padding: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                    <span
                      style={{
                        background: alertColors[alert.alertType],
                        color: 'white',
                        padding: '3px 10px',
                        borderRadius: 6,
                        fontSize: 10,
                        fontWeight: 700,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {alert.alertType.toUpperCase()}
                    </span>
                    <span style={{ fontSize: 12, color: theme.textMuted, fontFamily: 'Inter, sans-serif' }}>
                      {alert.date} {alert.timestamp}
                    </span>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ color: theme.text, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                      📍 {alert.state} → {alert.region} → {alert.village}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: theme.text, fontSize: 13, fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}>
                    {alert.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BroadcastCenter;
