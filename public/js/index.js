// Import necessary modules and utilities
import { renderPosts, renderComment } from './utils/render';
import { fetchPosts, createComment } from './utils/api';

// Example: Fetch and render blog posts on the homepage
fetchPosts()
    .then(posts => renderPosts(posts))
    .catch(error => console.error('Error fetching posts:', error));

// Example: Handle form submission for adding a new comment
const commentForm = document.getElementById('comment-form');

commentForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const commentText = document.getElementById('comment-text').value;

    try {
    // Make a request to add a new comment
    const newComment = await createComment({ comment_text: commentText });

    // Update the UI with the new comment
    renderComment(newComment);
} catch (error) {
    console.error('Error adding comment:', error);
}
});