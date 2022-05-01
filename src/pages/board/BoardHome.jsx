import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { getPosts } from '../../services/posts-api'

export default function BoardHome() {

    const navigate = useNavigate()

    const [data, setData] = useState([])

    useEffect(() => {
        if(!localStorage.isAuth || JSON.parse(localStorage.isAuth) == false) navigate('/login')
        getPosts().then(res => setData(res.data))
    }, [])

    return (
        <div id = 'boardHome' className = 'container-fluid'>
            <Navbar />
            <h1>Workout Board</h1>
            <div id = 'boardContainer' className = 'row justify-content-around'>
                {
                    data.map((post, i) => {
                        return(
                            <div key = {i} className = 'boardPosts col-4 rounded'>
                                <h2><a href = {`/board/${post._id}`}>{post.title}</a></h2>
                                <h3>{post.content}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}