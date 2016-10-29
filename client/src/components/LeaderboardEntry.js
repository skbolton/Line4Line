import React from 'react'
import io from 'socket.io-client'

class LeaderboardEntry extends React.Component {

  render() {
    return (
      <div className="user">
        <img className="userPic" src={this.props.profilePic} />
        <br/>
        {this.props.name}
        <br/>
        Score:
        {this.props.score}
      </div>
    )
  }

}

export default LeaderboardEntry
