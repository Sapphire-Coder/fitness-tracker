import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../services/posts-api'

export default function BoardNew() {

    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.isAuth || JSON.parse(localStorage.isAuth) == false) navigate('/login')
    }, [])

    const newPost = e => {
        e.preventDefault()
        const post = {
            title: e.target.title.value,
            content: e.target.content.value,
            comments: []
        }
        createPost(post)
        navigate('/board')
    }

    return (
        <div className = 'main'>
            <h1>Create a new post</h1>
            <div id = 'newPostForm'>
                <form onSubmit = {newPost}>
                    <label>Title: </label>
                    <input type = 'text' name = 'title' />
                    <label>Post: </label>
                    <textarea name = 'content' cols = '80' rows = '20'></textarea>
                    <input type = 'submit'/>
                </form>
            </div>
        </div>
    )
}