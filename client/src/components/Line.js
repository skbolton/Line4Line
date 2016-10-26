import React from 'react'
import io from 'socket.io-client'
import Story from './Story';
const socket = io()

const Line = (props) => {
  console.log('line props:', props);

  const handleSubmit = (e) => {
    e.preventDefault();

    var lineData = {
      userId: props.userId,
      text: props.text,
      story: props.story,
      lock: props.lock
    }
    Story.addLine(lineData);
  }

  return (
    <div className="lineContainer">
    {
      !props.lock ?
        //if user hasn't submitted text, render form
        <form ref="form" onSubmit={handleSubmit} className="lineForm">
        <img className="userLine" src={props.userphoto} />
          <input name="input" value={props.text} className="lineInput" type="text" placeholder="..." />
        </form> :
        //if user has already submitted text, render text as div
        <div className="lineForm">
          <div className="userLine">user</div>
          <div className="lineInput">{props.text}</div>
        </div>

    }
    </div>
  )
}

export default Line
