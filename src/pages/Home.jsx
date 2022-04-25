import { useEffect, useState } from "react"
import { findUser } from "../services/users-api"

export default function Home() {

    const [user, setUser] = useState({})

    useEffect(() => {
        findUser().then(res => setUser(res.data))
    }, [])


    return (
        <div className = 'main'>
            <h2>Welcome {user.name}!</h2>
        </div>
    )
}