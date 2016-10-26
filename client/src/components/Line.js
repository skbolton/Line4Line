import React from 'react'
import io from 'socket.io-client'
// import Story from './Story';

const socket = io()

class Line extends React.Component {

  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.setState({
  //     lock: true
  //   })

  //   var lineThis = this;
  //   var lineData = {
  //     userId: this.state.userId,
  //     text: this.state.text,
  //     story: this.state.story
  //   }
  //   this.props.addLine.bind(lineThis, lineData);
  // }
  formHandler(event) {
    event.preventDefault();
    this.props.addLine(this.input.value);
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
