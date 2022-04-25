import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'

const App = () => {
    
    return (
        <Router>
            <Routes>
                <Route path = '/' />
                <Route path = '/login' element = { <Login /> } />
                <Route path = '/:id' />
                <Route path = '/new' />
                <Route path = '/:id/edit' />
                <Route path = '/register' />
            </Routes>
        </Router>
    )
}

export default App