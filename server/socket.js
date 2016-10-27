const socketio = require('socket.io')
const stories = require('./controllers/storyController')

module.exports.listen = function(http){
  io = socketio.listen(http)
  //establish socket connection
  io.on('connection', function(client){
    console.log("socket running")

    client.on('salty slug',function() {
      console.log('~~~~~~~~~~~~~Chuck is a salty slug~~~~~~~~~~~')
    })

    //here's how we create a new room
    client.on('createRoom', function(roomID) {
      client.join(roomID);
    });

    // when the client sends a line up the socket
    // attempt to save it to the story
    client.on('sendingLine', function(lineData) {
      stories.createNewLine(lineData)
      .then(story => {
        console.log('final story: ', story);
        io.in(story._id).emit('lineSaved', story);
      })
    })
  })
}
