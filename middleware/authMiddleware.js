const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Handle Bearer token format
    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1]; // Extract the actual token
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = authMiddleware;
