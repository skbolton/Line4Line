const stories = require('../controllers/storyController')
const users = require('../controllers/userController')
const router = require('express').Router()
const path = require('path')
const passport = require('passport')

isAuthed = (req,res,next) => {
  if(req.isAuthenticated()){
    return next()
  }
  console.log(req.isAuthenticated())
}

router.get('/', (req,res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'))
})

//Connect controller methods to their corresponding routes
router.route('/stories').get(stories.getAllStories)

router.route('/user').get(isAuthed, users.get)

router.route('/user/:id').get(isAuthed, users.userProfile)

router.route('/stories/:id').get(isAuthed, stories.joinStory, stories.getOneStory)

router.route('/stories').post(isAuthed, stories.createStory)

router.route('/stories/:id').put((req, res) => {
  if (req.query.vote) {
    stories.votingFunction(req.query.vote, req.params.id, req.session.passport.user._id).then(voteInfo => {
      console.log('vote info: ', voteInfo)
      res.json({votes: voteInfo.votes, upvoters: voteInfo.upvoters, downvoters: voteInfo.downvoters})
    })
  } else {
    // this is never actually called as it's being called on the socket
    stories.createNewLine
  }
})

router.route('/logout').get((req, res) => {
  req.logout()
  res.redirect('/')
})

router.route('/auth').get(passport.authenticate('facebook'))

// facebook will call this URL
router.route('/auth/return').get(passport.authenticate('facebook', {
  failureRedirect: '/#/fail',
  successRedirect: '/#',
}))

module.exports = router
