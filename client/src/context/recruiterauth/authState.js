import React,{useReducer} from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import authReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken'
import {REGISTER_SUCCESS,REGISTER_FAIL,RECRUITER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,CLEAR_ERRORS} from '../types'

const AuthState = props => {
  const host = 'http://localhost:5000'

  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading:true,
    user:null,
    error:null
}


const [state,dispatch] = useReducer(authReducer,initialState);

const loaduser = async() => {
setAuthToken(localStorage.token)


try{
const res = await axios.get(`${host}/api/recruiter/auth`);

dispatch({
    type:RECRUITER_LOADED,
    payload:res.data
});

}catch(err){
dispatch({ type: AUTH_ERROR})
}

};

const register = async formData => {
const config = {
    headers:{
        'Content-Type':'application/json'
    }
};

try{
    const res = await axios.post(`${host}/api/recruiter/new`,formData,config);
    
    dispatch({
        type:REGISTER_SUCCESS,
        payload: res.data
    })
    loaduser()
    props.history.push('/recruiter/dashboard')
}catch(err){
  
    dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.errors[0].msg
      });
}

}
const login = async formData => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      try {
        const res = await axios.post(`${host}/api/recruiter/auth`, formData, config);
  
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
  
        loaduser();
        props.history.push('/recruiter/dashboard')
      } catch (err) {
        
        dispatch({
          type: LOGIN_FAIL,
          payload: err.response.data.errors[0].msg
        });
      }
}

const logout = () => dispatch({ type: LOGOUT });

// Clear Errors
const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

return (
<AuthContext.Provider
  value={{
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    user: state.user,
    error: state.error,
    register,
    loaduser,
    login,
    logout,
    clearErrors
  }}
>
  {props.children}
</AuthContext.Provider>
);

}


export default AuthState;
