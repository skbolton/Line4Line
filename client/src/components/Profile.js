import React from 'react'

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
    $.get('/user/580fdc121b98a7e5e1814fe7')
    .then(info => {
      console.log('Got profile info:', info);
      let stories = info.storiesCreated.map(story => {
        return {
          link: story._id,
          title: story.title
        }
      })
      this.setState({
        photo: info.profilePic,
        name: info.name,
        stories: stories
      })
    })
  }

  render () {
    return (
      <div>
        <div className='lobby'>
          <div className="lobbyLabels">
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
