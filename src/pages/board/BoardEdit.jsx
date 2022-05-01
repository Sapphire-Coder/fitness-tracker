import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPost, updatePost } from '../../services/posts-api'
import NewForm from '../../components/NewForm'
import EditForm from '../../components/EditForm'
import Navbar from '../../components/Navbar'

export default function BoardEdit() {

    const navigate = useNavigate()
    const { id } = useParams()
    const [data, setData] = useState({})
    const [calories, setCalories] = useState(null)
    const [forms, setForms] = useState([])

    useEffect(() => {
        if(!localStorage.isAuth || JSON.parse(localStorage.isAuth) == false) navigate('/login')
        getPost(id).then(res => {
            setData(res.data)
            setCalories(res.data.workout.calories)

            const exercises = []
            res.data.workout.exercises.map(exercise => {
                exercises.push(<EditForm exercise = {exercise} />)
            })

            setForms(exercises)
        })
    }, [])

    const updPost = e => {
        e.preventDefault()

        const exercises = []

        if(e.target.name.length) {
            for(let i = 0; i < e.target.name.length; i++) {
                exercises.push({
                    name: e.target.name[i].value,
                    reps: e.target.reps[i].value,
                    sets: e.target.sets[i].value
                })
            }
        }
        else {
            exercises.push({
                name: e.target.name.value,
                reps: e.target.reps.value,
                sets: e.target.sets.value
            })
        }

        const workout = {
            exercises: exercises,
            calories: e.target.calories.value
        }

        const post = {
            title: e.target.title.value,
            workout: workout,
            content: e.target.content.value
        }

        updatePost(id, post)
        navigate(`/board/${id}`)
    }

    const addForm = e => {
        e.preventDefault()
        setForms([...forms, <NewForm />])
    }

    return (
        <div id = 'boardEdit'>
            <Navbar />
            <h1>Edit Post</h1>
            <div id = 'editPostForm' className = 'container'>
                <form id = 'boardEditForm' onSubmit = {updPost}>
                    <div className = 'form-group row'>
                        <label>Title: </label>
                        <input type = 'text' name = 'title' defaultValue = {data.title} required className = 'form-control'/>
                    </div>
                    {
                        forms.map(form => {
                            return form
                        })
                    }
                    <button onClick={addForm} className = 'btn'>Add Exercise</button>
                    <div className = 'form-group row'>
                        <label>Calories: </label>
                        <input type = 'number' name = 'calories' min = '0' defaultValue = {calories} required className = 'form-control'/>
                    </div>
                    <div className = 'form-group row'>
                        <label>Post: </label>
                        <textarea name = 'content' cols = '80' rows = '20' defaultValue = {data.content} required className = 'form-control'></textarea>
                    </div>
                    <input type = 'submit' className = 'btn'/>
                </form>
            </div>
        </div>
    )
}