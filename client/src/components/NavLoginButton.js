import React from 'react'
import { Link } from 'react-router'


const NavLoginButton = (props) => {
  return (
    <a href="/auth/facebook" className="standardButton facebookButton">
      Login with Facebook
    </a>
  )
}

export default NavLoginButton
