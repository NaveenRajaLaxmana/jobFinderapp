import React,{useState,useEffect,useContext} from 'react'
import Search from '../layout/Search'
import axios from 'axios'
import {Link} from 'react-router-dom'
import JobContext from '../../context/jobs/jobContext';
import Pagination from '../layout/Pagination';

const Landingpage = (props) => {
    const jobContext = useContext(JobContext)
    const {getJobs,jobs} = jobContext;
    const [samplejobs,setSamplejobs] = useState([]);
    const [currentPage,setCurrentpage] = useState(1);
    const [postPerpage] = useState(5);

    useEffect(() => {
        getJobs();
       
        if(jobs != null){

            setSamplejobs(jobs)
        }
    },[jobs])

    const paginate = (number) => setCurrentpage(number);
  
    const indexofLastPost = currentPage * postPerpage;
    const indexofFirstPost = indexofLastPost - postPerpage;
    const currentpost = samplejobs.slice(indexofFirstPost,indexofLastPost);
    
    return (
        <div className="landing-page">
            <Search samplejobs={samplejobs} setSamplejobs={setSamplejobs}/>
            {(samplejobs.length<1 || samplejobs == null) && <div className="banner">
                <Link to="/recruiter/dashboard">Post a Job</Link>
               
            </div>}
            {samplejobs.length>0 && samplejobs != null && (<div className="jobs">
            <div className="applications">
                {currentpost.map(job => (
                    <div className="application" key={job._id} onClick={() => props.history.push(`/jobs/${job._id}`)}>
                    <h5>{job.position}</h5>
                    <p>{job.companyname}</p>
                    <p>{job.location}</p>
                    <p>{job.salary}</p>
                </div>
                ))}
            
            </div>
            </div>)}
            <Pagination postsperPage={postPerpage} totalPosts={samplejobs.length} paginate={paginate} />
        </div>
    )
}

export default Landingpage
