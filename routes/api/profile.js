const express = require('express')
const router = express.Router()
const Profile = require('../../models/Profile')
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Post = require('../../models/Post')
const request = require('request')
const config =require('config')
const {check, validationResult} = require('express-validator')


// @Route GET api/Profile/me 
//  @desc Get current user's profile
// @access Public
router.get('/me',auth, async(req, res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id}).populate('user', ['name', 'avatar'])
        if(!profile){
            return res.status(400).json({
                msg:'There is no profile for this user'
            })
            
        }
        res.json(profile)
        
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
        
    }
    
})
// @Route POST api/Profile/
//  @desc Create or Update User Profile
// @access Private

router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], 
async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()});
       
};
const {
    company,
    website,
    location,
    bio,
    status,
    gitHubUserName,
    skills,
    youTube,
    facebook,
    twitter,
    instagram,
    linkedIn
} =req.body
// Build profile object
const profileFields = {}


profileFields.user = req.user.id;
if(company) profileFields.company = company
if(website) profileFields.website = website
if(location) profileFields.location = location
if(bio) profileFields.bio = bio
if(status) profileFields.status = status
if(gitHubUserName) profileFields.gitHubUserName = gitHubUserName

if(skills){
    profileFields.skills = skills.split(',').map(skill=> skill.trim())
console.log(profileFields.skills)
}
// Build social object
 profileFields.social = {}
 if(youTube) profileFields.social.youTube = youTube
 if(twitter) profileFields.social.twitter = twitter
 if(facebook) profileFields.social.facebook = facebook
 if(linkedIn) profileFields.social.linkedIn = linkedIn
 if(instagram) profileFields.social.instagram = instagram
try {
    let profile = await Profile.findOne({
        user: req.user.id
    })
    if(profile){
        // Update
        profile = await Profile.findOneAndUpdate(
            { user: req.user.id},
            {$set:profileFields},
            {new:true},
        
        );
        return res.json(profile)
    }
    // create
    profile = new Profile(profileFields)
    await profile.save();
    res.json(profile)
} catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error')
    
}
}
)

// @Route GET api/Profile/
//  @desc GET all profiles
// @access Public


router.get('/', async(req, res)=>{
try {
    const profiles = await Profile.find().populate('user',['name', 'avatar'])
    res.json(profiles)
} catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error')
    
}
})

// @Route GET api/Profile/user/:user_id
//  @desc GET profile by user Id
// @access Public

router.get('/user/:user_id', async(req, res)=>{
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name', 'avatar'])
        if(!profile)
            return res.status(400).json({
                msg:'Profile not found'
            })
        res.json(profile)
    } catch (err) {
        console.log(err.message)
       
        if(err.kind =='ObjectId')
        return res.status(400).send({
            msg:"Profile not found"
        })
        res.status(500).send('Server Error')
        
    }
    })
    
    // @Route DELETE api/Profile/user/:user_id
//  @desc DELETE profile, user & post
// @access private
router.delete('/', auth, async(req, res)=>{
    try {
        //Remove User Post
        await Post.deleteMany({user: req.user.id})

        //Remove Profile
         await Profile.findOneAndRemove({user:req.user.id})
//Remove User
         await User.findOneAndRemove({_id:req.user.id})
      res.json({
          msg:'User deleted'
      })
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
        
    }
    })

    // @Route PUT/UPDATE api/Profile/experience
//  @desc Add Profile experience
// @access Private
router.put('/experience', [auth,[
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async(req,res)=>{
const errors = validationResult(req)
if(!errors.isEmpty()){
    return res.status(400).json({
        errors: errors.array()
    })
   
}
const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
} = req.body
const  newExp ={
    title,
    company,
    location,
    from,
    to,
    current,
    description

}
try {
    const profile = await Profile.findOne({user:req.user.id})
    profile.experience.unshift(newExp)
    await profile.save()
    res.json(profile)
} catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
    
}
})

    // @Route DELETE api/Profile/user/:exp_id
//  @desc DELETE experience from Profile
// @access private


router.delete('/experience/:exp_id', auth, async(req, res)=>{
try {
    const profile = await Profile.findOne({user:req.user.id})
    //Get Remove index
    const removeIndex = profile.experience.map(item=>item.id).indexOf(req.params.exp_id)
profile.experience.splice(removeIndex, 1)
await profile.save()
res.json(profile)
} catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
}
})

   // @Route PUT/UPDATE api/Profile/experience
//  @desc Add Profile experience
// @access Private



router.put('/education', [auth,[
    check('school', 'School is required').not().isEmpty(),
    check('fieldOfStudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
    check('to', 'To date is required').not().isEmpty(),
    check('degree', 'Degree date is required').not().isEmpty(),
    check('current', 'Current  is required').not().isEmpty()
]], async(req,res)=>{
const errors = validationResult(req)
if(!errors.isEmpty()){
    return res.status(400).json({
        errors: errors.array()
    })
   
}
const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
} = req.body
const  newEdu ={
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description

}
try {
    const profile = await Profile.findOne({user:req.user.id})
    profile.education.unshift(newEdu)
    await profile.save()
    res.json(profile)
} catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
    
}
})
//     // @Route DELETE api/Profile/user/:edu_id
// //  @desc DELETE education from Profile
// // @access private
 router.delete('/education/:edu_id', auth, async(req, res)=>{
     try {
         const profile = await Profile.findOne({user:req.user.id})
         //Get Remove index
         const removeIndex = profile.education.map(item=>item.id).indexOf(req.params.edu_id)
     profile.education.splice(removeIndex, 1)
    await profile.save()
     res.json(profile)
     } catch (err) {
         console.error(err.message)
         res.status(500).send('Server Error')
     }
    })
        // @Route GET api/profile/github/:username
//  @desc GET User repositories from github
// @access Public
router.get('/github/:username', (req, res)=>{
try {
    const options ={
    uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client=$
    {config.get('githubClientId')}
    &client_secret=${config.get('gitHubSecret')}`,
    method:'GET',
    headers:{  'user-agent':'node.js' }

    };

    request(options, (error, response, body)=>{
      if(error) console.error(error)
        if(response.statusCode !==200){
            return res.status(404).json({
                msg:'No GitHub Profile found'
            })
          
        }
        res.json(JSON.parse(body))
    })
} catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
    
}
})

module.exports = router



