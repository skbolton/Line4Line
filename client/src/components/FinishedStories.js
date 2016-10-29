import React from 'react'

let ProfileStoryEntry = (props) => (
   <div className="storyLists list-group">
    <div className="singleStory list-group-item" onClick={() => { window.location = `/#/stories/${props.story.link}` }}>{props.story.title}</div>
   </div>
);

class FinishedStories extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      storyArr: []
    }
  }

  componentDidMount () {
    $.get(`/stories?finished=true`)
    .then(info => {
      const storyArr = info.map(story => {
        return {
          link: story._id,
          title: story.title
        }
      })
      this.setState({
        storyArr: storyArr
      })
    })
  }

  render () {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-offset-1 col-sm-10">
              <div className="allStories">
                Your stories
              </div>
              <div>
                {this.state.storyArr.map((story, i) =>
                  <ProfileStoryEntry story={story} key={i} />
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

export default FinishedStories
