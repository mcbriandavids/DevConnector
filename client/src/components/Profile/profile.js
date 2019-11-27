import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Spinner from '../Layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'
import {getProfileById} from '../../Actions/profile'

const profile = ({ match, profile:{profile, loading}, getProfileById, auth}) => {
    useEffect(()=>{ getProfileById(match.params.id)},[getProfileById, match.params.id])
    return (
        <Fragment>
          {profile ===null  || loading? (<Spinner/>): (<Fragment>
            <Link to='/profiles' className="btn btn-light">Back to Profiles</Link>
           {auth.isAuthenticated && auth.loading ===false && auth.user._id === profile.user._id &&
             <Link to ='/edit-profile' className='/btn btn-dark'>Edit Profile</Link>}
            </Fragment>)}
             <div class="profile-grid my-1">
             <ProfileTop profile={profile}/>
             <ProfileAbout profile={profile}/>
             <div className= "profile-exp bg-white p-2">
             <h2 className="text-primary">
             Experience
             </h2>
            {profile.experience  >  0 ? (<Fragment>
                {profile.experience.map(experience=>(<ProfileExperience key={experience._id} experience={experience} />))}
                </Fragment>):(<h4>No Experience Credentials</h4>)}
             </div>

             <div className= "profile-edu bg-white p-2">
             <h2 className="text-primary">
             Education
             </h2>
            {profile.education > 0 ? (<Fragment>
                {profile.education.map(education=>(<ProfileEducation key={education._id} education={education} />))}
                </Fragment>):(<h4>No Education Credentials</h4>)}
             </div>

                { profile.gitHubUserName && (
                    <ProfileGithub userName={profile.gitHubUserName}/>
                )}
         
             </div>
        </Fragment>
    )
}

profile.propTypes = {
    profile:PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,

}
const mapStateToProps = state=>({
    profile:state.profile,
    auth: state.auth
})
export default connect(mapStateToProps,{getProfileById})(profile)
