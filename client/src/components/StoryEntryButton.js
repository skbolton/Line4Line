import React from 'react'

const StoryEntryButton = (props) => {
  console.log('propz', props)
  const storyURL = `/stories/${props.props.story._id}`
  const joinStory = () => {
    $.ajax({
      url: storyURL,
      type: 'GET'
    })
    .then((res) => {
      window.location = `/#${storyURL}`
    })
  }
  // let entryButton
  // if (props.props.story.authors.includes)
    // if (!props.currentUser) {
    //   navButton = <a href="/auth" className="btn btn-primary btn-lg">
    //     <i className="fa fa-facebook-square"></i> Login with Facebook
    //   </a>
    // } else if (props.currentView === 'lobby' || props.currentView === 'welcome' || props.currentView === 'FinishedStories') {
    //   navButton = <a onClick={() => {props.setView('profile'); window.location = `/#/user/${props.currentUser.id}`}} className="btn btn-info btn-lg">
    //     <span className="glyphicon glyphicon-user"></span> Profile
    //   </a>
    // } else if (props.currentView === 'profile') {
    //   navButton = <a onClick={() => {props.setView('lobby'); window.location = `/#`}} className="btn btn-info btn-lg">
    //     <span className="glyphicon glyphicon-home"></span> Lobby
    //   </a>

    let entryButton = <a className="btn btn-info btn-block" onClick={joinStory}>Join</a>

  return (
    <div>
      {entryButton}
    </div>
  )
}

export default StoryEntryButton
