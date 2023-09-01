import Carousel from '../Carousel'

import Header from '../Header'
import Footer from '../Footer'
import Restaurants from '../Restaurants'
import './index.css'

const Home = () => (
  <div className="home-container">
    <Header activeTabId="Home" />
    <Carousel />
    <Restaurants />
    <Footer />
  </div>
)

export default Home
