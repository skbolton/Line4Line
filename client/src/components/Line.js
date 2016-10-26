import React from 'react'
import io from 'socket.io-client'

const socket = io()

class Line extends React.Component {
 
  formHandler(event) {
    event.preventDefault();
    var lineData = {
      text: this.input.value,
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
            <div className="userLine">user</div>
            <div className="lineInput">{this.state.text}</div>
          </div>
      }
      </div>
    )
  }
}

export default Line
