import React from 'react'
import Line from './Line'
// import Help from '../helpers'
import io from 'socket.io-client'

const socket = io()

class Story extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      storyId: this.props.params.id,
      title: '',
      users: [],
      complete: false,
      length: 0,
      numberUsers: 0,
      currentLine: null,
      lines: [],
      currentUser: this.props.route.user,
      currentUserIndex: 0,
      prevLineIndex: 0,
      linesPerUser: 0
    }
  }

  //once the component renders
  componentDidMount () {
    //retrieve story data from server
    $.get(`/stories/${this.state.storyId}`)
    .then(story => {
      console.log('Got story: ', story);
      console.log('Story ID: ', story._id);
      //set state with this data
      this.setState({
        title: story.title,
        users: story.authors,
        complete: story.complete,
        length: story.length,
        numberUsers: story.numberUsers,
        currentLine: story.currentLine,
        lines: story.lines,
        linesPerUser: story.linesPerUser
      })

      //Find the current user's ID within the users array and retrieve the index
      const currentUserIndex = this.state.users.indexOf(this.state.currentUser.id)

      //If the current user's index is 0, set the prevLineIndex to 0 as well. This will
      //prevent the app from trying to render a line with an index of -1.
      const prevLineIndex = (currentUserIndex ? currentUserIndex - 1 : currentUserIndex)

      this.setState({
        currentUserIndex: currentUserIndex,
        prevLineIndex: prevLineIndex
      })
      return story._id;
    })
    .then(storyID => {
      //we're connected, let's get messages from our test room
      socket.emit('createRoom', `${storyID}`);
    })

    socket.on('updateStory', this.changeState.bind(this))

  }

  addLine(lineData) {
    console.log('line data in addLine: ', lineData);
    socket.emit('sendingLine', lineData);

    socket.on('lineSaved', story => {
      console.log('story in line saved: ', story);
      this.setState({
        lines: story.lines,
        currentLine: story.currentLine,
        complete: story.complete
      })
      socket.emit('updateStoryWithNewLine', story);
    })
  }

  changeState(story){
    console.log('STORY: ', story)
    this.setState({
      lines: story.lines,
      currentLine: story.currentLine,
      users: story.authors,
      complete: story.complete
    })
  }

  //The code below is not DRY but it works. I am ashamed of myself for writing it.
  render () {
    //The previous line
    var prevLine = this.state.lines[this.state.prevLineIndex]
    //Creats an incomplete line with the current user's ID and the story's ID
    var currIncomplete = {userId: this.state.currentUser.id, text: '', story: this.state.storyId}
    //A complete line that the current user wrote.
    var currComplete = this.state.lines[this.state.currentUserIndex]

    if (this.state.complete) {
    //If the story is complete
      return (
        <div className="storyContainer" >
          <h2 className="title">{ this.state.title }</h2>

          {this.state.lines.map((line, i) =>
            <Line line={line} lock={true} key={i} username={this.state.currentUser.name} userphoto={this.state.currentUser.profileImage} addLine={this.addLine}/>
          )}

        </div>
      )
    } else if (this.state.currentLine === 0 && this.state.currentUserIndex === 0) {
    //If the current user is the creator of the story and has not written a line yet
      return (
        <div className="storyContainer" >
          <h2 className="title">{ this.state.title }</h2>

          <Line line={currIncomplete} lock={false} username={this.state.currentUser.name} userphoto={this.state.currentUser.profileImage} addLine={this.addLine}/>

        </div>
      )
    } else if (this.state.currentLine !== this.state.currentUserIndex) {
    //If the current user is not the creator and has not written their line and it is not their turn
      return (
        <div className="storyContainer" >
          <h2 className="title">{ this.state.title }</h2>

          <h3>Not your turn!</h3>

        </div>
      )
    } else if (this.state.currentLine === this.state.currentUserIndex) {
    //If the current user is not the creator and it is their turn to write
       return (
        <div className="storyContainer" >
          <h2 className="title">{ this.state.title }</h2>

          <div>
            <Line line={prevLine} lock={true} />
            <Line line={currIncomplete} lock={false} username={this.state.currentUser.name} userphoto={this.state.currentUser.profileImage} addLine={this.addLine}/>
          </div>

        </div>
      )
    }
  }
}

export default Story
