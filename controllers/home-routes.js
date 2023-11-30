const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Helper function to check if the user is already logged in
const redirectToDashboardIfLoggedIn = (req, res, next) => {
    if (req.session.logged_in) {
    res.redirect("/dashboard");
} else {
    next();
}
};

// Homepage Route
router.get("/", async (req, res) => {
    try {
    const postData = await Post.findAll({
        include: [{ model: User, attributes: ["username"] }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
        posts,
        logged_in: req.session.logged_in,
    });
} catch (err) {
    res.status(500).json(err);
}
});

// Individual Post Route
router.get("/post/:id", withAuth, async (req, res) => {
    try {
    const postData = await Post.findByPk(req.params.id, {
        include: [
        { model: User, attributes: ["username"] },
        { model: Comment, include: [{ model: User, attributes: ["username"] }] },
    ],
    });
    const post = postData.get({ plain: true });
    res.render("post", {
        ...post,
        logged_in: req.session.logged_in,
    });
} catch (err) {
    res.status(500).json(err);
}
});

// Dashboard Route
router.get("/dashboard", withAuth, async (req, res) => {
    try {
    const postData = await Post.findAll({
        where: { user_id: req.session.user_id },
        include: [{ model: User, attributes: ["username"] }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", {
        posts,
        logged_in: req.session.logged_in,
    });
} catch (err) {
    res.status(500).json(err);
}
});

// Login Route
router.get("/login", redirectToDashboardIfLoggedIn, (req, res) => {
    res.render("login");
});

// Signup Route
router.get("/signup", redirectToDashboardIfLoggedIn, (req, res) => {
    res.render("signup");
});

// New Post Route
router.get("/newpost", (req, res) => {
    if (req.session.logged_in) {
    res.render("newpost");
} else {
    res.redirect("/login");
}
});

// Edit Post Route
router.get("/editpost/:id", async (req, res) => {
    try {
    const postData = await Post.findByPk(req.params.id, {
        include: [
        { model: User, attributes: ["username"] },
        { model: Comment, include: [{ model: User, attributes: ["username"] }] },
    ],
    });
    const post = postData.get({ plain: true });
    res.render("editpost", {
        ...post,
        logged_in: req.session.logged_in,
    });
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;