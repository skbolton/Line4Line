import React from 'react'
import NavButton from './NavButton'

class NavBar extends React.Component {

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
    return (
      <div className="navbarWrap container-fluid">
        <div className="row">
          <div className="navBarLogo col-sm-6">
            <a onClick={() => {window.location = `/#`}}><h1>Line After Line</h1></a>
          </div>
          <div className="navBarButton col-sm-6">
            <NavButton
              currentUser={this.props.currentUser} currentView={this.state.currentView} setView={this.setView.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar
