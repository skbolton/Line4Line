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
      console.log('author on deck after mount:', this.state.authorOnDeck)
      return story._id;
    })
    .then(storyID => {
      //we're connected, let's get messages from our test room
      this.state.socket.emit('createRoom', `${storyID}`);
    })
  }

  findCurrentAuthor() {
    const { numberOfAuthors, linesPerAuthor } = this.state;
    const length = this.state.lines.length; //2
    if (length >= numberOfAuthors) {  // 2 > 2
      return this.state.authors[Math.ceil(length / linesPerAuthor) - 1];
    } else {
      if (!this.state.authors[length - 1]) {
        return this.state.authors[0];
      } else {
        return this.state.authors[length];
      }
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
    this.updateCurrentAuthor();
  }

  updateCurrentAuthor() {
    this.setState({
      authorOnDeck: this.findCurrentAuthor()
    })
    console.log('author on deck after update: ', this.state.authorOnDeck)
  }

  render () {
    // this gives back an object
    var prevLine = this.state.lines.length - 1 >= 0 
      ? this.state.lines[this.state.lines.length - 1]
      : this.state.lines[0]

    //If the story is complete
    if (this.state.lines.length === this.state.length) {
      let authorIdx = 0;
      return (
        <div className="storyContainer" >
          <h2 className="title">{ this.state.title }</h2>
          {
            this.state.lines.map((line, i) => {
              let author = this.state.authors[authorIdx];
              <Line
                lock={true} 
                key={i} 
                userId={author.userId} 
                userphoto={author.userphoto}
                text={line.text}
              />
              authorIdx = authorIdx === this.state.authors.length - 1 ? 0 : authorIdx += 1;
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
      let lines;
      if (prevLine) {
        lines = (
          <div>
            <Line text={prevLine.text} lock={true}/>
            <Line 
              lock={false} 
              userId={this.state.loggedInUser.id} 
              userphoto={this.state.loggedInUser.profileImage}
              addLine={this.addLine.bind(this)}
            />
          </div>
        )
      } else {
        lines = (
          <Line 
            lock={false} 
            userId={this.state.loggedInUser.id} 
            userphoto={this.state.loggedInUser.profileImage}
            addLine={this.addLine.bind(this)}
          />
        )
      }
      return (
        <div className="storyContainer" >
          <h2 className="title">{ this.state.title }</h2>
            { lines }
        </div>
      )      
    }
  }
}

export default Story
