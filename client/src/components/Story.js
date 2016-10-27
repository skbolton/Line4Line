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
      loggedInUser: this.props.route.user,
      authorOnDeck: undefined,
      socket: socket
    }
  }

  //once the component renders
  componentDidMount () {
    //retrieve story data from server
    $.get(`/stories/${this.state.storyId}`)
    .then(story => {
      console.log('story upon mounting: ', story);
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
      })
      this.setState({
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
    const { numberOfAuthors, linesPerAuthor } = this.state;
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
      userId: this.state.loggedInUser.id,
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
    var prevLine = this.state.lines[this.state.lines.length - 2]

    //If the story is complete
    if (this.state.lines.length === this.state.length) {
      let authorIdx = 0;
      return (
        <div className="storyContainer" >
          <h2 className="title">{ this.state.title }</h2>
          {
            this.state.lines.map((line, i) => {
              console.log('line: ', line);
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
    } else if (this.state.authorOnDeck !== this.state.loggedInUser.id) {
      return (
        <div className="storyContainer" >
          <h2 className="title">{ this.state.title }</h2>
          Not your turn!
        </div>
      )
    } else {
      var lines 
      return (
        <div className="storyContainer" >
          <h2 className="title">{ this.state.title }</h2>
            <Line line={prevLine.text} lock={true}/>
            <Line 
              lock={false} 
              userId={this.state.loggedInUser} 
              userphoto={this.state.loggedInUser.profileImage}
              addLine={this.addLine.bind(this)}
            />
        </div>
      )      
    }
  }
}

export default Story
