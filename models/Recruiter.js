const mongoose = require('mongoose');

const RecruiterSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    companyname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    aboutcompany:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('recruiter',RecruiterSchema);