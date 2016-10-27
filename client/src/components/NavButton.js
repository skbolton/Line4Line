import React from 'react'
import NavLoginButton from './NavLoginButton'
import NavHomeButton from './NavHomeButton'
import NavProfileButton from './NavProfileButton'

class NavButton extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      currentView: 'lobby',
    }
  }

  setView(view) {
    this.setState({
      currentView: view
    })
  }


  render () {

    let navButton
      if (!this.props.currentUser) {
        navButton = <NavLoginButton />
      } else if (this.props.currentUser && this.state.currentView === 'lobby') {
        navButton = <NavProfileButton setView={this.setView.bind(this)} currentUser={this.props.currentUser} />
      } else if (this.state.currentView === 'profile') {
        navButton = <NavHomeButton setView={this.setView.bind(this)} />
      }

    return (
      <div>
        {navButton}
      </div>
    )
  }
}

export default NavButton
