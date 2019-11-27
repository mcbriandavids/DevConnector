import React,{Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addComment} from '../../Actions/post'


const CommentForm = ({addComment, postId}) => {
    const [text, setText] = useState(' ')
    const onChange = e =>(setText( e.target.value))
    
    const onSubmit =e =>{
        e.preventDefault()
        addComment(postId, {text}),
        setText(' ')
    }

    return (
    
    <Fragment>
            <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form class="form my-1" onSubmit={onSubmit}>
        
          <textarea
          value={text}
          onChange ={onChange}
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on a Post"
            required
          >
          </textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
        </Fragment>
    
    )
}

CommentForm.propTypes = {
addComment: PropTypes.func.isRequired,
}

export default connect(null, {addComment})(CommentForm)
