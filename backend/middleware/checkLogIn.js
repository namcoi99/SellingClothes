module.exports = function isLoggedIn(req, res, next) {
    if (!req.session.currentUser) {
        return res.status(401).json({
            success: false,
            message: "Please login before doing this action"
        });
    }
    return next();
}

