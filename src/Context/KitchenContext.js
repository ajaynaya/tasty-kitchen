import React from 'react'

const KitchenContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeAllCartItems: () => {},
})
export default KitchenContext
