const express = require('express');
const router = express.Router();

const Jobs = require('../../models/PostJobs');

router.get('/find',async(request,response) => {
    try{
        const {query,location} = request.body;
    const jobs = await Jobs.find({position:query,location});
    if(jobs){
        response.json(jobs);
    }else{
        return response.status(404).json({msg:"suggestion not found"})
    }
    
    }catch(err){
        console.error(err.message);
      response.status(500).send('Server Error');
    }
})

router.get('/',async(request,response) => {
    try{
    const jobs = await Jobs.find();
    if(jobs){
        response.json(jobs);
    }else{
        return response.status(404).json({msg:"no data"})
    }
    
    }catch(err){
        console.error(err.message);
      response.status(500).send('Server Error');
    }
})

module.exports = router;