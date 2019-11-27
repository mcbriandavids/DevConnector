import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import React from 'react'
import {Fragment, useEffect } from 'react'
import Navbar from './components/Layout/Navbar'
import Landing from './components/Layout/Landing'
import Login from './components/Login'
import Register from './components/Auth/Register'
import Developers from './components/Developers'
import CreateProfile from './components/Profile-Form/Create-Profile'
import Alert from './components/Auth/Alert'
import {loadUser} from './Actions/auth'
import setAuthToken from './Utils/setAuthToken'
import Dashboard from './components/Dashboard/Dashboard'
import EditProfile from './components/Profile-Form/EditProfile'
import AddExperience from './components/Profile-Form/AddExperience'
import AddEducation from './components/Profile-Form/AddEducation'
import PrivateRoute from './components/Routing/PrivateRoute'
import Profiles from './components/Profiles/Profiles'
import Profile from './components/Profile/profile'
import Posts from './components/Posts/Posts'
import Post from './components/Post/Post'




// Redux
import { Provider } from 'react-redux'
import store from './store';


if ( localStorage.token ) {
    setAuthToken(localStorage.token)
}
const App = () =>{
    useEffect(()=>{
        store.dispatch( loadUser() )
    },[])
return(
    <Provider store={store}>
        <Router>
            <Fragment>
                <Navbar />
                <Route exact path='/' component={Landing} />
       
                  
                <section>
                    <Alert />
                    <Switch>
               
                        <Route exact  path='/register' component={Register} />
                        <Route exact  path='/login' component={Login} />
                        <Route exact path='/developers' component={Developers} />
                        <Route exact path='/profiles' component={Profiles} />
                        <Route exact path='/profile/:id' component={Profile} />
                        <PrivateRoute exact path='/dashboard' component={Dashboard} />
                        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
                        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
                        <PrivateRoute exact path='/add-education' component={AddEducation} />
                        <PrivateRoute exact path='/add-experience' component={AddExperience} />
                        <PrivateRoute exact path='/posts' component={Posts} />
                        <PrivateRoute exact path='/posts/:id' component={Post} />
        
                        
                        
                        
                    </Switch>
                
                </section>
               
                
            
           
                
            </Fragment>
    
        </Router>
    </Provider>
)      
}


export default App
