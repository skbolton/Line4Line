import React from 'react'
import io from 'socket.io-client'

class Line extends React.Component {
 
  formHandler(event) {
    event.preventDefault();
    var lineData = {
      // userId: this.props.userId,
      text: this.input.value,
      // story: this.props.story
    }
    this.props.addLine(lineData);
  }


  render() {
    return (
      <div className="lineContainer">
      {
        !this.props.lock ?
          //if user hasn't submitted text, render form
          <form ref="form" onSubmit={this.formHandler.bind(this)} className="lineForm">
          <img className="userLine" src={this.props.userphoto} />
            <input name="input" className="lineInput" type="text" placeholder="..." ref= {(el) => this.input = el} />
          </form> :
          //if user has already submitted text, render text as div
          <div className="lineForm">
            <img className="userLine" /*src={this.props.userphoto}*/ />
            <div className="lineInput">{this.props.line.text}</div>
          </div>
      }
      </div>
    )
  }
}

export default Line
