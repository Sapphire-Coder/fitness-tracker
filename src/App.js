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
import Edit from './pages/Edit'
import BoardEdit from './pages/board/BoardEdit'

const App = () => {
    
    const logout = e => {
        e.preventDefault()
        localStorage.clear()
        window.location.reload()
    }

    return (
        <Router>
            <Routes>
                <Route path = '/' element = { <Home /> } />
                <Route path = '/login' element = { <Login /> } />
                <Route path = '/new' element = { <New /> } />
                <Route path = '/workouts' element = { <UserWorkouts /> } />
                <Route path = '/edit/:id' element = { <Edit /> } />
                {/* <Route path = '/new' element = { <New /> } /> */}
                <Route path = '/board' element = { <BoardHome /> } />
                <Route path = '/board/:id' element = { <BoardShow /> } />
                <Route path = '/board/new' element = { <BoardNew /> } />
                <Route path = '/board/:id/edit' element = { <BoardEdit /> } />
                <Route path = '/register' element = { <Register /> } />
            </Routes>
        </Router>
    )
}

export default App