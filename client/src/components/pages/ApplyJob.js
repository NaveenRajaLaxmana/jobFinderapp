import React,{useState,useEffect,useContext} from 'react'
import JobContext from '../../context/jobs/jobContext';
import UserAuthContext from '../../context/userauth/authContext';


const ApplyJob = (props) => {
    const jobContext = useContext(JobContext);
    const userauthcontext = useContext(UserAuthContext)
    const {user:currentuser,loaduser} = userauthcontext;
    const {applyJob,jobs} = jobContext
    
    const [jobform,setJobform] = useState({
        user:'',
        job:'',
        username:'',
        email:'',
        phone:'',
        qualification:'',
        previousexperience:'',
        position:'',
        companyname:''
    })

    const {user,job,username,email,phone,qualification,previousexperience,position,companyname} = jobform;

    const onChange = e => {
        setJobform({...jobform,[e.target.name]:e.target.value});
    }

    useEffect(() => {
        loaduser()
        const currentapplyingjob=jobs.filter(job => job._id==props.match.params.id)
       
        if(currentuser==null || currentuser._id ==undefined || currentuser._id==null){
           return props.history.push('/login');
        }
        setJobform({...jobform,user:currentuser._id,job:props.match.params.id,email:currentuser.email,position:currentapplyingjob[0].position,companyname:currentapplyingjob[0].companyname})
    },[currentuser])

    const onSubmit = e => {
        e.preventDefault();
      
        if(currentuser==null){
            props.history.push('/login');
        }
        if(user == ''|| job== ''|| username == '' || email == '' || qualification == ''){
            return;
        }
        applyJob(jobform);
        props.history.push('/user/dashboard')
    }

    return (
        <div className="apply-job">
            <h4>Apply a Job</h4>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="user">User id*</label>
                    <input type="text" placeholder="User id" name="user" value={user} disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="jobid">Job Id*</label>
                    <input type="text" placeholder="Job Id" name="job" value={job} disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username*</label>
                    <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email*</label>
                    <input type="email" placeholder="Email" name="email" value={email} disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone-number">Phone</label>
                    <input type="number" placeholder="Phone number" name="phone" onChange={onChange} value={phone}/>
                </div>
                <div className="form-group">
                    <label htmlFor="qualification">Educational Qualification*</label>
                    <input type="text" placeholder="Educational Qualification" name="qualification" onChange={onChange} value={qualification}/>
                </div>
                <div className="form-group">
                    <label htmlFor="previous-experience">Previous Experience</label>
                    <input type="text" placeholder="Previous Experience" name="previousexperience" onChange={onChange} value={previousexperience} />
                </div>
                <button type="submit" className="apply-button">Apply</button>
            </form>
        </div>
    )
}

export default ApplyJob
