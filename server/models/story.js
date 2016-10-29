const mongoose = require('mongoose')
const Schema = mongoose.Schema
//call on the line model for an attribute further

const storySchema = new Schema({
  //title of the story
  title       : { type: String, required: true, unique: true },
  //list of user ids involved in this story
  authors     : [{ type: Schema.ObjectId, ref: 'User' }],
  //the max length of the story
  length      : Number,

  numberOfAuthors: Number,

  linesPerAuthor: Number,
  //list of lines in the story in order
  lines: [ {type: Schema.Types.ObjectId, ref: 'Line'} ],

  finished: {type: Boolean, default: false},

  votes: Number,

  upvoters: [{ type: Schema.ObjectId, ref: 'User' }],

  downvoters: [{ type: Schema.ObjectId, ref: 'User' }]

})

const Story = mongoose.model('Story', storySchema)
module.exports = Story
