import "./Navbar.css";
import logo from "../assets/logo.jpg";

function Navbar() {
  return (
    <nav className="navbar">

      {/* LEFT LOGO */}
      <div className="nav-left">
        <img src={logo} alt="JalRakshak" className="logo"/>
      </div>

      {/* CENTER AUTH */}
      <div className="nav-center">
        <button className="signin">Sign In</button>
        <button className="signup">Sign Up</button>
      </div>

      {/* RIGHT MENU */}
      <ul className="nav-right">
        <li>Home</li>
        <li>Maps</li>
        <li>About</li>
      </ul>

    </nav>
  );
}

export default Navbar;