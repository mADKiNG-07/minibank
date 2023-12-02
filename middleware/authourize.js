const authorize = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (roles.includes(userRole)) {
            next();
        } else {
            res.sendStatus(403);
        }
    };
};

module.exports = authorize;