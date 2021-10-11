const mongoose = require('mongoose');

const PostJobSchema = mongoose.Schema({
    recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'recruiter'
  },
  position:{
      type:String,
      required:true
  },
  salary:{
      type:String,
      required:true
  },
  location:{
      type:String,
      required:true
  },
  requiredQualification:{
      type:mongoose.Schema.Types.Array,
      required:true
  },
  companyname:{
    type:String,
    required:true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('postjob', PostJobSchema);