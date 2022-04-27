import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPosts } from '../../services/posts-api'

export default function BoardHome() {

    const navigate = useNavigate()

    const [data, setData] = useState([])

    useEffect(() => {
        if(!localStorage.isAuth || JSON.parse(localStorage.isAuth) == false) navigate('/login')
        getPosts().then(res => setData(res.data))
    }, [])

    return (
        <div className = 'main'>
            <h1>Workout Board</h1>
            <h3><a href = '/board/new'>Create Post</a></h3>
            <div id = 'boardContainer'>
                {
                    data.map((post, i) => {
                        return(
                            <div key = {i}>
                                <h2><a href = {`/board/${post._id}`}>{post.title}</a></h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}