const User = require('./User');
const Post = require('./Post');
const OTP = require('./OTP');
const Like = require('./Like');

// Define associations
const defineAssociations = () => {
  // User - Post relationship (One-to-Many)
  User.hasMany(Post, {
    foreignKey: 'user_id',
    as: 'posts',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Post.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  // User - Like relationship (One-to-Many)
  User.hasMany(Like, {
    foreignKey: 'user_id',
    as: 'likes',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Like.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  // Post - Like relationship (One-to-Many)
  Post.hasMany(Like, {
    foreignKey: 'post_id',
    as: 'likes',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Like.belongsTo(Post, {
    foreignKey: 'post_id',
    as: 'post',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  console.log('✅ Model associations defined successfully');
};

module.exports = {
  defineAssociations
}; 