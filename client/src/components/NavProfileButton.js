import React from 'react'

const NavProfileButton = (props) => {
  return (
      <a onClick={() => {window.location = `#/user/${props.currentUser.id}`}} className="standardButton blackButton">
      Profile Page </a>
  )
}

export default NavProfileButton
