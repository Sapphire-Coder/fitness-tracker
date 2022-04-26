import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { findUser } from "../services/users-api"

export default function Home() {

    const navigate = useNavigate()

    const [user, setUser] = useState({})

    useEffect(() => {
        if(!localStorage.isAuth || JSON.parse(localStorage.isAuth) == false) {
            navigate('/login')
        }
        else{
            findUser().then(res => setUser(res.data))
        }
    }, [])


    return (
        <div className = 'main'>
            <h2>Welcome {user.name}!</h2>
            <h3>What would you like to do today?</h3>
            <h3><a href = '/new'>Input new workout</a></h3>
        </div>
    )
}