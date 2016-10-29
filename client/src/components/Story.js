import React from 'react'
import Line from './Line'
import io from 'socket.io-client'
// this is for facebook sharing, meta tags have to be on page
import DocumentMeta from 'react-document-meta';

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
        votes: story.votes || "Placeholder"
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

    // listen for more messages
    this.state.socket.on('lineSaved', story => {
      this.changeState(story);
    })
  }

  findCurrentAuthor() {
    const { linesPerAuthor, numberOfAuthors } = this.state;
    const length = this.state.lines.length;
    const authorLength = this.state.authors.length;

    if (length < numberOfAuthors) {
      return this.state.authors[length];
    }
    var prevAuthId = this.state.lines[this.state.lines.length - 1].userId[0]
    var authIdx; 
    for (var i=0; i<authorLength; i++) {
      if (this.state.authors[i]._id === prevAuthId) {
        authIdx = i;
        break;
      }
    }
    var nextAuthIdx = authIdx + 1 >= authorLength ? 0 : authIdx + 1;
    return this.state.authors[nextAuthIdx];
  }

  addLine(lineData) {
    event.preventDefault();
    var lineData = {
      userId: this.state.loggedInUser.id,
      story: this.state.storyId,
      text: lineData.text
    }
    this.state.socket.emit('sendingLine', lineData);
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
  }

  upvote() {
    $.ajax({
      url: '/stories/:id?vote=up',
      type: 'PUT'
    })
    .then((res) => {
      this.setState({
        votes: res.votes
      })
    })
  }

  downvote() {
    $.ajax({
      url: '/stories/:id?vote=down',
      type: 'PUT'
    })
    .then((res) => {
      this.setState({
        votes: res.votes
      })
    })
  }

  shareOnFB (e) {
    e.preventDefault();
    console.log(window.location.href)
    FB.ui({
      method: 'share',
      href: window.location.href,
      app_id: 1146101735475048,
      display: 'popup',
    }, console.log)
  }

  /*
    This is a meaty render statement!
    There is a lot of logic going on to make this work
    1. If the story is complete then iterate over the lines and print them out
    2. If the authorOnDeck is not defined (this happens when the next author has not yet joined the game) or if the authorOnDeck is not the current user. In this case display a not your turn warning
    3. Lastly, the authorOnDeck must be the current user and component should render the last line written to the story and have an input to type in the next.
  */
  render () {
    // in order to share a completed story facebook needs some
    // meta tags imbedded into our page
    const meta = {
      title: this.state.title,
      meta: {
        charSet: 'utf-8',
        property: {
          'og:title': 'This story is awesome.',
          'og:description': 'Check out this story made on Line After Line.',
          'og:url': window.location.href
        }
      }
    }
    // destructing common variables
    const { loggedInUser, authorOnDeck, authors } = this.state;
    // if the story is done
    if (this.state.lines.length === this.state.length) {
      let authorIdx = -1;
      const lines = this.state.lines.map((line, idx) => {
        authorIdx++;
        if (authorIdx >= this.state.authors.length) {
          authorIdx = 0
        }
        let author = this.state.authors[authorIdx]
        if (idx !== this.state.lines.length - 1){
          return (
            <Line
              lock={true} 
              key={idx} 
              userId={author._id} 
              userphoto={author.profilePic}
              text={line.text}
            />
          )
        } else {
          return (
            <div>
              <Line
              lock={true} 
              key={idx} 
              userId={author._id} 
              userphoto={author.profilePic}
              text={line.text}
              />
              <div className="voteButtons">
                <a className="btn btn-info" onClick={this.upvote}>I love this story</a>
                <a className="btn btn-danger" onClick={this.downvote}>I hate this story</a>
              </div>
              <p>
              Vote Count: {this.state.votes}
              </p>
            </div>            
          )
        }
      })
      // render out completed stories as well as a button to share story
      return (
        <div className="storyContainer" >
          <DocumentMeta {...meta} />
          <h2 className="title">{ this.state.title }</h2>
          { lines }
          <a 
            onClick={this.shareOnFB.bind(this)}
            className='btn btn-primary'
          >
            <i className="fa fa-facebook-square">&nbsp;</i>
            Share
          </a>
        </div>
      )
      // if the authorOnDeck is not defined or their id doesn't match
      // the logged in user
    } else if (!authorOnDeck || authorOnDeck._id !==loggedInUser.id) {
      return (
        <div className="storyContainer row">
          <div className="col-xs-offset-1 col-xs-10">
            <h2 className="title">{ this.state.title }</h2>
            Not your turn!
          </div>
        </div>
      )
    } else {
      // the current user is the next up to add to the story, find the prev 
      // line in the story (it is possible this is an undefined value since
      // the person creating the story doesn't have a line before them)
      var prevLine = this.state.lines.length - 1 >= 0 
        ? this.state.lines[this.state.lines.length - 1]
        : this.state.lines[0]
      let lines;
      // if we have a valid previous line show it
      if (prevLine) {
        lines = (
          <div>
            <Line text={prevLine.text} lock={true}/>
            <Line 
              lock={false} 
              userId={loggedInUser.id} 
              userphoto={loggedInUser.profileImage}
              addLine={this.addLine.bind(this)}
            />
          </div>
        )
      } else {
        // otherwise just provide an input to start telling the story
        lines = (
          <Line 
            lock={false} 
            userId={loggedInUser.id} 
            userphoto={loggedInUser.profileImage}
            addLine={this.addLine.bind(this)}
          />
        )
      }
      return (
        <div className="storyContainer row">
          <div className="col-xs-offset-1 col-xs-10">
            <h2 className="title">{ this.state.title }</h2>
              { lines }
            </div>
        </div>
      )
    }
  }
}

export default Story
