import React from 'react'
import Line from './Line'
import io from 'socket.io-client'

const socket = io();

class Story extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      storyId: this.props.params.id,
      title: '',
      authors: [],
      numOfAuthors: 0,
      complete: false,
      lengthOfStory: 0,
      lines: [],
      currentLine: null,
      prevLineIndex: 0,
      linesPerAuthor: 0,
      currentAuthor: this.props.route.user,
      currentAuthorIndex: 0,
      socket: socket
    }
  }

  //once the component renders
  componentDidMount () {
    //retrieve story data from server
    $.get(`/stories/${this.state.storyId}`)
    .then(story => {
      //set state with this data
      this.setState({
        title: story.title,
        authors: story.authors,
        numOfAuthors: story.numberUsers,
        complete: story.complete,
        lengthOfStory: story.length,
        lines: story.lines,
        currentLine: story.lines.length,
        linesPerAuthor: story.linesPerUser,
      })
      //Find the current user's ID within the users array and retrieve the index
      const currentAuthorIndex = this.state.authors.indexOf(this.state.currentAuthor.id)

      //If the current user's index is 0, set the prevLineIndex to 0 as well. This will
      //prevent the app from trying to render a line with an index of -1.
      const prevLineIndex = (this.state.currentAuthorIndex ? this.state.currentAuthorIndex - 1 : this.state.currentAuthorIndex)

      this.setState({
        currentAuthorIndex: currentAuthorIndex,
        prevLineIndex: prevLineIndex
      })
      return story._id;
    })
    .then(storyID => {
      //we're connected, let's get messages from our test room
      this.state.socket.emit('createRoom', `${storyID}`);
    })
  }

  addLine(lineData) {
    event.preventDefault();
    var lineData = {
      userId: this.state.authors[this.state.currentAuthorIndex],
      story: this.state.storyId,
      text: lineData.text
    }

    this.state.socket.emit('sendingLine', lineData);

    this.state.socket.on('lineSaved', story => {
      this.changeState(story);
    })
  }

  changeState(story) {
    this.setState({
      lines: story.lines,
      currentLine: story.lines.length,
      authors: story.authors,
      complete: story.complete
    })
    console.log('this.state: ', this.state)
  }

  // populateLines(story) {
  //   this.state.socket.emit('populateLines', story);
  //   this.state.socket.on('linesPopulated', result => {
  //     this.renderLines(result);
  //   });
  // }

  //The code below is not DRY but it works. I am ashamed of myself for writing it.
  render () {
    //The previous line
    var prevLine = this.state.lines[this.state.prevLineIndex]
    //Creats an incomplete line with the current user's ID and the story's ID
    var currIncomplete = {userId: this.state.currentAuthor.id, text: '', story: this.state.storyId}
    //A complete line that the current user wrote.
    var currComplete = this.state.lines[this.state.currentAuthorIndex]

    if (this.state.lines.length === this.state.lengthOfStory) {
    //If the story is complete
      return (
        <div className="storyContainer" >
          <h2 className="title">{ this.state.title }</h2>

          {this.state.lines.map((line, i) =>

            <Line line={line} lock={true} key={i} userId={this.state.currentAuthor.id} username={this.state.currentAuthor.name} userphoto={this.state.currentAuthor.profileImage}/>
          )}

        </div>
      )
    } else if (this.state.currentLine === 0 && this.state.currentAuthorIndex === 0) {
    //If the current user is the creator of the story and has not written a line yet
      return (
        <div className="storyContainer" >
          <h2 className="title">{ this.state.title }</h2>

          <Line line={currIncomplete} lock={false} userId={this.state.currentAuthor.id} username={this.state.currentAuthor.name} userphoto={this.state.currentAuthor.profileImage} addLine={this.addLine.bind(this)}/>

        </div>
      )
    } else if (this.state.currentLine !== this.state.currentAuthorIndex) {
    //If the current user is not the creator and has not written their line and it is not their turn
      return (
        <div className="storyContainer" >
          <h2 className="title">{ this.state.title }</h2>

          <h3>Not your turn!</h3>

        </div>
      )
    } else if (this.state.currentLine === this.state.currentAuthorIndex) {
    //If the current user is not the creator and it is their turn to write
       return (
        <div className="storyContainer" >
          <h2 className="title">{ this.state.title }</h2>

          <div>
            <Line line={prevLine} lock={true} />
            <Line line={currIncomplete} lock={false} userId={this.state.currentAuthor.id} username={this.state.currentAuthor.name} userphoto={this.state.currentAuthor.profileImage} addLine={this.addLine.bind(this)}/>
          </div>

        </div>
      )
    }
  }
}

export default Story
