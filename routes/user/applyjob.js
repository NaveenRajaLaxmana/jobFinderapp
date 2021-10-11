const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const authentication = require('../../middleware/authentication');


const Applyjob = require('../../models/Jobs');

router.post('/',authentication,[
    
        check('user','Please add a user').not().isEmpty(),
        check('job','Please add a job').not().isEmpty(),
        check('username','Please add username').not().isEmpty(),
        check('email','Please add a email').not().isEmpty(),
        check('qualification','Please add qualification').not().isEmpty(),
        check('qualification','Please add qualification').not().isEmpty(),
],
async (request,response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({errors:errors.array()});
    }
    const {user,job,username,email,phone,qualification,previousexperience,position,companyname} = request.body;
    try{

       const applyjob = new Applyjob({
        user,
        job,  
        username,
        email,
        phone,
        qualification,
        previousexperience,
        position,
        companyname
        })

       await applyjob.save();
        return response.status(201).json({msg:"success applied for a job"})
       
    }catch(err){
        console.error(err.message);
        response.status(500).send('Server Error');
    }
}
)

module.exports = router;