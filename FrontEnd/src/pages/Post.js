import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {AuthContext} from '../helpers/AuthContext';

function Post() {
  let {id} = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);   //represents list of comments of posts
  const [newComment, setNewComment]= useState("");   //Holds input of comment
  const { authState } = useContext(AuthContext);

  useEffect(() => {   //Queries and finds data based on ID
    axios.get(`http://localhost:1111/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
    
    axios.get(`http://localhost:1111/comments/${id}`).then((response) => {   //Queries to find comments based on ID
      setComments(response.data);
    });
    
  }, []);

  const addComment = () => {
    axios.post("http://localhost:1111/comments", {
      commentBody: newComment,
      PostId: id
    },{
      headers: {
        accessToken: localStorage.getItem("accessToken"), //Passes accessToken value through headers
      }
    }
  )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const commentToAdd = {commentBody: newComment, username: response.data.username};
          setComments([...comments, commentToAdd]); //array destructuring || Makes it previous list of comments + 1 only comment body
          setNewComment("");
        };
    });
  };

  const deleteComment = (id) => {
    axios.delete(`http://localhost:1111/comments/${id}`, {
      headers: {accessToken: localStorage.getItem("accessToken")},
    }).then(() => {
      setComments(comments.filter((val) => {
        return val.id !== id;
      }));
    });
  };


  return (
    <div className='postPage'>
      <div className='leftSide'>
        <div className='post' id = 'individual'>
          <div className='title'> {postObject.title}</div>
          <div className='body'> {postObject.postText}</div>
          <div className='footer'> {postObject.username}</div>
        </div>
      </div>
      <div className='rightSide'>
        
        <div className = "addCommentContainer">  
          <input 
            type="text" 
            placeholder="Enter !"
            autocomplete = "off" 
            value={newComment}
            onChange = {(event) => {
              setNewComment(event.target.value)}}/> 
          <button onClick={addComment}>Add comment!</button>
        </div>
        <div className = "listOfComments">
          {comments.map((comment, key) => { //map through every element and finds comment + key as objects as an element
            return <div key = {key} className = "comment">
              {comment.commentBody} 
              <label> Username: {comment.username} </label>
              {authState.username === comment.username && 
                <button onClick = {() => {deleteComment(comment.id)}}> X </button>}
              </div>
          })};
        </div>
      </div>
    </div>
  )
}

export default Post;
