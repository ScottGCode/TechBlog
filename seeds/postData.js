const { Post } = require("../models");

const postData = [
{
    title: "First Tech Blog Post",
    content: "This is the first tech blog post.",
    user_id: 1,
},
{
    title: "Second Tech Blog Post",
    content: "This is the second tech blog post.",
    user_id: 2,
},
{
    title: "Third Tech Blog Post",
    content: "This is the third tech blog post.",
    user_id: 3,
},
{
    title: "Fourth Tech Blog Post",
    content: "This is the fourth tech blog post.",
    user_id: 4,
},
{
    title: "Fifth Tech Blog Post",
    content: "This is the fifth tech blog post.",
    user_id: 5,
},
{
    title: "Sixth Tech Blog Post",
    content: "This is the sixth tech blog post",
    user_id: 6,
},
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;