import React,{useState,useContext,useEffect} from 'react'
import authContext from '../../context/userauth/authContext';
import RecruiterAuthContext from '../../context/recruiterauth/authContext'

const Navbar = () => {
    const [userlogged,setuserlogged] = useState(false);
    const AuthContext = useContext(authContext)
    const recruiterauthcontext = useContext(RecruiterAuthContext)
    const {logout,loaduser} = AuthContext
    const {user:recruiter,loaduser:loadrecruiter}=recruiterauthcontext
    useEffect(() => {
        loadrecruiter()
        const token = localStorage.getItem('token');
        if(token){
            setuserlogged(true)
        }else{
            setuserlogged(false)
        }
    },[userlogged,loaduser,recruiter])
    return (
        <div className="navbar">
            <div className="heading-banner">
                <h2><a href="/">Job Finder</a></h2>
            </div>
            <ul className="navbar-links">
                <li className="link">
                    {!userlogged && <a href="/login">Login</a>}
                   
                    
                </li>
                <li className="link">
                {userlogged && <a href="/" onClick={() => logout()}>Logout</a>}
                </li>
                <li className="link">
                {userlogged && !recruiter && <a href="/user/dashboard">Dashboard</a>}
                </li>
                <li className="link">
                {recruiter && <a href="/recruiter/dashboard">Dashboard</a>}
                </li>
                <li className="link">
                    {!userlogged && !recruiter && <a href="/register">Register</a>}
                </li>
            </ul>
        </div>
    )
}

export default Navbar
