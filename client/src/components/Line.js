import React from 'react'
import io from 'socket.io-client'
// import Story from './Story';
// const socket = io()

class Line extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userId: props.line.userId,
      text: props.line.text,
      story: props.line.story,
      lock: props.lock,
      addLine: props.addLine,
      userPhoto: props.userphoto 
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      lock: true
    })

    var lineData = {
      userId: this.state.userId,
      text: this.state.text,
      story: this.state.story
    }
    this.props.addLine(lineData);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      text: e.target.value
    })
  }

  render() {
    return (
      <div className="lineContainer">
      {
        !this.state.lock ?
          //if user hasn't submitted text, render form
          <form ref="form" onSubmit={this.handleSubmit.bind(this)} className="lineForm">
          <img className="userLine" src={this.props.userphoto} />
            <input name="input" value={this.state.text} onChange={(e) => this.handleChange.bind(e)} className="lineInput" type="text" placeholder="..." />
          </form> :
          //if user has already submitted text, render text as div
          <div className="lineForm">
            <div className="userLine">user</div>
            <div className="lineInput">{this.state.text}</div>
          </div>
      }
      </div>
    )
  }
}

export default Line
