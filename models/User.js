const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    bestFriend: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  });

  const User = mongoose.model('User', userSchema);

module.exports = User;