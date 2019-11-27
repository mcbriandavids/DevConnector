const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const auth = require('../../middleware/Auth')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')


// @Route GET api/auth
//  @desc Test route
// @access Public
router.get( '/', auth, async(req, res)=>{
    try{
const user = await User.findById(req.user.id).select('-password')
res.json(user)    
}catch(err){
Console.log(err.message)
res.status(400).send('Server Error')
    }
})


// @Route Post api/auth
//  @descAuthenticate User & Get Token
// @access Public


router.post( '/',[
check('email', "Please enter a valid Email").isEmail(),
check('password', 'Password is required').exists()],
async (req, res)=>{
    console.log(req.body)
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })

    }
const { email, password} = req.body
try{
    // Check if user exist
    let user = await User.findOne({
        email
    })
    if(!user)
    return res.status(400).json({
        errors:[
            {
              msg:'Invalid Credentials'  
            }
        ]
    })
    const isMatch = await bcrypt.compare( password, user.password )
    if ( !isMatch ) {
        return res.status( 400 ).json( {
            msg: 'Invalid Credentials'
        })
    }
    // Return jsonwebtoken
    const payload ={
        user:{
            id:user.id
        }
    }
    jwt.sign(
        payload, config.get('jwtSecret'),
        {expiresIn:3600},(err, token)=>{
            if(err) throw err;
            res.json({
                token
            })
        }
    )
    // res.send('User Registered')
}catch(err){
    console.log(err.message)
    res.status(500).send('Server Error')
    
}
 
       
}
    
)

module.exports = router;