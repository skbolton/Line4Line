import React from 'react'

const ProfileButton = (props) => {
  return (
      <a onClick={() => {window.location = `#/user/${props.currentUser.id}`}} className="standardButton blackButton">
      Profile Page </a>
  )
}

export default ProfileButton
