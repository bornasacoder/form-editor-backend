var jwt = require('jsonwebtoken');
const {JWT} = require("../constant/authConstant")

const fetchuser = (req,res,next)=>{
    // get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.unAuthorized({message: "please authenticate using a valid token"})
    }
    try{
    const data = jwt.verify(token,JWT.JWT_SECRET);
    req.user = data.user;
    next();
    }catch(error){
        res.unAuthorized({message : "please authenticate using a valid token"})
    }
}
module.exports = fetchuser;