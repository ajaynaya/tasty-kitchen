import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="logo-name">
      <img
        src="https://res.cloudinary.com/dkwefqjnn/image/upload/v1660546241/Group_7420_rc9w1v.png"
        alt="website-footer-logo"
        className="footer-logo"
      />
      <h1 className="footer-heading">Tasty Kitchens</h1>
    </div>
    <p className="footer-description">
      The only thing we are serious about is food. <br />
      Contact us on
    </p>
    <div className="small-logos">
      <ul className="small-list">
        <li className="small-logo">
          <FaPinterestSquare testid="pintrest-social-icon" color="#FFFFFF" />
        </li>
        <li className="small-logo">
          <FaInstagram testid="instagram-social-icon" color="#FFFFFF" />
        </li>
        <li className="small-logo">
          <FaTwitter testid="twitter-social-icon" color="#FFFFFF" />
        </li>
        <li className="small-logo">
          <FaFacebookSquare testid="facebook-social-icon" color="#FFFFFF" />
        </li>
      </ul>
    </div>
  </div>
)
export default Footer
