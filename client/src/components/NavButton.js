import React from 'react'

const NavButton = (props) => {
  let navButton
    if (!props.currentUser) {
      navButton = <a href="/auth" className="btn btn-primary btn-lg">
        <i className="fa fa-facebook-square"></i> Login with Facebook
      </a>
    } else if (props.currentView === 'lobby' || props.currentView === 'welcome') {
      navButton = <a onClick={() => {props.setView('profile'); window.location = `/#/user/${props.currentUser.id}`}} className="btn btn-info btn-lg">
        <span className="glyphicon glyphicon-user"></span> Profile
      </a>
    } else if (props.currentView === 'profile') {
      navButton = <a onClick={() => {props.setView('lobby'); window.location = `/#`}} className="btn btn-info btn-lg">
        <span className="glyphicon glyphicon-home"></span> Lobby
      </a>
    }
  return (
    <div>
      {navButton}
    </div>
  )
}

export default NavButton
