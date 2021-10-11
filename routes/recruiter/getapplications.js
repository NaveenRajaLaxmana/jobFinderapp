const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const authentication = require('../../middleware/authentication')
const Applicants = require('../../models/Jobs')

const Recruiter = require('../../models/Recruiter');

router.get('/',authentication,async(request,response) => {
    try {
        const recruiter = await Recruiter.findOne({_id:request.user.id})
        // console.log(recruiter)
        const applicants = await Applicants.find({companyname:recruiter.companyname});
        if(applicants){
            response.json(applicants);
        }else{
            return response.status(404).json({msg:"suggestion not found"})
        }
        
        }catch(err){
            console.error(err.message);
          response.status(500).send('Server Error');
        }
})

module.exports = router;