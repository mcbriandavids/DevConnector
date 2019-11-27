const express = require( 'express' )
const router = express.Router()
const {
    check,
    validationResult
} = require( 'express-validator' )
const User = require( '../../models/User' ) //Schemas
const gravtar = require( 'gravatar' )
const bcrypt = require( 'bcryptjs' )
const jwt = require( 'jsonwebtoken' )
const config = require( 'config' )


// @Route Post api/users
//  @desc Register User
// @access Public
// Register a User in the DB
router.post( '/', [ check( 'name', 'Name is required' ).not().isEmpty(),
        check( 'email', "Please enter a valid Email" ).isEmail(),
        check( 'password', 'Enter a password with min of 6 characters or more' ).isLength( {
            min: 6
        } )
    ],
    async ( req, res ) => {
        console.log( req.body )
        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {
            return res.status( 400 ).json( {
                errors: errors.array()
            } )

        }
        const {
            name,
            email,
            password
        } = req.body
        try {
            // Check if user exist
            let user = await User.findOne( {
                email
            } )
            if ( user )
                return res.status( 400 ).json( {
                    errors: [ {
                        msg: 'User Already exist'
                    } ]
                } )
            // Get Gravatar
            const avatar = gravtar.url( email, {
                s: '200', //size,
                r: 'pg', //Rating
                d: 'mm' //default

            } )
            user = new User( {
                name,
                email,
                password,
                avatar
            } )
            // Encrypt password
            const salt = await bcrypt.genSalt( 10 )
            user.password = await bcrypt.hash(
                password, salt
            )
            await user.save()
            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload, config.get( 'jwtSecret' ), {
                    expiresIn: 3600
                }, ( err, token ) => {
                    if ( err ) throw err;
                    res.json( {
                        token
                    } )
                }
            )
            // res.send('User Registered')
        } catch ( err ) {
            console.log( err.message )
            res.status( 500 ).send( 'Server Error' )

        }


    }

)

module.exports = router;