const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');

    // Check if the Authorization header exists
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decoded.userId }; // Use _id to match the addcategory function
        next();
    } catch (err) {
        console.error('JWT Error:', err);
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = { authMiddleware };