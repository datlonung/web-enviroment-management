import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import imageLogin from '../../assets/imgLogin';
import { login } from '../../services/userService';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = async () => {
    setEmailError('')
    setPasswordError('')

    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }
    // eslint-disable-next-line
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }

    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }

    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }

    try {
      const res = await login(email, password, dispatch)
      if (res) {
        navigate('/')
      }
    } catch (error) {

    }

  }

  return (
    <div className={cx("main")}>
      <div className={cx("wrap-card-login")}>
        <div className={cx("card")}>
          <div className={cx("left-card")}>
            <img src={imageLogin.login} alt="fireSpot" />
          </div>
          <div className={cx("right-card")}>
            <div className={cx("title-card")}>
              <div className={cx("title-br")}></div>
              <div className={cx("title-content")}>
                <p>Login as a Admin User</p>
              </div>
            </div>
            <div className={cx("body-card")}>
              <input
                type='email'
                value={email}
                placeholder="Enter your email here"
                onChange={(ev) => setEmail(ev.target.value)}
                className={cx("inputBox")}
              />
              <label className={cx("errorLabel")}>{emailError}</label>
              <input
                type='password'
                value={password}
                placeholder="Enter your password here"
                onChange={(ev) => setPassword(ev.target.value)}
                className={cx("inputBox")}
              />
              <label className={cx("errorLabel")}>{passwordError}</label>
              <button className={cx("btn")} onClick={onButtonClick}>L O G I N</button>
            </div>
            <div className={cx("footed-card")}>
              <a href="/">Forget your password?</a>
              <a href="/">Get help Signed in</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login