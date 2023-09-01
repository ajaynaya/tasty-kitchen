import './index.css'

const Counter = props => {
  const {foodId, quantity, increaseQuantity, decreaseQuantity} = props

  const onDecrease = () => {
    decreaseQuantity(foodId)
  }

  const onIncrease = () => {
    increaseQuantity(foodId)
  }

  return (
    <div className="cart-quantity-container">
      <button
        type="button"
        testid="decrement-quantity"
        className="quantity-button"
        onClick={onDecrease}
      >
        -
      </button>
      <p testid="item-quantity" className="food-quantity">
        {quantity}
      </p>
      <button
        type="button"
        testid="increment-quantity"
        className="quantity-button"
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  )
}

export default Counter
