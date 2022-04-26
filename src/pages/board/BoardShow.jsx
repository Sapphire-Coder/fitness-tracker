import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getComments, createComment } from '../../services/comments-api'
import { getPost } from '../../services/posts-api'

export default function BoardShow() {

    const navigate = useNavigate()
    const { id } = useParams()
    const [data, setData] = useState({})
    const [comments, setComments] = useState([])

    useEffect(() => {
        if(!localStorage.isAuth || JSON.parse(localStorage.isAuth) == false) navigate('/login')
        getPost(id).then(res => setData(res.data))
        getComments(id).then(res => setComments(res.data))
    }, [])

    const addComment = e => {
        e.preventDefault()
        const comment = { post: id, comment: e.target.comment.value }
        createComment(comment)
        e.target.comment.value = null
    }

    return (
        <div className='main'>
            <div id = 'post'>
                <h1>{data.title}</h1>
                <div id = 'context'>
                    <h3>{data.content}</h3>
                </div>
                <div id = 'editBtn'>
                   <button onClick = {() => navigate(`/board/${id}/edit`)}>Edit Post</button>
                </div>
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