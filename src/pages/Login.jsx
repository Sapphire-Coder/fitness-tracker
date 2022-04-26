import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/users-api'

export default function Login() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        if(localStorage.isAuth) {
            if(JSON.parse(localStorage.isAuth) && !loading) {
                navigate('/')
            }
            else{
                if(JSON.parse(localStorage.isAuth)) navigate('/')
            }
        }
    }, [loading])

    const login = e => {
        e.preventDefault()
        const user = { username: e.target.username.value, password: e.target.password.value }
        loginUser(user).then(() => setLoading(false))
    }

    return (
        <div className = 'main'>
            <h1>Login</h1>
            <div id = 'loginForm'>
                <h2><a href = '/register'>Create an Account</a></h2>
                <form onSubmit={login}>
                    <label>Username: </label>
                    <input type = 'text' name = 'username' />
                    <label>Password: </label>
                    <input type = 'password' name = 'password' />
                    <input type = 'submit' />
                </form>
            </div>
        </div>
    )
}