// Import the necessary models
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Define the relationships between the models
User.hasMany(Post, {
  foreignKey: "user_id", // Set up the foreign key relationship
  as: "posts", // Alias for the association
});

Post.belongsTo(User, {
  foreignKey: "user_id", // Set up the foreign key relationship
});

Comment.belongsTo(User, {
  foreignKey: "user_id", // Set up the foreign key relationship
  as: "user", // Alias for the association
});

Comment.belongsTo(Post, {
  foreignKey: "post_id", // Set up the foreign key relationship
  as: "post", // Alias for the association
});

Post.hasMany(Comment, {
  foreignKey: "post_id", // Set up the foreign key relationship
  as: "comments", // Alias for the association
});

User.hasMany(Comment, {
  foreignKey: "user_id", // Set up the foreign key relationship
  as: "comments", // Alias for the association
});

// Export the models
module.exports = { User, Post, Comment };