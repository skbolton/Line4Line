import React from 'react'
import StoryEntryButton from './StoryEntryButton'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

class StoryEntry extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      buttonText: 'join',
    }
  }

  componentDidMount () {

  }

  render () {

    return (
      <div className="storyEntryWrap row">
        <div className="col-sm-9">
          <div className="row">
            <div className="col-xs-10 storyEntryTitle">{this.props.story.title}</div>
            <div className="col-xs-2 storyEntryAuthors">{this.props.story.authors.length}
            <span className="storyEntryAuthorsSlash">/</span>{this.props.story.numberOfAuthors}</div>
          </div>
        </div>
        <div className="col-sm-3 storyEntryJoin">
          <StoryEntryButton props={this.props} currentView={this.state} />
        </div>
      </div>
    )
  }
}

export default StoryEntry
