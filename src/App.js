import './App.css';
import {HashRouter, Route} from 'react-router-dom'
import Login from './auth/Login';
import Home from './components/Home';
import Register from './auth/Register';
import DashBoard from './components/DashBoard';
import UpdatePassword from './components/UpdatePassword';
import Leads from './components/Leads';
import Report from './components/Report';
import Settings from './components/Settings';
import LeadDetailsPage from './components/LeadDetailsPage';
// import UserLead from './components/userLead';
import LeadData from './components/LeadData';
import LeadDetailsUpdate from './components/leadUpdate';
import userProfile from './components/userProfile';
import profileUpdate from './components/profileUpdate';
import Notes from './components/Notes';
import Tasks from './components/Tasks';
import Activities from './components/Activities';
import Checklist from './components/Checklist';
import Emails from './components/Emails';



function App() {
  return (
    
    <div className="App">
    <HashRouter>
    <Route path="/" exact component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/dashboard" component={DashBoard} />
    <Route path="/updatePassword" component={UpdatePassword}/>
    <Route path="/leads" component={Leads} />
    <Route path="/report" component={Report} />
    <Route path="/settings" component={Settings} />
    <Route path="/leaddetailspage" component={LeadDetailsPage} />
    <Route path="/userleads" component={LeadData} />
    <Route path="/leaddetailsupdate" component={LeadDetailsUpdate} />
    <Route path="/userprofilepage" component={userProfile} />
    <Route path="/profileupdatepage" component={profileUpdate} />
    <Route path="/notes" component={Notes} />
    <Route path="/tasks" component={Tasks} />
    <Route path="/activities" component={Activities} />
    <Route path="/checklist" component={Checklist} />
    <Route path="/emails" component={Emails} />
    <Route path="/note" component={Notes} />
    </HashRouter>
    </div>

    
    
  );
}

export default App;
