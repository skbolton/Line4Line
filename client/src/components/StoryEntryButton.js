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
  let entryButton
  if (props.props.story.finished) {
    entryButton = <a className="btn btn-info btn-block" onClick={joinStory}> View</a>
  } else if (props.props.story.authors.includes(props.props.loggedInUser.id)) {
    // if currentUser is in the array of story authors, display return
    entryButton = <a className="btn btn-info btn-block" onClick={joinStory}>Return</a>
  } else if (!props.props.story.authors.includes(props.props.loggedInUser.id) && props.props.story.authors.length === props.props.story.numberOfAuthors) {
    // elseif currentUser isn't in the array of story authors and it's full, display FULL
    entryButton = <a className="btn btn-info btn-block disabled">FULL</a>
  } else {
    // else display join
    entryButton = <a className="btn btn-info btn-block" onClick={joinStory}>Join</a>
  }

  return (
    <div>
      {entryButton}
    </div>
  )
}

export default StoryEntryButton
