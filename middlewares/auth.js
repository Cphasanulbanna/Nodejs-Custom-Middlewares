const isAuth = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(401)
            .json({ error: "Authentication failed", message: `username & password is required` });
    }

    next();
};

module.exports = { isAuth };
