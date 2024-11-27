const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken (req, res, next) {
    const token = req.headers["authorization"];
    if(!token || token === null){
        return res.status(401).json({
            auth:false,
            message: "No token provided"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.KEY_SECRET);
        req.userId = decoded.id;
        return res.status(200).json({
            auth: true,
            message: "Token is valid",
            user: decoded.id,
            token: token
        });

    } catch (error) {
        return res.status(401).json({
            auth: false,
            message: "Failed to authenticate token"
        });
    }
}

module.exports = verifyToken;