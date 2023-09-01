import {Component} from 'react'

import OrderSuccess from '../OrderSuccess'
import CartItems from '../CartItems'
import CartTotal from '../CartTotal'

import KitchenContext from '../../Context/KitchenContext'

import './index.css'

class CartList extends Component {
  state = {
    isOrderPlaced: false,
  }

  orderPlaced = () => {
    this.setState(prevState => ({isOrderPlaced: !prevState.isOrderPlaced}))
  }

  render() {
    const {isOrderPlaced} = this.state
    return (
      <KitchenContext.Consumer>
        {value => {
          const {cartList} = value
          return isOrderPlaced ? (
            <OrderSuccess />
          ) : (
            <div className="cart-content-container">
              <div className="cart-header-items">
                <p className="cart-heading">Item</p>
                <p className="cart-heading">Quantity</p>
                <p className="cart-heading">Price</p>
              </div>

              {cartList.map(eachItem => (
                <CartItems key={eachItem.id} cartItem={eachItem} />
              ))}

              <CartTotal orderPlaced={this.orderPlaced} />
            </div>
          )
        }}
      </KitchenContext.Consumer>
    )
  }
}

export default CartList
