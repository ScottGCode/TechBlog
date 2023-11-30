const router = require("express").Router();
const { User } = require("../../models");

// Route to get all users
router.get("/", async (req, res) => {
    try {
    const dbUserData = await User.findAll({
        attributes: { exclude: ["password"] },
    });
    res.status(200).json(dbUserData);
} catch (err) {
    console.error(err);
    res.status(500).json(err);
}
});

// Route to sign up a new user
router.post("/signup", async (req, res) => {
    try {
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;

        res.status(201).json(newUser);
    });
} catch (err) {
    console.error(err);
    res.status(400).json(err);
}
});

// Route to log in a user
router.post("/login", async (req, res) => {
    try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData || !(await userData.checkPassword(req.body.password))) {
        res.status(400).json({ message: "Incorrect username or password, please try again" });
        return;
    }

    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.status(200).json({ user: userData, message: "You are now logged in!" });
    });
} catch (err) {
    console.error(err);
    res.status(400).json(err);
}
});

// Route to log out a user
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
    req.session.destroy(() => {
        res.status(204).end();
    });
} else {
    res.status(404).end();
}
});

// Export the router
module.exports = router;