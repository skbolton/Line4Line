import React from 'react'

const NavHomeButton = (props) => {
  return (
    <a onClick={() => {props.setView('lobby'); window.location = `/#`}} className="standardButton blackButton">
      Home
    </a>
  )
}

export default NavHomeButton
