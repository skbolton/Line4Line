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

router.route('/stories/:id').put(stories.createNewLine)

router.route('/logout').get((req,res) => {
  req.logout()
  res.redirect('/')
})

router.route('/auth').get(passport.authenticate('facebook'))

// facebook will call this URL
router.route('/auth/return').get(passport.authenticate('facebook', {
  failureRedirect: '/#/fail',
  successRedirect: '/#/',
}))

module.exports = router
