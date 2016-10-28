import React from 'react'

const FinishedStoriesButton = (props) =>  {
  let FinishedStoriesButton
  if(props.currentUser) {
      FinishedStoriesButton = <a onClick={() => {props.setView('FinishedStories');
      window.location = `/#/stories/finished`}} className = "btn btn-info btn-lg">
        Complete stories
      </a>
  }

  return (
    <div>
      {FinishedStoriesButton}
    </div>
  )
}

export default FinishedStoriesButton