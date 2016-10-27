import React from 'react'

let ProfileStoryEntry = (props) => (
   <div className="storyLists list-group">
    <div className="singleStory list-group-item" onClick={() => { window.location = `/#/stories/${props.story.link}` }}>{props.story.title}</div>
   </div>
);

let onClick = () => { console.log(this) }

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      photo: 'http://i.imgur.com/Gved5aq.jpg',
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
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="userName"> {this.state.name}</div>
                <img src={this.state.photo} className="userPhoto"></img>
                <div className="logoutButton">
                  <a href="/logout" className="standardButton blackButton">
                    Logout
                  </a>
                </div>
            </div>
            <div className="col-sm-6">
              <div className="storyHeader">
                Your stories
              </div>
              <div>
              {this.state.stories.map((story, i) =>
                <ProfileStoryEntry story={story} key={i} />
              )}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

export default Profile
