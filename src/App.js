import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import New from './pages/New'
import UserWorkouts from './pages/UserWorkouts'

const App = () => {
    
    return (
        <Router>
            {localStorage.isAuth && JSON.parse(localStorage.isAuth) === true ? (
                <nav>
                    <Link to = '/'>Home </Link>
                    <Link to = '/workouts'>Workouts </Link>
                    <Link to = '/board'>Workout Board </Link>
                </nav>   
            ) : null }
            <Routes>
                <Route path = '/' element = { <Home /> } />
                <Route path = '/login' element = { <Login /> } />
                <Route path = '/new' element = { <New /> } />
                <Route path = '/workouts' element = { <UserWorkouts /> } />
                {/* <Route path = '/new' element = { <New /> } /> */}
                <Route path = '/board/:id' />
                <Route path = '/board/new' />
                <Route path = '/board/:id/edit' />
                <Route path = '/register' element = { <Register /> } />
            </Routes>
        </Router>
    )
}

export default App