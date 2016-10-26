import React from 'react'
import Login from './Login'

const NavBar = (props) => {
  return (
    <div className="navbarWrap">
      <div className="headerLogo">
        <a href="/"><h1>Line After Line</h1></a>
      </div>
      <div className="headerLogButton">
        <Login
          profilePage={props.profilePage}
          currentUser={props.currentUser}
        />
      </div>
    </div>
  )
}

export default NavBar
