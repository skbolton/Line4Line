import React from 'react'

let ProfileStoryEntry = (props) => (
   <div className="storyLists list-group">
    <div className="singleStory list-group-item" onClick={() => { window.location = `/#/stories/${props.story.link}` }}>
    {props.story.title}
    </div>
   </div>
);

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      photo: 'http://i.imgur.com/Gved5aq.jpg',
      name: 'Robert Davenport',
      stories: [],
      contriStories: []
    }
  }

  componentDidMount () {
    //get an array of all user info
    $.get(`/user/${this.props.params.id}`)
    .then(info => {
      console.log('Got profile info:', info);
      const storyArr = info.storiesCreated.map(story => {
        return {
          link: story._id,
          title: story.title
        }
      })
      const contriStoryArr = info.storiesContributedTo.map(story => {
        return {
          link: story._id,
          title: story.title
        }
      });
      console.log(contriStoryArr);
      this.setState({
        photo: info.profilePic,
        name: info.name,
        stories: storyArr,
        contriStories: contriStoryArr
      })
    })
  }

  render () {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="userName"> {this.state.name}</div>
                <img src={this.state.photo} className="userPhoto"></img>
                <div className="logoutButton">
                  <a href="/logout" className="btn btn-default btn-lg">
                    Logout
                  </a>
                </div>
            </div>
            <div className="col-sm-4">
              <div className="storyHeader">
                Your stories
              </div>
              <div>
              {this.state.stories.map((story, i) =>
                <ProfileStoryEntry story={story} key={i} />
              )}
              </div>
            </div>
            <div className="col-sm-4"> 
              <div className="storyHeader"> 
                Stories you added to
              </div>
              <div>
                {this.state.contriStories.map((story, i) =>
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
