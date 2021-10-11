const mongoose = require('mongoose');

const JobsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  job:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'postjob'
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  qualification: {
    type: String,
    required:true
  },
  previousexperience:{
    type:String,
  },
  companyname:{
    type:String,
    required:true
  },
  position:{
    type:String,
    required:true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('applyjobs', JobsSchema);