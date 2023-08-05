/**
 * authController.js
 * @description :: exports authentication methods
 */
const {
  validationResult
} = require("express-validator");
const User = require('../../model/user');
const {JWT}  = require("../../constant/authConstant")
const jwt = require("jsonwebtoken")

/**
 * @description : user registration 
 * @param {Object} req : request for register
 * @param {Object} res : response for register
 * @return {Object} : response for register {status, message, data}
 */
const register = async (req, res) => {
  let success = false;
  // if there are errors , return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.badRequest({
          message:"Validation error"
      });
  }
  //    check whether the user with this email exists already
  try {
      let user = await User.findOne({
          email: req.body.email
      });
      if (user) {
          return res.validationError({
              message: "sorry a manager with this email already exists"
          });
      }
      // const salt = await bcrypt.genSalt(10);
      // const secPass = await bcrypt.hash(req.body.password, salt);
      //  create a new user
      result = await User.create({
        ...req.body
      })
      res.success({data:result})
     
  } catch (error) {
      console.error(error.message);
      res.internalServerError({data:error.message});
  }
};

/**
 * @description : login with username and password
 * @param {Object} req : request for login 
 * @param {Object} res : response for login
 * @return {Object} : response for login {status, message, data}
 */

  const login = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.username
        });
        // console.log(user)
        !user && res.badRequest({message: "user not found"});
        // compare the password using the bcryptjs 
        const isPasswordMatched = await user.isPasswordMatch(req.body.password)
        // console.log(isPasswordMatched)
        if(!isPasswordMatched){
          res.badRequest({message:"Wrong Credentials"})
        }
        // const validPassword = await bcrypt.compare(req.body.password, .password)
        // create the data object and send them in a jsonwebtoken package
        const data = {
            user: {
                id: user.id
            }
        }
        // console.log(JWT)
        // console.log(data)
        const authtoken = jwt.sign(data, JWT.JWT_SECRET);
        // console.log(authtoken)
        const result = {...user._doc, authtoken}
        // console.log(result)
        res.success({
          data: result,
          message: 'Login Successful',
          
        });
    } catch (err) {
        res.internalServerError({data:err.message})
    }
}


const get = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.success({data:user})
  } catch (error) {
    console.error(error.message);
    res.internalServerError({data:error});
  }
}

module.exports = {
  register,
  login,
  get
};