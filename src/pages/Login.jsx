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
            .catch(error => {
                alert(error.response.data)
                e.target.username.value = null
                e.target.password.value = null
            })
    }

    return (
        <div className = 'container' id = 'login'>
            <nav className = 'navbar navbar-dark navbar-expand-lg bg-dark fixed-top'>
                <a className = 'navbar-brand' href = '/login'>JM Fitness</a>
                <div className = 'nav-item navbar-nav'>
                    <a className = 'nav-link' href = '/register'>Register</a>
                </div>
            </nav>
            <h1>Login</h1>
            <div id = 'loginForm'>
                <form onSubmit={login}>
                    <div className = 'form-group row'>
                        <label>Username: </label>
                        <input type = 'text' name = 'username' placeholder = 'username' required className = 'form-control'/>
                    </div>
                    <div className = 'form-group row'>
                        <label>Password: </label>
                        <input type = 'password' name = 'password' placeholder = 'password' required className = 'form-control'/>
                    </div>
                    <input type = 'submit' className = 'btn'/>
                </form>
            </div>
        </div>
    )
}