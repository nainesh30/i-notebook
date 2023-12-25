var jwt = require('jsonwebtoken');
const JWT_secret = "NaineshLovestoSolveCube"

const fetchuser = (req,res,next) =>{
//Get user from jwt token and user id to req object 
const token = req.header('auth-token');
if(!token){
    res.status (401).send({error : "Please use valid token "})
}

try {
    const data = jwt.verify(token,JWT_secret)
    req.user = data.user;
    next();
    
} catch (error) {
    res.status (401).send({error : "Please use valid token "})
}
}
module.exports = fetchuser;

//middle ware to get user id from jwt token