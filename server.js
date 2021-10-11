const express = require('express');
const app = express();
const connectDatabase = require('./config/database');
const cors = require('cors');
const path = require('path')


connectDatabase();

app.use(cors())
app.use(express.json({extended:false }));

app.use('/getjobs',require('./routes/user/alljobs'));

app.use('/api/user/new', require('./routes/user/user'));
app.use('/api/user/auth', require('./routes/user/auth'));
app.use('/api/user/applyjob', require('./routes/user/applyjob'));
app.use('/getuserapplications',require('./routes/user/getapplications'))

app.use('/api/recruiter/new', require('./routes/recruiter/recruiter'));
app.use('/api/recruiter/auth', require('./routes/recruiter/auth'));

app.use('/api/recruiter/postjob', require('./routes/recruiter/postJob'));

app.use('/getapplicants/',require('./routes/recruiter/getapplications'));

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));

     app.get('*', (req, res) => {
         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

  }


const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`server started on port ${PORT}`));