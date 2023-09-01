import {FaRupeeSign} from 'react-icons/fa'
import KitchenContext from '../../Context/KitchenContext'
import Counter from '../Counter'

import './index.css'

const CartItems = props => (
  <KitchenContext.Consumer>
    {value => {
      const {increaseQuantity, decreaseQuantity} = value
      const {cartItem} = props
      const {id, name, cost, quantity, imageUrl} = cartItem
      const itemPrice = cost * quantity
      return (
        <div testid="cartItem" className="cart-items-list">
          <img className="cart-image" alt={name} src={imageUrl} />
          <div className="cart-items-container">
            <h1 className="item-title">{name}</h1>
            <div className="quantity-container">
              <Counter
                key={id}
                quantity={quantity}
                foodId={id}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
              <p className="cart-item-price">
                <FaRupeeSign />
                {itemPrice}.00
              </p>
            </div>
          </div>
        </div>
      )
    }}
  </KitchenContext.Consumer>
)

export default CartItems
