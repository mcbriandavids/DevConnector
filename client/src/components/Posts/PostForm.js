import React, { Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect}  from 'react-redux'
import {addPost}  from '../../Actions/post'

const PostForm = ({addPost}) => {
    const [text, setText] = useState('')
    const onChange = e =>{ setText( e.target.value)}
    const onSubmit = e =>{
        e.preventDefault()
        addPost({text})
        setText('')
    }
    return (
        <Fragment>
            <div class="post-form">
        <div class="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form class="form my-1" onSubmit={onSubmit}>
          <textarea
          value={text}
          onChange ={onChange}
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a Post"
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
        </Fragment>
    )
}

PostForm.propTypes = {
addPost: PropTypes.func.isRequired,
}

export default connect(null, {addPost})(PostForm);
