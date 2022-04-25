import { useNavigate } from 'react-router-dom'
import { createAccount } from '../services/users-api'

export default function Register() {
     
    const navigate = useNavigate()

    const newAcc = e => {
        e.preventDefault()
        const user = { username: e.target.username.value, password: e.target.password.value, name: e.target.name.value }
        createAccount(user)
        navigate('/login')
    }

    return (
        <div className = 'main'>
            <h1>Create an Account</h1>
            <div id = 'createForm'>
                <form onSubmit={newAcc}>
                    <label>Username: </label>
                    <input type = 'text' name = 'username' />
                    <label>Password: </label>
                    <input type = 'password' name = 'password' />
                    <label>Name: </label>
                    <input type = 'text' name = 'name' />
                    <input type = 'submit' />
                </form>
            </div>
        </div>
    )
}