import React, { useState } from "react";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [alert, setAlert] = useState("");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  // Signup state
  const [signupFirst, setSignupFirst] = useState("");
  const [signupLast, setSignupLast] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupRole, setSignupRole] = useState("");
  const [signupPass, setSignupPass] = useState("");

  if (!isOpen) return null;

  const showAlert = (msg) => setAlert(msg);
  const clearAlert = () => setAlert("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPass) return showAlert("Please enter your email and password.");
    if (!loginEmail.includes("@")) return showAlert("Please enter a valid email address.");
    clearAlert();
    
    // Simulate successful login - in real app, this would be API call
    const userData = {
      name: loginEmail.split('@')[0], // Simple name extraction
      email: loginEmail,
      role: 'admin' // Default role, could be determined by backend
    };
    
    onLoginSuccess(userData);
    onClose();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!signupFirst || !signupLast || !signupEmail || !signupRole || !signupPass)
      return showAlert("Please fill in all fields.");
    if (!signupEmail.includes("@")) return showAlert("Please enter a valid email address.");
    if (signupPass.length < 8) return showAlert("Password must be at least 8 characters.");
    clearAlert();
    
    // Simulate successful signup - in real app, this would be API call
    const userData = {
      name: `${signupFirst} ${signupLast}`,
      email: signupEmail,
      role: signupRole.toLowerCase().replace(' ', '')
    };
    
    onLoginSuccess(userData);
    onClose();
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    clearAlert();
  };

  const handleGoogleClick = () => {
    const userData = {
      name: "Google User",
      email: "googleuser@example.com",
      role: 'admin'
    };
    onLoginSuccess(userData);
    onClose();
  };

  return (
    <div className="lm-overlay" onClick={onClose}>
      <div className="lm-card" onClick={(e) => e.stopPropagation()}>
        <div className="lm-topbar" />

        <div className="lm-body">
          {/* Close button */}
          <button className="lm-close" onClick={onClose} aria-label="Close">✕</button>

          {/* Header */}
          <div className="lm-header">
            <div className="lm-emblem">💧</div>
            <h2 className="lm-title">JalRakshak</h2>
            <p className="lm-subtitle">Early Warning System for Water-Borne Diseases</p>
          </div>

          {/* Tabs */}
          <div className="lm-tabs">
            <button
              className={`lm-tab ${activeTab === "login" ? "active" : ""}`}
              onClick={() => switchTab("login")}
            >
              Login
            </button>
            <button
              className={`lm-tab ${activeTab === "signup" ? "active" : ""}`}
              onClick={() => switchTab("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Alert */}
          {alert && <div className="lm-alert">{alert}</div>}

          {/* LOGIN PANEL */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} noValidate>
              <div className="lm-fg">
                <label className="lm-label">Email Address</label>
                <div className="lm-iw">
                  <span className="lm-icon">✉</span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="lm-fg">
                <label className="lm-label">Password</label>
                <div className="lm-iw">
                  <span className="lm-icon">🔒</span>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                  />
                </div>
                <div className="lm-forgot">
                  <a href="#forgot">Forgot password?</a>
                </div>
              </div>

              <button type="submit" className="lm-btn-submit">Sign In</button>

              <div className="lm-divider"><span>or</span></div>

              <button type="button" className="lm-btn-google" onClick={handleGoogleClick}>
                <GoogleIcon />
                Continue with Google
              </button>

              <p className="lm-switch">
                Don't have an account?{" "}
                <span onClick={() => switchTab("signup")}>Sign up free</span>
              </p>
            </form>
          )}

          {/* SIGNUP PANEL */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignup} noValidate>
              <div className="lm-two-col">
                <div className="lm-fg">
                  <label className="lm-label">First Name</label>
                  <div className="lm-iw">
                    <span className="lm-icon">👤</span>
                    <input
                      type="text"
                      placeholder="First name"
                      value={signupFirst}
                      onChange={(e) => setSignupFirst(e.target.value)}
                    />
                  </div>
                </div>
                <div className="lm-fg">
                  <label className="lm-label">Last Name</label>
                  <div className="lm-iw">
                    <span className="lm-icon">👤</span>
                    <input
                      type="text"
                      placeholder="Last name"
                      value={signupLast}
                      onChange={(e) => setSignupLast(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="lm-fg">
                <label className="lm-label">Email Address</label>
                <div className="lm-iw">
                  <span className="lm-icon">✉</span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="lm-fg">
                <label className="lm-label">Role</label>
                <div className="lm-iw">
                  <span className="lm-icon">🏥</span>
                  <input
                    type="text"
                    placeholder="e.g. Health Official, Researcher, Citizen"
                    value={signupRole}
                    onChange={(e) => setSignupRole(e.target.value)}
                  />
                </div>
              </div>

              <div className="lm-fg">
                <label className="lm-label">Password</label>
                <div className="lm-iw">
                  <span className="lm-icon">🔒</span>
                  <input
                    type="password"
                    placeholder="Min. 8 characters"
                    value={signupPass}
                    onChange={(e) => setSignupPass(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="lm-btn-submit">Create Account</button>

              <div className="lm-divider"><span>or</span></div>

              <div style={{ position: "relative" }}>
                <button type="button" className="lm-btn-google" onClick={handleGoogleClick}>
                  <GoogleIcon />
                  Sign up with Google
                </button>
              </div>

              <p className="lm-terms">
                By creating an account you agree to our{" "}
                <a href="#terms">Terms</a> &amp; <a href="#privacy">Privacy Policy</a>
              </p>

              <p className="lm-switch">
                Already have an account?{" "}
                <span onClick={() => switchTab("login")}>Sign in</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

export default LoginModal;