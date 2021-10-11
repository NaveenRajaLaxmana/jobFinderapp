import React,{useState,useEffect,useContext} from 'react'
import JobContext from '../../context/jobs/jobContext';
import RecruiterContext from '../../context/recruiterauth/authContext';

const PostJob = (props) => {
    const recruiterContext = useContext(RecruiterContext);
    const jobContext = useContext(JobContext)
    const {postJob} = jobContext
    const {user:poster,loaduser} = recruiterContext

    const [postjobform,setPostjobform] = useState({
        recruiter:'',
        position:'',
        salary:'',
        location:'',
        requiredQualification:'',
        companyname:''
    })

    const {recruiter,position,salary,location,requiredQualification,companyname} = postjobform

    useEffect(() => {
        loaduser()
        
        setPostjobform({...postjobform,recruiter:poster._id,companyname:poster.companyname})
    },[poster])

    const onChange = e => {
        setPostjobform({...postjobform,[e.target.name]:e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        const value = postJob(postjobform)
        if(value){
            props.history.push('/recruiter/dashboard')
        }
    }

    return (
        <div className="post-job">
            <h4>Post a Job</h4>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="recruiter">Recruiter*</label>
                    <input type="text" placeholder="Recruiter id" name="recruiter" value={recruiter} disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="position">Position*</label>
                    <input type="text" placeholder="Position" name="position" value={position} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="salary">Salary*</label>
                    <input type="text" placeholder="Salary" name="salary" value={salary} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location*</label>
                    <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="requiredQualification">Required Qualification*</label>
                    <input type="text" placeholder="Required Qualification" value={requiredQualification} name="requiredQualification" onChange={onChange} required/>
                </div>
                
                <button type="submit" className="post-button">Post</button>
            </form>
        </div>
    )
}

export default PostJob
