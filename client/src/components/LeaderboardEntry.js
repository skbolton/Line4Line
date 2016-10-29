import React from 'react'
import io from 'socket.io-client'

class LeaderboardEntry extends React.Component {

  render() {
    return (
      <div className="user">
        <img className="userPic" src={this.props.profilePic} />
        {this.props.name}
        {this.props.score}
      </div>
    )
  }

}

export default LeaderboardEntry
