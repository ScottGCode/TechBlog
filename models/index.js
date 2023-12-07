// Import the necessary models
const { User, Post, Comment } = require("./index");

// Define the relationships between the models
User.hasMany(Post, {
  foreignKey: "user_id",
  as: "posts",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  as: "post",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  as: "comments",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  as: "comments",
});

// Export the models
module.exports = { User, Post, Comment };