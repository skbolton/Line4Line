import React from 'react'
import LeaderboardEntry from './LeaderboardEntry'

class Leaderboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userArray: []
    }
  }

  componentDidMount () {
    $.get(`/leaderboard`)
    .then(result => {
      const userArray = result.map(user => {
        return {
          userId: user._id,
          name: user.name,
          profilePic: user.profilePic,
          score: user.score
        }
      })
      this.setState({
        userArray: userArray
      })
    })
  }

  render () {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-offset-1 col-sm-10">
              <div className="allUsers">
                Leaderboard
              </div>
              <div>
                {this.state.userArray.map((user, i) =>
                  <LeaderboardEntry userid={user.userId} key={i} name={user.name} profilePic={user.profilePic} score={user.score} />
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

export default Leaderboard
