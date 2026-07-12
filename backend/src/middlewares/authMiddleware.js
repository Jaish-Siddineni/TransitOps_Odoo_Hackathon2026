const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const authHeader = req.header("Authorization");

    console.log("Authorization Header:", authHeader);

    const token = authHeader?.split(" ")[1];

    console.log("Extracted Token:", token);

    if (!token) {
        return res.status(401).json({
            error: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded JWT:", decoded);

        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT Error:", err);

        return res.status(400).json({
            error: err.message
        });
    }
};

module.exports = authenticate;