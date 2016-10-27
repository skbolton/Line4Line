import React from 'react'

const NavProfileButton = (props) => {
  return (
      <a onClick={() => {props.setView('profile'); window.location = `#/user/${props.currentUser.id}`}} className="standardButton blackButton">
      Profile</a>
  )
}

export default NavProfileButton
