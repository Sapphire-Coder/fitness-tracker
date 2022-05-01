import { Link, useLocation } from 'react-router-dom'

const Navbar = props => {

    const loc = useLocation()
    const logout = e => {
        e.preventDefault()
        localStorage.clear()
        window.location.reload()
    }

    return (
        <nav className='navbar navbar-dark navbar-expand-lg bg-dark fixed-top'>
            <a className='navbar-brand' href = '/'>JM Fitness</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className = 'collapse navbar-collapse' id = 'navbarNavDropdown'>
                <div className = 'nav-item dropdown navbar-nav'>
                    <a className = 'nav-link dropdown-toggle' href = '#' id = 'navbarDropdownMenuLink' data-toggle = 'dropdown' aria-haspopup="true" aria-expanded="false">Menu</a>
                    <div className = 'dropdown-menu' aria-labelledby="navbarDropdownMenuLink">
                        <Link to = '/new' className = 'dropdown-item'>New Workout</Link>
                        <Link to = '/workouts' className = 'dropdown-item'>My Workouts</Link>
                        <Link to = '/board' className = 'dropdown-item'>Workout Board</Link>
                    </div>
                </div>
                        {
                            loc.pathname.split('/')[1] == 'board' && (
                                <div className = 'nav-item navbar-nav'>
                                    <Link to = '/board/new' className = 'nav-link'>Create Post</Link>
                                </div>
                            )
                        }
            </div>
            <button onClick={logout} className = 'btn btn-outline-light'>Logout</button>
        </nav>  
    )
}

export default Navbar