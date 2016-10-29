import React from 'react'
import StoryEntry from './StoryEntry'
import CreateStory from './CreateStory'
import io from 'socket.io-client'

const socket = io();

class Lobby extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      allStories: [],
      openStories: [],
      completeStories: [],
      displayComplete: false,
      loggedInUser: this.props.route.user
    }
  this.toggleDisplay = this.toggleDisplay.bind(this)
  }

  componentDidMount () {
    //get an array of all the stories from the db that need more users
    $.get('/stories')
    .then(stories => {
      let completeStories = stories.filter(story => story.finished)
      let openStories = stories.filter(story => story.length > story.lines.length)
      this.setState({
        allStories: stories,
        openStories: openStories,
        completeStories: completeStories
      })
      socket.on('storyAdded', (stories) => {
        console.log('got to storyAdded in lobby');
        let completeStories = stories.filter(story => story.finished);
        let openStories = stories.filter(story => story.length > story.lines.length);
        this.setState({
          allStories: stories,
          openStories: openStories,
          completeStories: completeStories
        })
      });
    })
  }

  toggleDisplay () {
    this.setState({
      displayComplete: !this.state.displayComplete
    })
  }

  render () {
    let displayButtonText = this.state.displayComplete ? 'Show Open' : 'Show Complete'
    return (
      <div className="container lobby">
        <div className="row theButtons">
          <div className="col-xs-6 newStoryButton">
            <a className="btn btn-info btn-lg" data-toggle="collapse" data-target="#newStory">
              <span className="glyphicon glyphicon-pencil"></span> Create Story</a>
          </div>
          <div className="col-xs-6 completeToggleButton">
            <a className="btn btn-info btn-lg" onClick={this.toggleDisplay}>
              <span className="glyphicon glyphicon-check"></span> {displayButtonText}</a>
          </div>
        </div>
        <div id="newStory" className="collapse row">
          <CreateStory />
        </div>
        <div className="row tableHeaderRow">
          <div className="col-sm-9">
            <div className="row">
              <div className="col-xs-10">Story Name</div>
              <div className="col-xs-2">Authors</div>
            </div>
          </div>
        </div>
        { this.state.displayComplete ?

          this.state.completeStories.map((story, i) =>
            <StoryEntry story={story} key={i} />
          )

          :

          this.state.openStories.map((story, i) =>
            <StoryEntry story={story} key={i} loggedInUser={this.state.loggedInUser} />
          )

        }
      </div>
    )
  }
}

export default Lobby
