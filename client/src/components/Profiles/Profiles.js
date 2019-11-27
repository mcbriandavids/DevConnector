import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../Layout/Spinner'
import ProfileItem from './ProfileItem'
import {getProfiles} from '../../Actions/profile'
const Profiles = ({getProfiles, profile:{profiles, loading}}) => {
    useEffect(()=>{
getProfiles()
    }, [getProfiles])
    return (
        <Fragment>
            {loading? <Spinner/> : <Fragment>
              <h2 className='large text-primary'>Developers
              <p className='lead'>
              <i className="fab fa-connectdelop"></i> Browse and connect with Developers
              </p>
              </h2> 
              <div className='profiles'>
              {profiles.length > 0 ? (
                  profiles.map(profile=>(
                     <ProfileItem key={profile._id} profile={profile}/>   
                  ))
              ):<h4>No profiles found...</h4>}
              </div> 
                </Fragment>}
        </Fragment>
    )
}

Profiles.propTypes ={
    getProfiles: PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
}
const mapStateToProps = state =>({
    profile: state.profile
})
export default connect(mapStateToProps, {getProfiles})(Profiles);
