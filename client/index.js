import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/components/App'
require('./public/styles/main.css')
require('./public/styles/line.css')
require('./public/styles/story.css')
require('./public/styles/lobby.css')
require('./public/styles/storyEntry.css')
require('./public/styles/createStory.css')
require('./public/styles/navbar.css')
require('./public/styles/profile.css')
require('./public/styles/finishedStories.css')
require('./public/styles/welcome.css')

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
