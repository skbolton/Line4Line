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
                    //send a promise that resolves to the entire story, not just the new line
                    resolve(story)
                  })
                } else {
                  resolve(story);
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
  // getOneStory socket style uses a directly passed id to 
  // fetch a story and its lines
  getOneStorySocketStyle: (id) => {
    console.log('got to get one story socket style');
    Story.findById(id).populate('lines')
      .then(lines => {
        res.status(200).json(lines)
      })
      .catch(err => {
        return res.status(400).send('Story not found');
      })
  },
  // get one story is a story fetcher that works off url 
  // requests not sockets.
  getOneStory: (req, res) => {
    Story.findById(req.params.id).populate('lines')
    .then(lines => {
      res.json(lines)
    })
    .catch(err => {
      console.log('Could not find story with that id')
      return res.status(404).send('Story not found')
    })
  }
};
