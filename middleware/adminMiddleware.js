const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.userType === "admin") {
        next(); // ✅ Allow request to proceed
    } else {
        return res.status(403).json({ msg: "Access denied. Admins only!" });
    }
};

module.exports = adminMiddleware; // ✅ Ensure it's exported as a function
