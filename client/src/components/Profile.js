import React from 'react'

let ProfileStoryEntry = (props) => (
  <div className="">
    <div className="" onClick={() => { window.location = `/#/stories/${props.story.link}` }}>{props.story.title}</div>
  </div>
);

let onClick = () => { console.log(this) }

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      photo: 'http://i.imgur.com/xt8MjZ5.jpg',
      name: 'Robert Davenport',
      stories: []
    }
  }

  componentDidMount () {
    //get an array of all user info
    let location = document.location.href
    location = location.slice(-34, -10)
    $.get(`/user/${location}`)
    .then(info => {
      console.log('Got profile info:', info);
      const storyArr = info.storiesCreated.map(story => {
        return {
          link: story._id,
          title: story.title
        }
      })
      this.setState({
        photo: info.profilePic,
        name: info.name,
        stories: storyArr
      })
    })
  }

  render () {
    return (
      <div>
        <div className="lobby">
          <div className="lobbyLabels">
          <a href="/logout">logout</a>
            {this.state.name}
            <img src={this.state.photo}></img>
            {this.state.stories.map((story, i) =>
              <ProfileStoryEntry story={story} key={i} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
