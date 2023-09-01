import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const RestaurantsList = props => {
  const {itemDetails} = props
  const {id, imageUrl, name, cuisine, userRating} = itemDetails
  return (
    <Link to={`/restaurant/${id}`} className="item-link">
      <li key={id} testid="restaurant-item" className="restaurant-item">
        <img src={imageUrl} alt="restaurant" className="restaurant-image" />
        <div className="restaurant-details-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <div className="restaurant-ratings">
            <AiFillStar color="#FFCC00" className="star-icon" size="12" />
            <p className="restaurant-userRating">{userRating.rating}</p>
            <p className="total-reviews">({userRating.totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantsList
