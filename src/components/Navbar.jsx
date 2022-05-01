import { Link } from "react-router-dom"

const Navbar = props => {

    const logout = e => {
        e.preventDefault()
        localStorage.clear()
        window.location.reload()
    }
    
    return (
        <nav>
            <Link to = '/'>Home </Link>
            <Link to = '/workouts'>Workouts </Link>
            <Link to = '/board'>Workout Board </Link>
            <button onClick={logout}>Logout</button>
        </nav>  
    )
}

export default Navbar