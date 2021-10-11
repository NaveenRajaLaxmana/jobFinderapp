const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/authentication');
const Jobs = require('../../models/Jobs');



router.get('/',authentication,async(request,response) => {
    try{
     const jobs = await Jobs.find({user:request.user.id});
     
     if(jobs){
         return response.status(200).json(jobs);
     }else{
         return response.status(404).json({msg:'no records found'});
     }
    }catch(err){
        return response.status(500).send('server error')
    }
 })
 
 module.exports=router;