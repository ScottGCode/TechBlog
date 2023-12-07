const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all posts
router.get("/", async (req, res) => {
    try {
    const postData = await Post.findAll({
        include: [{ model: User, attributes: ["username"] }],
    });
    res.status(200).json(postData);
} catch (err) {
    res.status(500).json(err);
}
});

// Get one post by ID with associated username and comments
router.get("/:id", async (req, res) => {
    try {
        // Log the request parameters
        console.log("Request parameters:", req.params);

        // Attempt to find the post
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ["username"] },
                { model: Comment, as: "comments", include: [{ model: User, as: "user", attributes: ["username"] }] }, // Use the alias "comments"
            ],
            logging: console.log,
        });

        // Log the result
        console.log("Post data:", postData);

        if (!postData) {
            res.status(404).json({ message: "No post found with that id!" });
            return;
        }
        res.render("post", postData);
    } catch (err) {
        console.error("Error fetching a single post:", err);
        res.status(500).json(err);
    }
});

// Create a new post with authenticated user
router.post("/", withAuth, async (req, res) => {
    try {
    const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
    });

    res.status(201).json(newPost);
} catch (err) {
    res.status(400).json(err);
}
});

// Update an existing post with authenticated user
router.put("/:id", withAuth, async (req, res) => {
    try {
    const [updatedRows] = await Post.update(req.body, {
        where: { id: req.params.id },
    });

    if (updatedRows === 0) {
        res.status(404).json({ message: "No post found with that id!" });
        return;
    }

    const updatedPost = await Post.findByPk(req.params.id);
    res.status(200).json(updatedPost);
} catch (err) {
    console.error("Error rendering edit post page:", err);
    res.status(500).json(err);
}
});

// Delete a post with authenticated user
router.delete("/:id", withAuth, async (req, res) => {
    try {
    // Delete all comments related to the post
    await Comment.destroy({
        where: { post_id: req.params.id },
    });

    const deletedRows = await Post.destroy({
        where: { id: req.params.id },
    });

    if (deletedRows === 0) {
        res.status(404).json({ message: "No post found with that id!" });
        return;
    }

    res.status(204).end();
} catch (err) {
    console.error("Error deleting post:", err); // Add this line for debugging
    res.status(500).json(err);
}
});

module.exports = router;