import React,{useState,useEffect,useContext} from 'react'
import UserAuthContext from '../../context/userauth/authContext';
import RecruiterAuthContext from '../../context/recruiterauth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {
    const userauthContext = useContext(UserAuthContext);
    const recruiterauthContext = useContext(RecruiterAuthContext);
    const alertContext = useContext(AlertContext)

    const { setAlert } = alertContext;
    const { login:userlogin, error:usererror, clearErrors:userclearError, isAuthenticated:isUSERAuthenticated } = userauthContext;
    const { login:recruiterlogin, error:recruiterrerror, clearErrors:recruiterclearError, isAuthenticated:isRecruiterAuthenticated } = recruiterauthContext;

    const [user, setUser] = useState({
        email: '',
        password: '',
        type: ''
      });
    
      const { email, password,type } = user;

    useEffect(() => {

            
      
    
        if (usererror === 'Invalid Credentials' && type=='Job-seeker') {
          setAlert(usererror, 'danger');
          userclearError();
        }
        if (recruiterrerror === 'Invalid Credentials' && type=='Recruiter') {
            setAlert(recruiterrerror, 'danger');
            recruiterclearError();
          }
        
        if (isUSERAuthenticated) {
            props.history.push('/user/dashboard');
          }else if(isRecruiterAuthenticated){
            props.history.push('/recruiter/dashboard');
          }
        // eslint-disable-next-line
      }, [usererror, isUSERAuthenticated,recruiterrerror,isRecruiterAuthenticated, type,props.history]);

      
     
       
    
      const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
    
      const onSubmit = e => {
        e.preventDefault();
       
       if(type=='Job-seeker'){
        
        if (email === '' || password === '') {
          setAlert('Please fill in all fields', 'danger');
        } else {
          userlogin({
            email,
            password
          });
         
          // recruiterlogin({
          //   email,
          //   password
          // });
        }
       }else{
        if (email === '' || password === '') {
            setAlert('Please fill in all fields', 'danger');
          } else {
            recruiterlogin({
              email,
              password
            });
           
            // userlogin({
            //   email,
            //   password
            // });
          }
       }
      };

      const changeradio = () => {
          if(type=='Job-seeker'){
            setUser({...user,type:'Recruiter'})
          }else{
            setUser({...user,type:'Job-seeker'})
          }
      }
    

    return (
        <div className="login-form">
            <h1><span className="login-header">Login</span></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="login-email" name="email" value={email} onChange={onChange} placeholder="Email Address" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="login-password" name="password" value={password} onChange={onChange} placeholder="Password" required/>
                </div>
                <div className="form-group radio">
                    <label htmlFor="typeof">Recruiter/Job seeker</label>
                    <div className="radios">
                    <input type="radio" id="login-type" name="login-type" onClick={changeradio} value="Recruiter" required/><span className="recruiter-radio">Recruiter</span> 
                    </div>
                    <div className="radios">
                    <input type="radio" id="login-type" name="login-type" onClick={changeradio} value="Job-seeker" required/><span className="jobseeker-radio">JobSeeker</span> 
                    </div>
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    )
}

export default Login
