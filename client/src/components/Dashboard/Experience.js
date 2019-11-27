import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Moment from 'react-moment'
import {deleteExperience} from '../../Actions/profile'

const Experience = ({experience, deleteExperience}) => {


const delExp = ()=>{deleteExperience()}




const experiences = experience.map(exp=>(
     <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>

     <td>
        <Moment  format="YYYY/MM/DD">
        {exp.from}</Moment> - {exp.to === null ? (' Now' ):(  <Moment  format="YYYY/MM/DD">
        {exp.to}</Moment>)}

         
         </td>
         <button className ='btn btn-danger' onClick={delExp}>Delete</button>
    
   </tr>
    
    ))
    return (
        <Fragment>
            <h2 className="my-2"> Experience Credentials</h2> 
            <table className="table">
            <thead>
                    <tr>
                         <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th/>
                    </tr>
            </thead>
           
 <tbody>{experiences}</tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
experience: PropTypes.array.isRequired,
deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, {deleteExperience})(Experience)