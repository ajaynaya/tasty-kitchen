import {Link} from 'react-router-dom'

import './index.css'

const CartEmpty = () => (
  <div className="empty-cart-container">
    <img
      src="https://res.cloudinary.com/dkwefqjnn/image/upload/v1660802118/OBJECTS_fg5hvu.png"
      alt="empty cart"
      className="empty-cart-image"
    />
    <h1 className="empty-cart-heading">No Order Yet!</h1>
    <p className="empty-cart-text">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/" className="empty-cart-link">
      <button type="button" className="empty-cart-order">
        Order Now
      </button>
    </Link>
  </div>
)

export default CartEmpty
