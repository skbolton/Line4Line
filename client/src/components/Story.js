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
      lines: [],
      length: 0,
      //will be set to total number of authors upon mounting
      numberOfAuthors: 0,
      //will be set to number of lines per author upon mounting
      linesPerAuthor: 0,
      loggedInUser: this.props.route.user.id,
      authorOnDeck: undefined,
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
        //array of author ids
        authors: story.authors,
        numberOfAuthors: story.numberOfAuthors,
        linesPerAuthor: story.linesPerAuthor,
        length: story.length,
        //array of line ids
        lines: story.lines,
        authorOnDeck: this.findCurrentAuthor()
      })
      return story._id;
    })
    .then(storyID => {
      //we're connected, let's get messages from our test room
      this.state.socket.emit('createRoom', `${storyID}`);
    })
  }

  findCurrentAuthor() {
    const { numberOfAuthors, linesPerAuthor } = this.state
    const length = this.state.lines.length;
    if (length > numberOfAuthors) {
      return this.state.authors[Math.ceil(length / linesPerAuthor) - 1];
    } else {
      return this.state.authors[length];
    }
  }

  addLine(lineData) {
    event.preventDefault();
    var lineData = {
      userId: this.state.loggedInUser,
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
      authors: story.authors
    })
    this.setState({
      authorOnDeck: this.findCurrentAuthor()
    })
    console.log('this.state: ', this.state)
  }

  render () {
    //The previous line
    var prevLine = this.state.lines[this.state.prevLineIndex]
    //Creats an incomplete line with the current user's ID and the story's ID
    var currIncomplete = {userId: this.state.currentAuthor.id, text: '', story: this.state.storyId}
    //A complete line that the current user wrote.
    var currComplete = this.state.lines[this.state.currentAuthorIndex]

    //If the story is complete
    if (this.state.lines.length === this.state.length) {
      let authorIdx = 0;
      return (
        <div className="storyContainer" >
          <h2 className="title">{ this.state.title }</h2>
          {
            this.state.lines.map((line, i) => {
              let author = authors[authorIdx];
              <Line 
                line={line} 
                lock={true} 
                key={i} 
                userId={author.userId} 
                userphoto={author.userphoto}
                text={line.text}
              />
              authorIdx = authorIdx === authors.length - 1 ? 0 : authorIdx += 1;
            })
          }

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
