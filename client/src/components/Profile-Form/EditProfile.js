import React, {useEffect} from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {useState, Fragment} from 'react'
import {createProfile, getCurrentProfile} from '../../Actions/profile'

const EditProfile = ({profile:{profile, loading}, createProfile, history, getCurrentProfile}) => {

    const [formData, setFormData] = useState({
    company:'',
    website:'',
    location:'',
    bio:'',
    status:'',
    gitHubUserName:'',
    skills:'',
    youTube:'',
    facebook:'',
    twitter:'',
    instagram:'',
    linkedIn:''
    })
    
        useEffect(()=>{
            getCurrentProfile()
        setFormData({
            company: loading || !profile.company? '' : profile.company,
            website: loading || !profile.website? '' : profile.website,
            location: loading || !profile.location? '' : profile.location,
            status: loading || !profile.status? '' : profile.status,
            skills: loading || !profile.skills? '' : profile.skills.join(','),
            gitHubUserName: loading || !profile.gitHubUserName? '' : profile.gitHubUserName,
            bio: loading || !profile.bio? '' : profile.bio,
            twitter: loading || !profile.twitter? '' : profile.twitter,
            facebook: loading || !profile.facebook? '' : profile.facebook,
            linkedIn: loading || !profile.linkedIn? '' : profile.linkedIn,
            youTube: loading || !profile.youTube? '' : profile.youTube,
            instagram: loading || !instagram.company? '' : profile.instagram,
        })
    },[loading])
const [ displaySocialInputs, toggleSocialInputs] = useState(false)
    const {company,
    website,
    location,
    bio,
    status,
    gitHubUserName,
    skills,
    youTube,
    facebook,
    twitter,
    instagram,
    linkedIn} = formData
    const onChange = e=>
        setFormData({...formData,[e.target.name]:e.target.value})
        const onSubmit = e=>{
            e.preventDefault()
            createProfile(formData, history, true)
        }

    return (
        <Fragment>
             <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={onChange} />
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website"  value={website} name="website"onChange={onChange} />
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" value={location} name="location" onChange={onChange} />
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" value={skills} name="skills" onChange={onChange} />
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            type="text" 
            placeholder="Github Username"
            name="gitHubUsername" onChange={onChange} value={gitHubUserName}
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" value={bio} name="bio" onChange={onChange}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button onClick={()=>toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
            {displaySocialInputs && <Fragment><div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" value={twitter} name="twitter" onChange={onChange} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" value={facebook} name="facebook" onChange={onChange}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="YouTube URL" value={youTube} name="youTube" onChange={onChange}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="LinkedIn URL" value={linkedIn} name="linkedIn" onChange={onChange} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" value={instagram} name="instagram" onChange={onChange} />
        </div></Fragment>}
        
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>
      </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
createProfile: PropTypes.func.isRequired,
profile: PropTypes.object.isRequired,
getCurrentProfile: PropTypes.func.isRequired,
}
const mapStateToProps = state =>({
    profile: state.profile
})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile))
