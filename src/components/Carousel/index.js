import {Component} from 'react'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

const settings = {
  dots: true,

  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  adaptiveHeight: true,
  appendDots: dots => (
    <div className="slick-dots">
      <ul>{dots}</ul>
    </div>
  ),
}

class Carousel extends Component {
  state = {apiStatus: apiConstants.initial, carouselList: []}

  componentDidMount() {
    this.getCarousels()
  }

  getCarousels = async () => {
    this.setState({apiStatus: apiConstants.progress})
    const carouselToken = Cookies.get('jwt_token')
    const carouselUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${carouselToken}`,
      },
    }
    const response = await fetch(carouselUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      this.setState({
        apiStatus: apiConstants.success,
        carouselList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  carouselLoader = () => (
    <div className="loader-container" testid="restaurants-offers-loader">
      <Loader type="Clock" size="40" color="#F7931E" />
    </div>
  )

  successCarouselView = () => {
    const {offersList} = this.state

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {offersList.map(each => (
            <div key={each.id}>
              <img
                src={each.imageUrl}
                className="carousel-images"
                alt="offer"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  result = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.successCarouselView()
      case apiConstants.progress:
        return this.carouselLoader()
      default:
        return null
    }
  }

  render() {
    return <div className="carousel-container">{this.result()}</div>
  }
}
export default Carousel
