import React,{useState,useContext, useEffect} from 'react'
import JobContext from '../../context/jobs/jobContext'

const UserDashboard = () => {
    const jobcontext = useContext(JobContext)
    const {appliedjobs,userapplications} = jobcontext
    const [applications,setApplications] = useState([]);
    async function getapplicants(){
        if(appliedjobs){
            setApplications(appliedjobs);
        }
    }
    useEffect(() => {
        userapplications()
     
        getapplicants();
    },[])
    useEffect(() => {
        userapplications()
     
        getapplicants();
    },[appliedjobs,getapplicants])

    return (
        <div className="userDashboard">
            <h3>Your Applications</h3>
            <div className="applications">
            {applications.length>0 && applications.map(applicant => (
                    <div className="application">
                    <h5>{applicant.position}</h5>
                    <p><b>{applicant.companyname}</b></p>
                    <p>{applicant.username}</p>
                    <p>{applicant.email}</p>
                    <p>{applicant.qualification}</p>
                    <p>{applicant.phone}</p>
                    <p>{applicant.companyname}</p>
                </div>
                ))}
            </div>
        </div>
    )
}

export default UserDashboard
