import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-top">
        {/* About Section */}
        <div className="footer-section about-section">
          <h4>About PharmaGuard AI</h4>
          <p>
            PharmaGuard AI provides advanced pharmacogenomic insights to guide safe and effective drug use, leveraging genetics to prevent adverse reactions.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/vcf-upload">Upload Genomics</Link></li>
            <li><Link to="/drug-input">Medications</Link></li>
            <li><Link to="/results-display">Analysis Results</Link></li>
            <li><Link to="/export-share">Export</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact-section">
          <h4>Contact Us</h4>
          <p>Email: support@pharmaguard.ai</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p className="copyright-text">© 2026 PharmaGuard AI</p>
        </div>
      </div>

      {/* Bottom small footer */}
      <div className="footer-bottom">
        <p>Made with ❤️ by TeamMoon RIFT'26</p>
      </div>
    </footer>
  )
}

export default Footer