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
      <div className="col-sm-9">
        <div className="row">
          <div className="col-xs-10 storyEntryTitle">{props.story.title}</div>
          <div className="col-xs-2 storyEntryAuthors">{props.story.authors.length}
          <span className="storyEntryAuthorsSlash">/</span>{props.story.numberOfAuthors}</div>
        </div>
      </div>
      <div className="col-sm-3 storyEntryJoin">
        <a className="btn btn-info btn-block" onClick={joinStory}>
          Join</a>
      </div>
    </div>
  )
}

export default StoryEntry
