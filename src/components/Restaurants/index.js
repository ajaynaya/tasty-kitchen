import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import RestaurantsList from '../RestaurantsList'
import RestaurantsHeaderArea from '../RestaurantsHeaderArea'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 1,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Restaurants extends Component {
  state = {
    restaurantsList: [],
    apiStatus: apiStatusConstants.initial,
    activePage: 1,
    limit: 9,
    activeSortByOption: sortByOptions[1].value,
  }

  componentDidMount() {
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const {activePage, limit, activeSortByOption} = this.state
    const offset = (activePage - 1) * limit
    const restaurantsListUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeSortByOption}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(restaurantsListUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.restaurants.map(each => ({
        hasOnlineDelivery: each.has_online_delivery,
        userRating: {
          ratingText: each.user_rating.rating_text,
          ratingColor: each.user_rating.rating_color,
          totalReviews: each.user_rating.total_reviews,
          rating: each.user_rating.rating,
        },
        name: each.name,
        hasTableBooking: each.has_table_booking,
        isDeliveringNow: each.is_delivering_now,
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        imageUrl: each.image_url,
        id: each.id,
        menuType: each.menu_type,
        location: each.location,
        opensAt: each.opens_at,
        groupByTime: each.group_by_time,
      }))
      this.setState({
        restaurantsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  restaurantLoader = () => (
    <div testid="restaurants-list-loader" className="loader-container">
      <Loader type="Oval" color="#F7931E" width="100%" height="100%" />
    </div>
  )

  onChangeSortByOptions = option => {
    this.setState({activeSortByOption: option}, this.getRestaurantsList)
  }

  pageIncrement = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState({activePage: activePage + 1}, this.getRestaurantsList)
    }
  }

  pageDecrement = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState({activePage: activePage - 1}, this.getRestaurantsList)
    }
  }

  renderRestaurantsList = () => {
    const {restaurantsList, activePage} = this.state
    return (
      <>
        <ul className="restaurantsList-container">
          {restaurantsList.map(each => (
            <RestaurantsList key={each.id} itemDetails={each} />
          ))}
        </ul>
        <div className="pagination-container">
          <button
            type="button"
            className="page-button"
            onClick={this.pageDecrement}
            testid="pagination-left-button"
          >
            <IoIosArrowBack />
          </button>

          <p className="page-number">
            <span testid="active-page-number">{activePage}</span> of 4
          </p>

          <button
            type="button"
            className="page-button"
            testid="pagination-right-button"
            onClick={this.pageIncrement}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </>
    )
  }

  renderMainResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.restaurantLoader()
      case apiStatusConstants.success:
        return this.renderRestaurantsList()
      default:
        return null
    }
  }

  render() {
    const {activeSortByOption} = this.state
    return (
      <div className="restaurants-container">
        <RestaurantsHeaderArea
          sortByOptions={sortByOptions}
          activeSortByOption={activeSortByOption}
          onChangeSortByOptions={this.onChangeSortByOptions}
        />
        {this.renderMainResult()}
      </div>
    )
  }
}
export default Restaurants
