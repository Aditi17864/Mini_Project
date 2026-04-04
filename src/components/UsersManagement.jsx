import React, { useState } from 'react';

const SAMPLE_USERS = [
  { id: 1, name: 'Aditi Rai', role: 'National Admin', email: 'aditi.rai@jalrakshak.gov.in', joined: '2024-01-01' },
  { id: 2, name: 'Amruta Barde', role: 'Health Worker', email: 'amruta.barde@health.gov.in', joined: '2024-01-15' },
  { id: 3, name: 'Anahita Bhagtanar', role: 'Community', email: 'anahita.bh@community.in', joined: '2024-02-01' },
  { id: 4, name: 'Adeeb Bijlee', role: 'Health Worker', email: 'adeeb.bijlee@health.gov.in', joined: '2024-02-10' },
];

const UsersManagement = ({ dark }) => {
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
  const [users, setUsers] = useState(SAMPLE_USERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWorker, setNewWorker] = useState({ name: '', email: '', role: 'Health Worker' });

  const roleColors = {
    'National Admin': '#6366f1',
    'Health Worker': '#f59e0b',
    'Community': '#06d6a0',
  };

  const handleAddWorker = (e) => {
    e.preventDefault();
    if (!newWorker.name || !newWorker.email) {
      alert('Please fill all fields');
      return;
    }

    const addedUser = {
      id: users.length + 1,
      name: newWorker.name,
      email: newWorker.email,
      role: newWorker.role,
      joined: new Date().toISOString().split('T')[0],
    };

    setUsers([...users, addedUser]);
    setNewWorker({ name: '', email: '', role: 'Health Worker' });
    setShowAddModal(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: theme.text, fontFamily: 'Inter, sans-serif' }}>
          👥 Users Management ({users.length})
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: 8,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
          }}
        >
          ➕ Add Field Worker
        </button>
      </div>

      {/* Add Worker Modal */}
      {showAddModal && (
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
          onClick={() => setShowAddModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: 20,
              padding: 32,
              maxWidth: 400,
              width: '90%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: theme.text, fontFamily: 'Inter, sans-serif' }}>
              ➕ Add Field Worker
            </h3>

            <form onSubmit={handleAddWorker} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, color: theme.textMuted, fontFamily: 'Inter, sans-serif', marginBottom: 6, display: 'block', fontWeight: 600 }}>
                  Name
                </label>
                <input
                  type="text"
                  value={newWorker.name}
                  onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
                  placeholder="Full name"
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
                  Email
                </label>
                <input
                  type="email"
                  value={newWorker.email}
                  onChange={(e) => setNewWorker({ ...newWorker, email: e.target.value })}
                  placeholder="email@example.com"
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
                  Role
                </label>
                <select
                  value={newWorker.role}
                  onChange={(e) => setNewWorker({ ...newWorker, role: e.target.value })}
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
                  <option value="Health Worker">Health Worker</option>
                  <option value="Community">Community</option>
                </select>
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
                }}
              >
                Add Worker
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <thead>
            <tr style={{ borderBottom: `2px solid ${theme.border}` }}>
              {['Name', 'Role', 'Email', 'Joined'].map((header) => (
                <th
                  key={header}
                  style={{
                    padding: '14px 16px',
                    textAlign: 'left',
                    color: theme.textMuted,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr
                key={user.id}
                style={{
                  borderBottom: `1px solid ${theme.border}`,
                  background: i % 2 === 0 ? 'transparent' : dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                }}
              >
                <td style={{ padding: '14px 16px', color: theme.text, fontSize: 13, fontWeight: 600 }}>
                  {user.name}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span
                    style={{
                      background: `${roleColors[user.role]}22`,
                      color: roleColors[user.role],
                      padding: '4px 12px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      display: 'inline-block',
                    }}
                  >
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', color: theme.textMuted, fontSize: 12 }}>
                  {user.email}
                </td>
                <td style={{ padding: '14px 16px', color: theme.textMuted, fontSize: 12 }}>
                  {user.joined}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
