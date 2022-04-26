import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import New from './pages/New'
import UserWorkouts from './pages/UserWorkouts'
import BoardHome from './pages/board/BoardHome'
import BoardNew from './pages/board/BoardNew'
import BoardShow from './pages/board/BoardShow'

const App = () => {
    
    const logout = e => {
        e.preventDefault()
        localStorage.clear()
        window.location.reload()
    }

    return (
        <Router>
            {localStorage.isAuth && JSON.parse(localStorage.isAuth) === true ? (
                <nav>
                    <Link to = '/'>Home </Link>
                    <Link to = '/workouts'>Workouts </Link>
                    <Link to = '/board'>Workout Board </Link>
                    <button onClick={logout}>Logout</button>
                </nav>   
            ) : null }
            <Routes>
                <Route path = '/' element = { <Home /> } />
                <Route path = '/login' element = { <Login /> } />
                <Route path = '/new' element = { <New /> } />
                <Route path = '/workouts' element = { <UserWorkouts /> } />
                {/* <Route path = '/new' element = { <New /> } /> */}
                <Route path = '/board' element = { <BoardHome /> } />
                <Route path = '/board/:id' element = { <BoardShow /> } />
                <Route path = '/board/new' element = { <BoardNew /> } />
                <Route path = '/board/:id/edit' />
                <Route path = '/register' element = { <Register /> } />
            </Routes>
        </Router>
    )
}

export default App