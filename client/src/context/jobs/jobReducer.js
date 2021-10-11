import {GET_JOBS,POST_JOB,JOBS_ERRORS, APPLY_JOB,SET_CURRENT_JOB_APPLICATION,FILTER_JOBS,APPLIED_JOBS,CLEAR_CURRENT,CLEAR_FILTER} from '../types'

export default (state, action) => {
    switch (action.type) {
      case GET_JOBS:
        return {
          ...state,
          jobs: [...action.payload],
          loading: false
        };
      case POST_JOB:
        return {
          ...state,
          jobs: [action.payload, ...state.jobs],
          loading: false
        };
        case APPLY_JOB:
        return {
          ...state,
          appliedjobs: [action.payload, ...state.appliedjobs],
          loading: false
        };
      case SET_CURRENT_JOB_APPLICATION:
        return {
          ...state,
          current: action.payload
        };
      case CLEAR_CURRENT:
        return {
          ...state,
          current: null
        };
      case FILTER_JOBS:
        return {
          ...state,
          filtered: state.jobs.filter(job => {
            const regex = new RegExp(`${action.payload}`, 'gi');
            return job.location.match(regex) || job.position.match(regex);
          })
        };
      case CLEAR_FILTER:
        return {
          ...state,
          filtered: null
        };
      case JOBS_ERRORS:
        return {
          ...state,
          error: action.payload
        };
        case APPLIED_JOBS:
          return{
            ...state,
            appliedjobs:action.payload
          };
      default:
        return state;
    }
  };