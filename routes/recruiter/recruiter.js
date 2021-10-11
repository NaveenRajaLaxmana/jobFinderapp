const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check,validationResult} = require('express-validator');

const Recruiter = require('../../models/Recruiter');
const Applicants = require('../../models/Jobs');


router.post('/',[
    check('username','Please add a username').not().isEmpty(),
    check('companyname','Please add a company name').not().isEmpty(),
    check('aboutcompany','Please add about company').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6}),
],
async (request,response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({errors:errors.array()});
    }
    const {username,email,password,companyname,aboutcompany} = request.body;
    try{
        let user = await Recruiter.findOne({email});
        if(user){
            return response.status(400).json({msg:'User already exists'});
        }

        user = new Recruiter({
            username,
            email,
            password,
            companyname,
            aboutcompany
        })

       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(password,salt);

       await user.save();

       const payload = {
           user:{
               id:user.id,
           },
       }

       jwt.sign(payload,config.get('jwtSecret'),{ expiresIn: 360000 },(err,token) => {
            if(err){
                throw err;
            }
            response.json({token});
       });
    }catch(err){
        console.error(err.message);
        response.status(500).send('Server Error');
    }
}
)



module.exports = router;