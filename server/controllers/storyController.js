const db = require('../models/config')
const Story = require('../models/story')
const Line = require('../models/line')
const User = require('../models/user')

module.exports = {
  getAllStories: (req, res) => {
    Story.find({})
    .then(stories => {
      res.json(stories)
    })
  },

  joinStory: (req, res, next) => {
    User.findById(req.user._id)
    .then(user => {
      Story.findById(req.params.id).then(story => {
        if (story.authors.indexOf(user._id) !== -1) {
          return next()
        } else if (story.complete) {
          return res.status(404).send('Sorry mate- this story is already complete')
        } else {
          story.update({ $push: {authors: user._id}})
          .then(story => {
            console.log('updated')
            return next()
          })
        }
      })
    })
  },
  createNewLine: (lineData) => {
    return new Promise(function(resolve, reject) {
      Story.findById(lineData.story) // Find the story that they are trying to add the line to
      .then(story => {
        if(!story.complete){
          User.findById(lineData.userId) // Find current user
          .then(user => {
            new Line({userId: user._id, story: lineData.story, text: lineData.text}).save() // Create the new line and associate it with the user and story
            .then(line => {
              story.update({ $push: { lines: line._id }, $inc: { currentLine: 1}})
              .then(data => {
                if((story.lines.length + 1 ) === story.length) {
                  story.update({complete: true})
                  .then(() => {
                    resolve(line)
                  })
                } else {
                  resolve(line)
                }
              })
            })
            .catch(err => {
              console.log(err)
            })
          })
        } else {
          res.status(400).send('Story already complete')
        }
      })
    })
  },
  createStory: (req, res) => {
    const title = req.body.title
    const numberUsers = req.body.numberUsers
    const length = req.body.numberUsers//req.body.length

    User.findById(req.user._id)
    .then(user => {
      new Story({ title, length, numberUsers }).save()
      .then(story => {
        console.log('Story saved:', story)
        user.update({ $push: { storiesCreated: story._id } })
        .then(answer => {
          console.log('User storiesCreated array updated:', answer)
          res.json({ 'redirect': `/#/stories/${story._id}` })
        })
        .catch(err => {
          return res.status(404).send('User story list not updated')
        })
      })
      .catch(err => {
        return res.status(404).send('Story already created!')
      })
    })
    .catch(err => {
      console.log('Could not find user with that session')
      return res.status(404).send('User not found')
    })

  },
  getOneStorySocketStyle: (id) => {
    return new Promise((resolve, reject) => {
      Story.findById(id)
      .then(story => {
        if(story.lines.length){
          Promise.all(story.lines.map(lineid =>
            Line.findById(lineid)
          ))
          .then(data => {
            story.lines = data
            resolve(story)
          })
        } else {
          console.log('bungalo res bowls')
        }
      })
      .catch(err => {
        console.log('Could not find story with that id')
      })
    })
  },
  getOneStory: (req, res) => {
    Story.findById(req.params.id).populate({
      path: 'lines',
      model: 'Line',
      populate: {
        path: 'userId',
        model: 'User'
      }
    })
    .then(lines => {
      res.json(lines)
    })
    .catch(err => {
      console.log('Could not find story with that id')
      return res.status(404).send('Story not found')
    })
  }
};
