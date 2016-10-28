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
      <div className="lineContainer row">
      {
        !this.props.lock ?
          //if user hasn't submitted text, render form
          <form ref="form" onSubmit={this.formHandler.bind(this)} className="lineForm">
            <div className="col-xs-1">
              <img className="userLine" src={this.props.userphoto} />
            </div>
            <div className="col-xs-11">
              <input name="input" className="lineInput" type="text" placeholder="Enter the next line of the story here" ref= {(el) => this.input = el} />
            </div>
          </form> :
          //if user has already submitted text, render text as div
          <div className="lineForm">
            <img className="userLine" src={this.props.userphoto} />
            <div className="lineInput">{this.props.text}</div>
          </div>
      }
      </div>
    )
  }
}

export default Line
