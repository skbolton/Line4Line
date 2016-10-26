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
      client.join(roomID);
    });

    client.on('updateStoryWithNewLine', (story) => {
      console.log('got to update story with new line');
      stories.getOneStorySocketStyle(story).then(story => {
        io.emit('updateStory', story)
      })
    })

    client.on('sendingLine', function(lineData) {
      console.log('lineData: ', lineData);
      stories.createNewLine(lineData).then(story => {
        //send the story, not the line
        io.emit('lineSaved', story);
      })
    })

  })
}
