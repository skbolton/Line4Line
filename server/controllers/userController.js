const User = require('../models/user')

module.exports = {
  get: (req, res) => {
    const user = {
      id: req.user._id,
      fid: req.user.facebookId,
      name: req.user.name,
      profileImage: req.user.profilePic
    }
    res.send(user)
  },

  userProfile: (req, res) => {
    User.findById(req.params.id).populate('storiesCreated storiesContributedTo')
    .then(profile => {
      res.json(profile)
    })
    .catch(err => {
      res.send(`ERROR GETTING USER PROFILE: ${err}`)
    })
  }

};
