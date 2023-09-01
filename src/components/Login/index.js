import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const loginToken = Cookies.get('jwt_token')
    if (loginToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-image">
          <img
            alt="website login"
            className="login-bg"
            src="https://res.cloudinary.com/dkwefqjnn/image/upload/v1660538052/Login_background_f3qesx.png"
          />
        </div>
        <form className="form-container">
          <img
            src="https://res.cloudinary.com/dkwefqjnn/image/upload/v1660538080/TastyKitchens_logo_p3acpg.png"
            className="login-desktop"
            alt="website logo"
          />
          <h1 className="kitchen-title">Tasty Kitchens</h1>
          <h1 className="login-title">Login</h1>
          <div className="input-container">
            <label htmlFor="username" className="labels">
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              onChange={this.onChangeUsername}
              placeholder="Username"
              className="inputs"
              id="username"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="labels">
              PASSWORD
            </label>

            <input
              placeholder="Password"
              className="inputs"
              value={password}
              type="password"
              onChange={this.onChangePassword}
              id="password"
            />
          </div>
          <button
            onSubmit={this.onSubmitForm}
            type="button"
            className="submit-btn"
          >
            Login
          </button>
          {showError && <p className="err-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
