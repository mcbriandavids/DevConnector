import React, {Fragment, useEffect} from 'react'
import {getCurrentProfile, deleteAccount} from '../../Actions/profile'
import Spinner from '../Layout/Spinner'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import {Link} from 'react-router-dom'

const Dashboard = ( { getCurrentProfile, deleteAccount, auth:{user}, profile:{profile, loading } }) =>{
    useEffect(()=>
        getCurrentProfile)

const delAccount = ()=>{ deleteAccount()}
  return loading && profile ===null? <Spinner/> :
  <Fragment>
  <div className="my-3">
  <h1 className='large text-primary'>Dashboard</h1>
  </div>
  <p className="lead">
  <i className='fas fa-user'></i> Welcome {user && user.name}
  </p>
  {profile !==null ? (<Fragment>
    <DashboardActions/>
     <Experience experience={profile.experience}/>
     <Education education={profile.education}/>
     <div className='my-2'>
     <button className ='btn btn-danger' onClick={delAccount}>
      <i className='fas-fa-user-minus'></i>
     Delete my Account
     </button >
    
     </div>
    </Fragment>) : (<Fragment>
    <p>You have not yet setup a profile, please add some info</p>
   <Link to="/create-profile" className="btn btn-primary my-1"> Create Profile</Link>
    </Fragment>)}
  </Fragment>

 
}
Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}
const mapStateToProps =  state  =>({
    auth: state.auth,
    profile: state.profile,
}) 
   

export default connect(mapStateToProps,{getCurrentProfile, deleteAccount})(Dashboard)

