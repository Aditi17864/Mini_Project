import "./Navbar.css";
import logo from "../assets/logo.png";
import { useState } from "react";
import LoginModal from "./LoginModal";

function Navbar({ setActivePage, activePage, isLoggedIn, onLogin, onLogout, user }) {

  const [openLogin, setOpenLogin] = useState(false);

  const handleLoginSuccess = (userData) => {
    onLogin(userData);
    setOpenLogin(false);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <nav className="navbar">

      {/* LEFT : Logo */}
      <div className="nav-left">
        <img src={logo} alt="JalRakshak Logo" />
      </div>

      {/* CENTER : Menu */}
      <ul className="nav-center">
        {!isLoggedIn ? (
          <>
            <li onClick={() => setActivePage('home')}>Home</li>
            <li onClick={() => setActivePage('home')}>The Problem</li>
            <li onClick={() => setActivePage('home')}>Our Solution</li>
            <li onClick={() => setActivePage('home')}>How It Works</li>
            <li onClick={() => setActivePage('home')}>Maps</li>
            <li onClick={() => setActivePage('home')}>Resources</li>
          </>
        ) : (
          <li onClick={() => setActivePage('dashboard')} className={activePage === 'dashboard' ? 'active' : ''}>
            Dashboard
          </li>
        )}
      </ul>

      {/* RIGHT : Login/Logout Button */}
      <div className="nav-right">
        {!isLoggedIn ? (
          <button className="login-btn" onClick={() => setOpenLogin(true)}>
            Login-Signup
            <span className="login-icon">👤</span>
          </button>
        ) : (
          <div className="user-info">
            <span>Welcome, {user?.name || 'User'}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* LOGIN MODAL */}
      <LoginModal
        isOpen={openLogin}
        onClose={() => setOpenLogin(false)}
        onLoginSuccess={handleLoginSuccess}
      />


    </nav>
  );
}

export default Navbar;