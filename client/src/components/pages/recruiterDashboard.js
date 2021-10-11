import React,{useState,useContext, useEffect} from 'react'
import axios from 'axios';
import RecruiterContext from '../../context/recruiterauth/authContext'


const RecruiterDashboard = (props) => {
    const host="http://localhost:5000";
    const [applications,setApplications] = useState([]);
    const recruiterContext = useContext(RecruiterContext)
    const {loaduser} = recruiterContext
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token':localStorage.getItem('token')
        }
      };
    async function getapplicants(){
        const result = await axios.get(`${host}/getapplicants/`,config);
        if(result.data){
            setApplications(result.data);
        }
    }
    useEffect(() => {
      
       
        loaduser()
        getapplicants();
    },[applications,loaduser,getapplicants]) 

    return (
        <div className="recruiterDashboard">
            <h3>Received Applications</h3>
            <button type="button" className="postjob-button" onClick={() => props.history.push('/recruiter/postJob')}>Post Job</button>
            <div className="applications">
                {applications.length>0 && applications.map(applicant => (
                    <div className="application">
                    <h5>{applicant.position}</h5>
                    <p>{applicant.username}</p>
                    <p>{applicant.email}</p>
                    <p>{applicant.qualification}</p>
                    <p>{applicant.phone}</p>
                </div>
                ))}
               
            </div>
        </div>
    )
}

export default RecruiterDashboard