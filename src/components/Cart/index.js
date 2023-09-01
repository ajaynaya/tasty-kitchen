import {Component} from 'react'

import Header from '../Header'
import Footer from '../Footer'

import EmptyCart from '../EmptyCart'
import CartList from '../CartList'

import './index.css'
import KitchenContext from '../../Context/KitchenContext'

class Cart extends Component {
  render() {
    return (
      <KitchenContext.Consumer>
        {value => {
          const {cartList} = value
          const isCartEmpty = cartList.length === 0

          return (
            <>
              <Header activeTabId="Cart" />
              <div className="cart-container">
                {isCartEmpty ? <EmptyCart /> : <CartList />}
              </div>
              <Footer />
            </>
          )
        }}
      </KitchenContext.Consumer>
    )
  }
}

export default Cart
