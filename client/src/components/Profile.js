import React from 'react'

let ProfileStoryEntry = (props) => (
  <div className="storyLists list-group">
    <div className="singleStory list-group-item" onClick={() => { window.location = `/#/${props.story.link}`; }}>
      {props.story.title}
    </div>
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
      <div>
        <div className="lobby row" >
          <div className="row col-xs-6"  >
            <div className="userName"> {this.state.name}</div>
              <img src={this.state.photo} className="userPhoto"></img>
              <div className="logoutButton">
                <a href="/logout" className="standardButton blackButton">
                  Logout
                </a>
              </div>
          </div>
          <div className="row col-xs-6"> 
            <div className="storyHeader"> 
              Stories you've created
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

// <div className="col-sm-6 profileColumn">
//   <div className="row">
//     <div className="col-xs-7 profilePhotoColumn">
//       <img src={props.user.image} className="img-responsive profilePhoto"/>
//     </div>
//     <div className="col-xs-5 userInfoColumnn">
//       <div className="row">
//         <div className="col-xs-12 userName">
//           {props.user.displayName}
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-xs-12 userLocation">
//            {props.user.location}
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-xs-12 userBooksRead">
//           <br></br>
//           <div className="bookCountTitle"> Book Count</div>
//           {props.user.stats}
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

