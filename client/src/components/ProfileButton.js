import React from 'react'

const ProfileButton = (props) => {
  return (
      <a onClick={props.profilePage} href="/profilePage" className="standardButton blackButton">
      Profile Page </a>
  )
}

export default ProfileButton