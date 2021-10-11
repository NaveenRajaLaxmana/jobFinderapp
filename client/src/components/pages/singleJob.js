import axios from 'axios'
import React,{useEffect,useState,useContext} from 'react'
import JobContext from '../../context/jobs/jobContext'
import UserAuthContext from '../../context/userauth/authContext'

const SingleJob = (props) => {
    const jobcontext = useContext(JobContext)
    const userauthcontext=useContext(UserAuthContext)
    const {loaduser}=userauthcontext
    const {jobs} = jobcontext
    const [job,setJob] = useState({});
    // console.log(props.match.params.id)
    console.log(props.sampleData)
   useEffect(() => {
    async function getjob(){
       
       const filtered = jobs.filter(job => job._id === props.match.params.id)
       setJob(filtered[0])
    //    console.log(res.data.jobs)
      
       
    }
    getjob()
    loaduser()
    
   },[]);
    const {position,salary,location,requiredQualification,companyname} = job;
    return (
        <div className="single-job">
            <div className="box">
                <h5>{position}</h5>
                <h5>{companyname}</h5>
                <h6>{location}</h6>
                <h6>{salary}</h6>
                <p>{requiredQualification}</p>
                <button className="apply-button" type="button" onClick={() => props.history.push(`/user/applyjob/${props.match.params.id}`)}>Apply</button>
            </div>
        </div>
    )
}

export default SingleJob
