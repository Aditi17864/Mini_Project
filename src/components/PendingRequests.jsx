import React, { useState } from 'react';

const PendingRequests = ({ dark, requests = [], onApprove, onReject }) => {
  const th = {
    dark: {
      surface: 'rgba(15, 23, 42, 0.8)',
      text: '#e2e8f0',
      textMuted: '#64748b',
      border: 'rgba(99, 120, 255, 0.12)',
      glass: 'rgba(15, 23, 42, 0.6)',
    },
    light: {
      surface: 'rgba(255,255,255,0.85)',
      text: '#0f172a',
      textMuted: '#64748b',
      border: 'rgba(99, 102, 241, 0.15)',
      glass: 'rgba(255,255,255,0.7)',
    }
  };

  const theme = th[dark ? 'dark' : 'light'];
  const [localRequests, setLocalRequests] = useState(requests);

  const handleApprove = (id) => {
    setLocalRequests(localRequests.filter((r) => r.id !== id));
    if (onApprove) onApprove(id);
  };

  const handleReject = (id) => {
    setLocalRequests(localRequests.filter((r) => r.id !== id));
    if (onReject) onReject(id);
  };

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: theme.text, fontFamily: 'Inter, sans-serif' }}>
        ⏳ Pending Requests ({localRequests.length})
      </h2>

      {localRequests.length === 0 ? (
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
          No pending requests
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {localRequests.map((req) => (
            <div
              key={req.id}
              style={{
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                padding: 16,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 14, fontWeight: 700, color: theme.text, fontFamily: 'Inter, sans-serif' }}>
                    {req.workerName}
                  </h4>
                  <p style={{ margin: 0, fontSize: 12, color: theme.textMuted, fontFamily: 'Inter, sans-serif' }}>
                    📍 {req.state} → {req.region} → {req.village}
                  </p>
                </div>
                <span style={{ fontSize: 10, color: theme.textMuted, fontFamily: 'Inter, sans-serif' }}>
                  {req.timestamp}
                </span>
              </div>

              <div style={{ background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderRadius: 10, padding: 12, marginBottom: 12 }}>
                <p style={{ margin: 0, fontSize: 12, color: theme.text, fontFamily: 'Inter, sans-serif', whiteSpace: 'pre-wrap' }}>
                  <strong>Clinical Signs:</strong> {req.clinicalSigns}
                </p>
                <p style={{ margin: '8px 0 0 0', fontSize: 12, color: theme.text, fontFamily: 'Inter, sans-serif' }}>
                  <strong>Source:</strong> {req.sourceOfInfection}
                </p>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => handleApprove(req.id)}
                  style={{
                    flex: 1,
                    background: '#06d6a0',
                    color: 'white',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12,
                    fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#05c997')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#06d6a0')}
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => handleReject(req.id)}
                  style={{
                    flex: 1,
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12,
                    fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#dc2626')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#ef4444')}
                >
                  ❌ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingRequests;
