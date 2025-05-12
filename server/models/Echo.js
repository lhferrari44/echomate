
const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Please provide content for your reply'],
    maxlength: [150, 'Reply cannot be more than 150 characters']
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const EchoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Please provide content for your echo'],
    maxlength: [280, 'Echo cannot be more than 280 characters']
  },
  attachment: {
    type: String
  },
  background: {
    type: String
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  reactions: {
    love: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }],
    wow: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }],
    laugh: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }]
  },
  reEchoes: {
    type: Number,
    default: 0
  },
  replies: [ReplySchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Populate creator info when querying
EchoSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'creator',
    select: 'username avatar'
  });
  next();
});

module.exports = mongoose.model('Echo', EchoSchema);
