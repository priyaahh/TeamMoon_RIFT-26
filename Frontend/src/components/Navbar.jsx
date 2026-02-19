import './Navbar.css'
import { FaHeartbeat, FaGithub, FaLinkedin } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-logo" to="/">
          <FaHeartbeat className="logo-icon" />
          <span>PharmaGuard</span>
        </Link>

        <div className="navbar-links">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" to="/results">
            Results
          </NavLink>
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
          <NavLink className="nav-link" to="/cpic">
            CPIC
          </NavLink>
        </div>

        <div className="navbar-actions">
          <div className="navbar-socials">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-link"
              title="GitHub Repository"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-link"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>

          <Link className="btn-book" to="/">
            Start analysis
          </Link>
        </div>
      </div>
    </nav>
  )
}
