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
    <div className="storyEntryWrap row">
      <div className="col-xs-offset-1 col-xs-6 storyEntryTitle">{props.story.title}</div>
      <div className="col-xs-2 storyEntryAuthors">{props.story.authors.length}/{props.story.numberUsers}</div>
      <div className="col-xs-2 storyEntryJoin">
        <a className="btn btn-info btn-lg" onClick={joinStory}>
          Join</a>
      </div>
    </div>
  )
}

export default StoryEntry
