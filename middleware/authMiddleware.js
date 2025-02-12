const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        console.log("❌ No token found in request.");
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        console.log("✅ Raw Token Received:", token);

        const cleanToken = token.replace("Bearer ", "").trim();
        console.log("🔍 Cleaned Token:", cleanToken);

        const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
        console.log("🔑 Decoded User:", decoded);

        req.user = decoded;
        next();
    } catch (err) {
        console.error("❌ JWT Error:", err.message);
        res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = authMiddleware;
