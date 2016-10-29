import React from 'react'
import NavButton from './NavButton'
import LeadersButton from './LeadersButton'

class NavBar extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      currentView: 'welcome',
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
          <div className="navBarLogo col-sm-offset-1 col-sm-6">
            <a onClick={() => {this.setView('lobby'); window.location = `/#`}}><span className="line1">Line </span>
              <span className="after">After </span>
              <span className="line2">Line</span>
            </a>
          </div>
          <div className="leadersButton navBarButton col-sm-2">
            <LeadersButton
              currentUser={this.props.currentUser}
            />
          </div>
          <div className="navBarButton col-sm-2">
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
