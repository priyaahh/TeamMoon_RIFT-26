/*import React from 'react'
import './Footer.css'

export const Footer = () => {
  return (
    <footer className="app-footer">
      <p>PharmaGuard AI © 2026</p>
    </footer>
  )
}

export default Footer

*/
import React from 'react'
import './Footer.css'

export const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-top">
        {/* About Section */}
        <div className="footer-section">
          <h4>About PharmaGuard AI</h4>
          <p>
            PharmaGuard AI provides advanced pharmacogenomic insights to guide safe and effective drug use.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/results">Results</a></li>
            <li><a href="/drug-input">Drug Input</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@pharmaguard.ai</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>© 2026 PharmaGuard AI</p>
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