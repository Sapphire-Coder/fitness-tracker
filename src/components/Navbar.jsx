import { Link } from "react-router-dom"

const Navbar = props => {

    const logout = e => {
        e.preventDefault()
        localStorage.clear()
        window.location.reload()
    }
    
    return (
        <nav className='navbar navbar-dark navbar-expand-lg bg-dark'>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className='navbar-brand' href = '/'>JM Fitness</a>
            <div className = 'collapse navbar-collapse' id = 'navbarNavDropdown'>
                <div className = 'nav-item dropdown navbar-nav'>
                    <a className = 'nav-link dropdown-toggle' href = '#' id = 'navbarDropdownMenuLink' data-toggle = 'dropdown' aria-haspopup="true" aria-expanded="false">Menu</a>
                    <div className = 'dropdown-menu' aria-labelledby="navbarDropdownMenuLink">
                        <Link to = '/new' className = 'dropdown-item'>New Workout</Link>
                        <Link to = '/workouts' className = 'dropdown-item'>My Workouts</Link>
                        <Link to = '/board' className = 'dropdown-item'>Workout Board</Link>
                    </div>
                </div>
            </div>
            <button onClick={logout}>Logout</button>
        </nav>  
    )
}

export default Navbar