import React,{useState,useEffect,useContext} from 'react'
import UserAuthContext from '../../context/userauth/authContext';
import RecruiterAuthContext from '../../context/recruiterauth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = (props) => {
    const [userregistration,setUserRegistration] = useState(true);
    const [recruiterregisteration,setRecruiterRegistration] = useState(false)

    const userauthContext = useContext(UserAuthContext);
    const recruiterauthContext = useContext(RecruiterAuthContext);
    const alertContext = useContext(AlertContext)


    const { setAlert } = alertContext;
    const { register:userRegister, error:userError, clearErrors:userclearError, isAuthenticated:isUserAuthenticated } = userauthContext;
    const { register:RecruiterRegister, error:recruiterError, clearErrors:recruiterclearError, isAuthenticated:isRecruiterAuthenticated } = recruiterauthContext;

    useEffect(() => {
        if (isUserAuthenticated) {
          props.history.push('/user/dashboard');
        }else if(isRecruiterAuthenticated){
            props.history.push('/recruiter/dashboard');
        }
    
        if (userError === 'User already exists') {
          setAlert(userError, 'danger');
          userclearError();
        }else if(recruiterError === 'User already exists'){
            setAlert(recruiterError, 'danger');
            recruiterclearError();
        }
        // eslint-disable-next-line
      }, [userError,recruiterError, isUserAuthenticated,isRecruiterAuthenticated, props.history]);
    
      const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword:''
      });

      const [recruiter,setRecruiter] = useState({
        recruitername:'',
        recruiteremail:'',
        recruiterpassword:'',
        recruiterconfirmpassword:'',
        companyname:'',
        aboutcompany:''
      })
     
      const { username, email, password,confirmPassword } = user;
      const {recruitername,recruiteremail,recruiterpassword,recruiterconfirmpassword,companyname,aboutcompany} = recruiter;
    
      const onuserChange = e => setUser({ ...user, [e.target.name]: e.target.value });
    
      const onRecruiterChange = e => setRecruiter({ ...recruiter, [e.target.name]: e.target.value });

      const onSubmit = e => {
        e.preventDefault();
        if(userregistration){
            if (username === '' || email === '' || password === '') {
                setAlert('Please enter all fields', 'danger');
              } else if (password !== confirmPassword) {
                setAlert('Passwords do not match', 'danger');
              } else {
                userRegister({
                  username,
                  email,
                  password
                });
              }
        }
        if(recruiterregisteration){
            if (recruitername === '' || recruiteremail === '' || recruiterpassword === '' || companyname === '' || aboutcompany=== '' ) {
                setAlert('Please enter all fields', 'danger');
              } else if (recruiterpassword !== recruiterconfirmpassword) {
                setAlert('Passwords do not match', 'danger');
              } else {
                RecruiterRegister({
                  username:recruitername,
                  email:recruiteremail,
                  password:recruiterpassword,
                  companyname:companyname,
                  aboutcompany:aboutcompany
                });
              }
        }
      };
 
    const setuserregistration = () => {
        setUserRegistration(true)
        setRecruiterRegistration(false)
    }

    const setrecruiterregistration = () => {
        setUserRegistration(false)
        setRecruiterRegistration(true)
      
    }

    return (
        <div className="signup-form">
            <div className="toggler">
                <h4 className="user" onClick={() => setuserregistration()}>User Registration</h4>
                <h4 className="recruiter" onClick={() => setrecruiterregistration()}>Recruiter Registration</h4>
            </div>
             { userregistration && <div className="user-register-form">
            <h1><span className="login-header">User Registeration</span></h1>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={username} onChange={onuserChange} placeholder="Username" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" placeholder="Email Address" value={email} onChange={onuserChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password" value={password} onChange={onuserChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={onuserChange} required/>
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>}
        {recruiterregisteration && <div className="recruiter-register-form">
            <h1><span className="login-header">Recruiter Registeration</span></h1>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="recruitername" placeholder="Username" value={recruitername} onChange={onRecruiterChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="recruiteremail" placeholder="Email Address" value={recruiteremail} onChange={onRecruiterChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="recruiterpassword" placeholder="Password" value={recruiterpassword} onChange={onRecruiterChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" name="recruiterconfirmpassword" placeholder="Confirm Password" value={recruiterconfirmpassword} onChange={onRecruiterChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="company-name">Company Name</label>
                    <input type="text" name="companyname" placeholder="Company Name" value={companyname} onChange={onRecruiterChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="about-company">About Company</label>
                    <input type="text" name="aboutcompany" placeholder="About Company" value={aboutcompany} onChange={onRecruiterChange} required/>
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>}
        </div>
    )
}

export default Register
