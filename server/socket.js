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
      console.log('roomID: ', roomID);
      socket.join(roomID);
    });

    client.on('updateStoryWithNewLine', function(line) {
      stories.getOneStorySocketStyle(line.story).then(story => {
        io.emit('updateStory', story)
      })
    })

    client.on('sendingLine', function(lineData) {
      stories.createNewLine(lineData).then(line => {
        io.emit('lineSaved', line)
      })
    })

  })
}
