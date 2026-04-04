import React, { useState } from 'react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PrimeMinisterSection from "./components/PrimeMinisterSection";
import AIChat from "./components/AIChat";
import Resources from "./components/Resources";
import HealthDashboard from "./components/HealthDashboard";

function App() {
  const [activePage, setActivePage] = useState('home');
  const [user, setUser] = useState(null);
  const isLoggedIn = Boolean(user);

  const handleLogin = (userData) => {
    setUser(userData);
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActivePage('home');
  };

  return (
    <div>
      {/* Navbar always visible — pass setActivePage so Maps link works from inside Navbar */}
      <Navbar 
        setActivePage={setActivePage} 
        activePage={activePage} 
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
        user={user}
      />

      {activePage === 'home' && (
        <div>
          <Hero />
          <AIChat />
          <PrimeMinisterSection />
          <Resources />
        </div>
      )}

      {activePage === 'dashboard' && (
        <HealthDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;