import React from 'react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import ProfileButton from './ProfileButton'

const Login = (props) => {
  let loginButton
    if (!props.currentUser) {
      loginButton = <LoginButton loginWithFacebook={props.loginWithFacebook} />
    } else {
      loginButton = <ProfileButton profilePage={props.profilePage} />

    }
  return (
    <div>
      {loginButton}
    </div>
  )
}

export default Login