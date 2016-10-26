import React from 'react'
import NavLoginButton from './NavLoginButton'
import NavHomeButton from './NavHomeButton'
import NavProfileButton from './NavProfileButton'

const NavButton = (props) => {
  let navButton
    if (!props.currentUser) {
      navButton = <NavLoginButton loginWithFacebook={props.loginWithFacebook} />
    } else {
      navButton = <NavProfileButton currentUser={props.currentUser} />

    }
  return (
    <div>
      {navButton}
    </div>
  )
}

export default NavButton
