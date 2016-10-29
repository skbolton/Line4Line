import React from 'react'

const Welcome = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <p className="welcomeParagraph">
          <img src="/welcomeToLineAfterLine.png" className="introPhoto img-responsive"/>
          Based off of <a href="https://en.wikipedia.org/wiki/Exquisite_corpse" className="welcomeLink"> Exquisite
          Corpse </a>
          , the game involves taking turns adding a line to an unfolding story while 
          only knowing the line that was written before yours.
          Once completed, the story will be
          displayed for all players to see.
          </p>
          <img src="/storyFromDevTeam.png" className="introPhoto img-responsive"/>
          <p className="welcomeParagraph">
          You can even upvote and share popular stories 
          with your friends on Facebook. Join a story and let hilarity ensue!
          </p>

        </div>
      </div>
    </div>
  )
}

export default Welcome
