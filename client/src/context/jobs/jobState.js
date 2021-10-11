import React,{useReducer} from 'react'
import axios from 'axios'
import JobContext from './jobContext'
import jobReducer from './jobReducer'
import {GET_JOBS,POST_JOB,JOBS_ERRORS, APPLY_JOB,SET_CURRENT_JOB_APPLICATION,FILTER_JOBS,CLEAR_FILTER,APPLIED_JOBS} from '../types'

const JobState = (props) => {
  const host = 'http://localhost:5000'
    const initialState = {
        jobs:null,
        current:null,
        filtered:null,
        error:null,
        appliedjobs:null
    }
    const [state, dispatch] = useReducer(jobReducer, initialState);

    const getJobs = async () => {
        try{
            const res = await axios.get(`${host}/getjobs`)
          
            dispatch({
                type:GET_JOBS,
                payload:res.data
            })
        }catch(err){
            dispatch({
                type: JOBS_ERRORS,
                payload: err.response.data
              });
        }
    }
    const userapplications = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token':localStorage.getItem('token')
        }
      };
      try{
        const res = await axios.get(`${host}/getuserapplications`,config)
        
        dispatch({
            type:APPLIED_JOBS,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type: JOBS_ERRORS,
            payload: err.response.data
          });
    }
    }
    const postJob = async formData => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token':localStorage.getItem('token')
            }
          };
          try{
              const res = await axios.post(`${host}/api/recruiter/postjob`,formData,config)
                dispatch({
                    type:POST_JOB,
                    payload:res.data
                })
                return true;

          }catch(err){
            // console.log(err)
            //   dispatch({
            //       type:JOBS_ERRORS,
            //       payload:err.response.data.errors[0].msg
            //   })
          }
    }

    const applyJob = async formData => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token':localStorage.getItem('token')
            }
          };
          try{
              const res = await axios.post(`${host}/api/user/applyjob`,formData,config)
                dispatch({
                    type:APPLY_JOB,
                    payload:res.data
                })

          }catch(err){
              dispatch({
                  type:JOBS_ERRORS,
                  payload:err.response.dta.errors[0].msg
              })
          }
    }

    const setCurrent = job => {
        dispatch({ type: SET_CURRENT_JOB_APPLICATION, payload: job });
      };

      const filterJobs = text => {
        dispatch({ type: FILTER_JOBS, payload: text });
      };
    
      // Clear Filter
      const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
      };

      return (
        <JobContext.Provider
          value={{
            jobs: state.jobs,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            appliedjobs:state.appliedjobs,
            getJobs,
            postJob,
            applyJob,
            setCurrent,
            filterJobs,
            userapplications,
            clearFilter
          }}
        >
          {props.children}
        </JobContext.Provider>
      );
}

export default JobState
