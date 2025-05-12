
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['like', 'follow', 'reply', 'mention'],
    required: true
  },
  echo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Echo'
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Populate sender info when querying
NotificationSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'sender',
    select: 'username avatar'
  });

  if (this._conditions.type && (this._conditions.type === 'like' || this._conditions.type === 'reply' || this._conditions.type === 'mention')) {
    this.populate({
      path: 'echo',
      select: 'content'
    });
  }

  next();
});

module.exports = mongoose.model('Notification', NotificationSchema);
