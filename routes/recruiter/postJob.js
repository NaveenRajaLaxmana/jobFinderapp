const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const authentication = require('../../middleware/authentication')

const PostJobs = require('../../models/PostJobs');

router.post('/',authentication,[
    
        check('recruiter','Please add a recruiter').not().isEmpty(),
        check('position','Please add a position').not().isEmpty(),
        check('salary','Please add salary').not().isEmpty(),
        check('location','Please add a location').not().isEmpty(),
        check('requiredQualification','Please add requiredQualification').not().isEmpty(),
],
async (request,response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({errors:errors.array()});
    }
    const {recruiter,position,salary,requiredQualification,location,companyname} = request.body;
    try{

       const postjob = new PostJobs({
        recruiter,
        position,  
        salary,
        requiredQualification,
        location,
        companyname
        })

       await postjob.save();
        return response.status(201).json({msg:'Success posted a Job'})
       
    }catch(err){
        console.error(err.message);
        response.status(500).send('Server Error');
    }
}
)



module.exports = router;