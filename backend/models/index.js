const User = require('./User');
// Add other models here as needed, e.g.:
// const Post = require('./Post');
// const Like = require('./Like');
// const OTP = require('./OTP');

function initializeModels() {
  // If you have associations, set them up here
  // e.g., User.hasMany(Post), etc.
  // Optionally: require('./associations')();
}

module.exports = {
  User,
  // Post,
  // Like,
  // OTP,
  initializeModels,
}; 