import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {addLike, removeLike, deletePost} from '../../Actions/post'
import {connect} from 'react-redux'

const PostItem = ({ addLike,
   removeLike,
    deletePost, 
    auth, 
    post:{ _id, name, text, avatar, user, comments, date, likes}, showActions}) =>{
const likeBtn = e => addLike(_id)
const unLikeBtn = e => removeLike(_id)
const deletePostBtn = e => deletePost(_id)
    return(
      <Fragment>
 <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
           {text}
            </p>
             <p className="post-date">
                Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>
            {showActions && <Fragment>
            <button onClick={likeBtn} type="button" className="btn btn-light">
            <i className="fas fa-thumbs-up"></i>{likes > 0 && (<span>{likes}</span>)}</button>

            <button onClick={unLikeBtn} type="button" className="btn btn-light">
            <i className="fas fa-thumbs-down"></i></button>

            <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion { ' '} { comments > 0 && (<span className='comment-count'>{comments}</span>)} 
            </Link>
            {!auth.loading && user ===auth.user._id &&(
              <button onClick={deletePostBtn} type="button"className="btn btn-danger">
              <i className="fas fa-times"></i>
            </button>
                     
            )}
             </Fragment>}      
          </div>
        </div>
        </Fragment>

    )
}
PostItem.defaultProps ={
  showActions: true
}
PostItem.propTypes = {
post: PropTypes.object.isRequired,
auth:PropTypes.object.isRequired,
addLike: PropTypes.func.isRequired,
removeLike: PropTypes.func.isRequired,
deletePost: PropTypes.func.isRequired,

}
const mapStateToProps = state=>({
    auth: state.auth
})
export default connect(mapStateToProps,{addLike, removeLike, deletePost})(PostItem)
