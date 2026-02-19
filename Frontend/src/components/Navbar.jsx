import './Navbar.css'
import { FaHeartbeat } from 'react-icons/fa'
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
          <NavLink className="nav-link" to="/platform">
            Analysis
          </NavLink>
          <NavLink className="nav-link" to="/vcf-upload">
            Upload
          </NavLink>
          <NavLink className="nav-link" to="/drug-input">
            Medications
          </NavLink>
          <NavLink className="nav-link" to="/results-display">
            Results
          </NavLink>
        </div>

        <div className="navbar-actions" />
      </div>
    </nav>
  )
}
