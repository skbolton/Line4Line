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
        // console.log('story here = ', story);
        // console.log('user here = ', user);
        if (story.authors.indexOf(user._id) !== -1) {
          return next();
        } else if (story.complete) {
          return res.status(404).send('Sorry mate- this story is already complete');
        } else if (user.storiesContributedTo.indexOf(story._id) !== -1 ){
            return next();
          }

          story.update({ $push: {authors: user._id} })
          .then(answer => {
            if (user.storiesCreated.indexOf(story._id) !== -1) {
              return next()
            } else {
              user.update({ $push: {storiesContributedTo: story._id}})
              .then(answer => {
                console.log('updated')
                return next();
              })
            }
          })
      })
    })
  },

  // called via socket to add a line to a story
  createNewLine: (lineData) => {
    return new Promise ((resolve, reject) => {
      // make a new line with user info
      const { userId, text, story } = lineData;
      return Line.create({ userId, text, story })
      .then(line => {
        return Story.findOneAndUpdate(
          {_id: line.story },
          { $push: { lines: line._id } },
          { new: true }
        )
        .populate('authors')
        .exec()
      })
      .then(story => {
        console.log('story in createnewline: ', story);
        resolve(story);
      })
    })
  },

  createStory: (req, res) => {
    const title = req.body.title;
    const numberOfAuthors = req.body.numberOfAuthors;
    // capture total length of the story, this is the number
    // of users multiplied by number of lines
    const length = req.body.length;
    const linesPerAuthor = req.body.linesPerAuthor;

    new Story({ title, length, numberOfAuthors, linesPerAuthor }).save()
    .then(story => {
      User.findByIdAndUpdate(req.user._id, { $push: { storiesCreated: story._id} })
      .then(answer => {
        res.json({ 'redirect': `/#/stories/${story._id}` })
      })
      .catch(err => {
        return res.status(404).send('User story list not updated')
      })
    })
    .catch(err => {
      return res.status(404).send('Story already created!')
    })
  },

  // get one story is a story fetcher that works off url
  // requests not sockets.
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
      console.log('lines in get one story: ', lines)
      res.json(lines)
    })
    .catch(err => {
      console.log('Could not find story with that id')
      return res.status(404).send('Story not found')
    })
  }

};