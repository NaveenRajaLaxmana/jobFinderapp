import {useState} from 'react'
import './App.css';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Landingpage from './components/pages/Landingpage';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from './components/auth/Login'
import Register from './components/auth/Register';
import userDashboard from './components/pages/userDashboard';
import recruiterDashboard from './components/pages/recruiterDashboard';
import postJob from './components/pages/postJob';
import ApplyJob from './components/pages/ApplyJob';
import SingleJob from './components/pages/singleJob';
import UserAuthState from './context/userauth/authState';
import RecruiterAuthState from './context/recruiterauth/authState';
import AlertState from './context/alert/alertState'
import JobState from './context/jobs/jobState';
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  const [sampleData,setSampleData] = useState([]);

  return (
    <div className="App">
     <RecruiterAuthState>
      <UserAuthState>
        <AlertState>
          <JobState>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={Landingpage} setSampleData={setSampleData}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <PrivateRoute exact path="/user/dashboard" component={userDashboard}/>
          <PrivateRoute exact path="/recruiter/dashboard" component={recruiterDashboard}/>
          <PrivateRoute exact path="/recruiter/postJob" component={postJob}/>
          <Route exact path="/user/applyjob/:id" component={ApplyJob}/> 
          <Route exact path="/jobs/:id" component={SingleJob}/>
        </Switch>
      </Router>
      
         <Footer />
         </JobState>
         </AlertState>
        </UserAuthState>
        </RecruiterAuthState>
    </div>
  );
}

export default App;
