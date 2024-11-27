const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {
    const token = req.headers["authorization"];
    if(!token || token === null){
        return res.status(401).json({
            auth:false,
            message: "No token provided"
        });
    }
    const bearer = token.split(" ");
    const tokenBearer = bearer[1];
    if(tokenBearer === 'undefined'){
        return res.status(401).json({
            auth:false,
            message: "No token provided"
        });
    }
    const decoded = jwt.verify(tokenBearer, process.env.KEY_SECRET);
        req.userId = decoded.id;
        next();
    }

module.exports = verifyToken;