const mongoose = require('mongoose')
const Schema = mongoose.Schema
//call on the line model for an attribute further

const storySchema = new Schema({
  //title of the story
  title       : { type: String, required: true, unique: true },
  //list of user ids involved in this story
  authors     : [{ type: Schema.ObjectId, ref: 'User' }],
  //tells whether the story is complete or not
  complete    : { type: Boolean, default: false },
  //the max length of the story
  length      : Number,
  //max number of users in the story
  numberUsers : Number,
  //current line the story is on
  currentLine : { type: Number, default: 0 },
  //list of lines in the story in order
  lines: [ {type: Schema.Types.ObjectId, ref: 'Line'} ]

})

const Story = mongoose.model('Story', storySchema)
module.exports = Story
