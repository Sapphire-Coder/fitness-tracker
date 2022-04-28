import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getComments, createComment, deleteComment } from '../../services/comments-api'
import { deletePost, getPost } from '../../services/posts-api'
import { findUser } from '../../services/users-api'

export default function BoardShow() {

    const navigate = useNavigate()
    const { id } = useParams()
    const [data, setData] = useState({})
    const [comments, setComments] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        if(!localStorage.isAuth || JSON.parse(localStorage.isAuth) == false) navigate('/login')
        getPost(id).then(res => setData(res.data))
        getComments(id).then(res => setComments(res.data))
        findUser().then(res => setUser(res.data._id))
    }, [])

    const addComment = e => {
        e.preventDefault()
        const comment = { post: id, comment: e.target.comment.value }
        createComment(comment)
        e.target.comment.value = null
    }

    const delPost = e => {
        e.preventDefault()
        deletePost(data._id)
        navigate('/board')
    }

    return (
        <div className='main'>
            <div id = 'post'>
                <h1>{data.title}</h1>
                <div id = 'context'>
                    <h3>{data.content}</h3>
                </div>
                {
                    user == data.user && (
                        <div id = 'editBtn'>
                            <button onClick = {() => navigate(`/board/${id}/edit`)}>Edit Post</button>
                            <button onClick = {delPost}>Delete Post</button>
                        </div>
                    )
                }
            </div>
            <div id = 'commentSection'>
                {
                    comments.map((comment, i) => {
                        return (
                            <div key = {i} className = 'comment'>
                                <h3 style={{textDecorationLine: 'underline'}}>Username:</h3>
                                <h3>{comment.username}</h3>
                                <p style={{textDecorationLine: 'underline'}}>Comment:</p>
                                <p>{comment.comment}</p>
                                {
                                    user == comment.user && <button onClick = {() => deleteComment(comment._id)}>Delete Comment</button> 
                                }
                            </div>
                        )
                    })
                }
                <div id = 'commentBox'>
                    <form onSubmit={addComment}>
                        <label>Add Comment: </label>
                        <textarea name = 'comment' cols = '40' rows = '10'></textarea>
                        <input type = 'submit'/>
                    </form>
                </div>
            </div>
        </div>
    )
}