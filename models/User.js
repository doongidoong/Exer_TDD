const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type : String },
    email: {type: String},
    admin : {type:String},
    role : {type:String}
  });

  const User = mongoose.model('User', userSchema);


  // generate(User, 10);

// const user = User.fake();
// console.log(user);

// const users = User.fake(50);
// console.log(users);

module.exports = User;