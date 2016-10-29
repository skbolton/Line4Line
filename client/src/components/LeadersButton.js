import React from 'react'

const LeadersButton = (props) => {
  let leadersButton
    if (props.currentUser) {
      leadersButton = <a onClick={() => {window.location = `/#/leaderboard`}} className="btn btn-info btn-lg">
        <i className="fa fa-star"></i> Leaders
      </a>
    }
  return (
    <div>
      {leadersButton}
    </div>
  )
}

export default LeadersButton
