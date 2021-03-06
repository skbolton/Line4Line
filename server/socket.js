const socketio = require('socket.io')
const stories = require('./controllers/storyController')

module.exports.listen = function(http){
  io = socketio.listen(http)
  //establish socket connection
  io.on('connection', function(client){
    console.log("socket running")

    //here's how we create a new room
    client.on('createRoom', function(roomID) {
      client.join(roomID);
    });

    // when the client submits a new line save it to the
    // database and return the story
    client.on('sendingLine', function(lineData) {
      stories.createNewLine(lineData)
      // this story is fully populated!
      .then(story => {
        io.in(story._id).emit('lineSaved', story);
      })
    });

    client.on('storyCreated', () => {
      console.log('we got into storyCreated')
      stories.getAllStoriesForSocket()
        .then(allStories => {
          console.log('allStories in storyCreated:', allStories);
          io.emit('storyAdded', allStories);
        })
    })
  })
}
