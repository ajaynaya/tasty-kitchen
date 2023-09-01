import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'

import {GiHamburgerMenu} from 'react-icons/gi'

import {IoCloseCircle} from 'react-icons/io5'
import './index.css'

const links = [
  {id: 0, path: 'Home', displayText: 'Home'},
  {id: 1, path: 'Cart', displayText: 'Cart'},
  {id: 2, displayText: 'Logout'},
]

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const {activeTabId} = props

  const renderHamburgerPopup = () => (
    <Popup
      modal
      trigger={
        <button type="button" className="ham-button">
          <GiHamburgerMenu size="25" />
        </button>
      }
      className="popup-container-mobile"
    >
      {close => (
        <div className="mobile-popup-content">
          <ul className="mobile-links">
            <li key={links[0].id} className="mobile-item">
              <Link
                to="/"
                className={
                  activeTabId === links[0].path
                    ? `link-mobile active-mobile`
                    : 'link-mobile'
                }
              >
                {links[0].displayText}
              </Link>
            </li>
            <li key={links[1].id} className="mobile-item">
              <Link
                to="/cart"
                className={
                  activeTabId === links[1].path
                    ? `link-mobile active-mobile`
                    : 'link-mobile'
                }
              >
                {links[1].displayText}
              </Link>
            </li>

            <li key={links[2].id} className="mobile-item">
              <button
                className="mobile-logout"
                type="button"
                onClick={onClickLogout}
              >
                {links[2].displayText}
              </button>
            </li>
          </ul>
          <button
            type="button"
            className="popup-close-btn"
            onClick={() => close()}
          >
            <IoCloseCircle size="22" color="#334155" />
          </button>
        </div>
      )}
    </Popup>
  )

  return (
    <nav className="nav-header">
      <div className="nav-content-mobile">
        <Link to="/" className="nav-link">
          <div className="logo-name">
            <img
              alt="website logo"
              src="https://res.cloudinary.com/dkwefqjnn/image/upload/v1660538080/TastyKitchens_logo_p3acpg.png"
              className="website-logo"
            />
            <h1 className="website-heading">Tasty Kitchens</h1>
          </div>
        </Link>
        <div className="nav-links-mobile">{renderHamburgerPopup()}</div>
      </div>

      <div className="nav-content-desktop">
        <Link to="/" className="nav-link">
          <div className="logo-desktop">
            <img
              alt="website logo"
              src="https://res.cloudinary.com/dkwefqjnn/image/upload/v1660538080/TastyKitchens_logo_p3acpg.png"
              className="website-logo-desktop"
            />
            <h1 className="website-heading">Tasty Kitchens</h1>
          </div>
        </Link>
        <div className="links-desktop-container">
          <ul className="links-list-desktop">
            <li key={links[0].id}>
              <Link
                to="/"
                className={
                  activeTabId === links[0].path
                    ? `link-item active-link`
                    : 'link-item'
                }
              >
                {links[0].displayText}
              </Link>
            </li>
            <li key={links[1].id}>
              <Link
                to="/cart"
                className={
                  activeTabId === links[1].path
                    ? 'link-item active-link'
                    : 'link-item'
                }
              >
                {links[1].displayText}
              </Link>
            </li>

            <li key={links[2].id}>
              <button
                className="desktop-logout"
                type="button"
                onClick={onClickLogout}
              >
                {links[2].displayText}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
