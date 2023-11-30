const { Comment } = require("../models");

const commentData = [
    {
    comment_text: "Good point!",
    user_id: 1,
    post_id: 1,
},
{
    comment_text: "I disagree with you!",
    user_id: 2,
    post_id: 1,
},
{
    comment_text: "I can help with that",
    user_id: 3,
    post_id: 1,
},
{
    comment_text: "I agree with you!",
    user_id: 4,
    post_id: 1,
},
{
    comment_text: "Thumbs up!",
    user_id: 5,
    post_id: 1,
},
{
    comment_text: "Great tech blog post!",
    user_id: 1,
    post_id: 2,
},
{
    comment_text: "Incredible work!",
    user_id: 2,
    post_id: 2,
},
{
    comment_text: "This is the truth!",
    user_id: 3,
    post_id: 3,
}
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;