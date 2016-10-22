const db = require('../models/config')
const Story = require('../models/story')
const Line = require('../models/line')
const User = require('../models/user')

module.exports = {
  getAllStories: (req, res) => {
    Story.find({complete: false, $where: 'this.users.length < this.numberUsers'})
    .then((stories) => {
      console.log('~~~~~~~~~',req.user)
      res.json(stories)
    })
  },

  joinStory: (req, res, next) => {
    console.log(req.user)
    User.findOne({facebookId: req.user.facebookId})
    .then(user => {
      Story.findOne({_id: req.params.id}).then(story => {
        if(story.users.indexOf(user.facebookId) !== -1) {
          return next()
        } else if(story.complete) {
          return res.status(404).send('Sorry mate- this story is already complete')
        } else {
          story.update({ $push: {users: user.facebookId}})
          .then(story => {
            console.log('updated')
            return next()
          })
        }
      })
    })
  },
  createNewLine: (req, res) => {
    var lineContent = req.body.text
    Story.findOne({_id: req.params.id}) // Find the story that they are trying to add the line to
    .then((story) => {
      User.findOne({sessions: req.cookies.sessionId}) // Find current user
      .then((user) => {
        new Line({userId: user._id, story: story._id, text: lineContent}).save() // Create the new line and associate it with the user and story
        .then((line) => {
          story.update({ $push: { lines: line._id }})
          .then(()=> {
            if(story.lines.length >= story.length) {
              story.update({complete: true})
              .then(()=>{
                res.send(line)
              })
            } else {
              res.send(line)
            }
          })
        })
      })
    })
  },
  createStory: (req, res) => {
    console.log(req.body)
    const length = req.body.storyLength * 1
    const title = req.body.title
    const numberUsers = req.body.numberUsers * 1

    console.log(req.user)
    User.findOne({facebookId: req.user.facebookId})
    .then((user)=>{
      new Story({title: title, length: length, users: [], numberUsers: numberUsers }).save()
      .then((story) => {
        console.log("Story saved: ", story)
        res.json({"redirect":`http://localhost:8081/#/stories/${story._id}`})
      })
      .catch((err) => {
        return res.status(404).send('Story already created!')
      })
    })
    .catch((err) => {
      console.log('Could not find user with that session')
      return res.status(404).send('User not found')
    })

  },
  getOneStory: (req, res) => {
    console.log(req.params)
    Story.findOne({_id: req.params.id})
    .then((story) => {
        res.json(story)
    })
    .catch((err) => {
      console.log('Could not find story with that id')
      return res.status(404).send('Story not found')
    })
  }
};
