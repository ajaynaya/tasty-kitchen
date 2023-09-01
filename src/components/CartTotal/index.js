import {FaRupeeSign} from 'react-icons/fa'

import KitchenContext from '../../Context/KitchenContext'

import './index.css'

const CartTotal = props => {
  const {orderPlaced} = props

  return (
    <KitchenContext.Consumer>
      {value => {
        const {cartList} = value

        let totalOrderCost = 0
        cartList.forEach(each => {
          totalOrderCost += each.cost * each.quantity
        })

        const onClickPlaceOrder = () => {
          orderPlaced()
        }

        return (
          <>
            <hr className="line" />
            <div className="cart-summary">
              <h1 className="order-total">Order Total:</h1>
              <p testid="total-price" className="total-price">
                <FaRupeeSign size={14} /> {totalOrderCost}
              </p>
            </div>
            <button
              type="button"
              className="order-button"
              onClick={onClickPlaceOrder}
            >
              Place Order
            </button>
          </>
        )
      }}
    </KitchenContext.Consumer>
  )
}

export default CartTotal
