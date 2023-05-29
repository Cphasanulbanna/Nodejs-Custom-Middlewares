const isAuth = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(401)
            .json({ error: "Authentication failed", message: `username & password is required` });
    }
    res.status(200).json({ message: "authentication success" });
    next();
};

module.exports = { isAuth };
