const jwt =    require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next)=>{
// Get token from header
const token = req.header('x-auth-token');

// Check if no token
if(!token){
    return res.status(401).json({  //401 - Unauthorized
        msg: 'No token, authorization denied'
    })
}
// Verify token
try{
const decoded = jwt.verify(token, config.get('jwtSecret'))
req.user = decoded.user;  //user in the payload
next()
}catch(err){
res.status(401).json({
    msg:'Invalid Token'
})
}
}

module.exports = auth