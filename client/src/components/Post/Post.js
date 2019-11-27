import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getPost} from '../../Actions/post'
import Spinner from '../Layout/Spinner'
import PostItem from '../Posts/PostItem'
import CommentForm from '../Post/CommentForm'
import CommentItem from '../Post/CommentItem'

const Post = ({getPost, post:{loading, post}, match}) => {
    useEffect(()=>{getPost(match.params.id)}, [getPost])
    return loading || post === null? <Spinner/> :<Fragment>
    <Link to='/posts' className='btn'>Back To Post</Link>
    <PostItem post={post} showActions={false}/>
<CommentForm postId={post._id}/>
<div className='comments'>
{post.comments.map(comment=>(
    <CommentItem key={comment._id} comment={comment} postId={post._id} />
))}

</div>
    
    </Fragment>
}
Post.propTypes = {
getPost: PropTypes.func.isRequired,
post: PropTypes.object.isRequired,
}
const mapStateToProps = state =>({
    post:state.post
})

export default connect(mapStateToProps,{getPost})(Post)
