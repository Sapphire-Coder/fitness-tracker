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
        <div className = 'container' id = 'register'>
            <nav className = 'navbar navbar-dark navbar-expand-lg bg-dark fixed-top'>
                <a className = 'navbar-brand' href = '/login'>JM Fitness</a>
            </nav>
            <h1>Create an Account</h1>
            <div id = 'createForm'>
                <form onSubmit={newAcc}>
                    <div className = 'form-group row'>
                        <label>Username: </label>
                        <input type = 'text' name = 'username' placeholder = 'username' required className = 'form-control'/>
                    </div>
                    <div className = 'form-group row'>
                        <label>Password: </label>
                        <input type = 'password' name = 'password' placeholder = 'password' required className = 'form-control'/>
                    </div>
                    <div className = 'form-group row'>
                        <label>Name: </label>
                        <input type = 'text' name = 'name' placeholder = 'name' required className = 'form-control'/>
                    </div>
                    <input type = 'submit' className = 'btn'/>
                </form>
            </div>
        </div>
    )
}