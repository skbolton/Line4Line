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

  // this function is a middleware to make sure user is added
  // to the authors array in a story, this function is called
  // when a user
  joinStory: (req, res, next) => {
    User.findById(req.user._id)
    .then(user => {
      Story.findById(req.params.id).then(story => {
        // console.log('story here = ', story);
        // console.log('user here = ', user);
        if (story.authors.indexOf(user._id) !== -1) {
          return next();
        } else if (story.lines.length === story.length) {
          return res.status(404).send('Sorry mate- this story is already complete');
        } else {
          if (story.authors.length !== story.numberOfAuthors) {
            story.update({ $push: {authors: user._id} })
            .then(answer => {
              if (user.storiesContributedTo.indexOf(story._id) !== -1 ){
                return next();
              } else if (user.storiesCreated.indexOf(story._id) !== -1) {
                return next();
              } else {
                user.update({ $push: { storiesContributedTo: story._id} })
                .then(answer => {
                  console.log('updated')
                  return next();
                })
              }
            })
          } else {
            return res.status(404).send('This story has enough authors')
          }
        }
      })
    })
  },

  // saves a new line through a socket connection and then returns
  // a fully populated story so that the socket can update 
  // the clients story state
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
        .populate('authors lines')
      })
      .then(story => {
        resolve(story);
      })
    })
  },

  // called from lobby to create a new story, will redirect them
  // to their story
  createStory: (req, res) => {
    const title = req.body.title;
    const numberOfAuthors = req.body.numberOfAuthors;
    // capture total length of the story, this is the number
    // of users multiplied by number of lines
    const length = req.body.length;
    const linesPerAuthor = req.body.linesPerAuthor;

<<<<<<< HEAD
    new Story({ title, length, numberOfAuthors, linesPerAuthor }).save()
    .then(story => {
      User.findByIdAndUpdate(req.user._id, { $push: { storiesCreated: story._id} })
      .then(answer => {
        res.json({ 'redirect': `/#/stories/${story._id}` })
=======
    User.findById(req.user._id)
    .then(user => {
      new Story({ title, length, numberOfAuthors, linesPerAuthor }).save()
      .then(story => {
        user.update({ $push: { storiesCreated: story._id } })
        .then(answer => {
          console.log(user)
          res.json({ 'redirect': `/#/stories/${story._id}` })
        })
        .catch(err => {
          return res.status(404).send('User story list not updated')
        })
>>>>>>> story2
      })
      .catch(err => {
        return res.status(404).send('User story list not updated')
      })
    })
    .catch(err => {
      return res.status(404).send('Story already created!')
    })
  },
<<<<<<< HEAD

  // get one story is a story fetcher that works off url
  // requests not sockets.
=======
  // called anytime a component mounts and needs data for a particular story
  // populate the authors and lines to give the component the complete info
  // in the story
>>>>>>> story2
  getOneStory: (req, res) => {
    Story.findById(req.params.id)
      .populate('authors lines')
      .then(lines => {
        console.log('lines on mount ', lines)
        res.json(lines)
      })
      .catch(err => {
        console.log('Could not find story with that id')
        return res.status(404).send('Story not found')
      })
  }

};
