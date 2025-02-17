const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Access Denied: No token provided" });
        }

        const token = authHeader.split(" ")[1]; // Extract token after "Bearer "
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        
        next();
    } catch (err) {
        console.error("❌ Auth Error:", err.message);
        res.status(401).json({ msg: "Invalid token" });
    }
};
