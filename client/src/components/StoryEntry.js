import React from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'


const StoryEntry = (props) => {

  const storyURL = `/stories/${props.story._id}`

  const joinStory = () => {
    $.ajax({
      url: storyURL,
      type: 'GET'
    })
    .then((res) => {
      window.location = `/#${storyURL}`
    })
  }

  return (
    <div className="storyEntryWrap">
      <div className="storyEntryTitle">{props.story.title}</div>
      <div className="storyEntryUsers">{props.story.authors.length}/{props.story.numberUsers}</div>
      <div className='storyEntryJoinWrap'>
        <button onClick={joinStory} className="standardButton blackButton">Join</button>
      </div>
    </div>
  )
}

export default StoryEntry
