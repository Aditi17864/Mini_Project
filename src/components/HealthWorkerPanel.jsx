import React, { useState } from 'react';

const HealthWorkerPanel = ({ dark, onSubmit }) => {
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
  const [formData, setFormData] = useState({
    state: '',
    region: '',
    village: '',
    clinicalSigns: '',
    sourceOfInfection: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.state || !formData.region || !formData.village || !formData.clinicalSigns || !formData.sourceOfInfection) {
      alert('Please fill all fields');
      return;
    }

    const requestData = {
      id: Date.now(),
      workerName: 'Health Worker',
      ...formData,
      timestamp: new Date().toLocaleTimeString('en-IN'),
      date: new Date().toLocaleDateString('en-IN'),
    };

    if (onSubmit) onSubmit(requestData);
    setFormData({ state: '', region: '', village: '', clinicalSigns: '', sourceOfInfection: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: theme.text, fontFamily: 'Inter, sans-serif' }}>
        🏥 Health Worker Data Submission
      </h2>

      {submitted && (
        <div
          style={{
            background: '#06d6a0',
            color: 'white',
            padding: 16,
            borderRadius: 10,
            marginBottom: 20,
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          ✅ Data submitted successfully! Awaiting admin approval.
        </div>
      )}

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
            Clinical Signs
          </label>
          <textarea
            value={formData.clinicalSigns}
            onChange={(e) => setFormData({ ...formData, clinicalSigns: e.target.value })}
            placeholder="e.g., Fever, Diarrhea, Vomiting..."
            rows="3"
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

        <div>
          <label style={{ fontSize: 12, color: theme.textMuted, fontFamily: 'Inter, sans-serif', marginBottom: 6, display: 'block', fontWeight: 600 }}>
            Source of Infection
          </label>
          <input
            type="text"
            value={formData.sourceOfInfection}
            onChange={(e) => setFormData({ ...formData, sourceOfInfection: e.target.value })}
            placeholder="e.g., Contaminated water source"
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

        <button
          type="submit"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: 10,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            fontWeight: 700,
            marginTop: 8,
            boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
          }}
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default HealthWorkerPanel;
