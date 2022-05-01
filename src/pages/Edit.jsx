import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getWorkout, updateWorkout } from '../services/workouts-api'
import NewForm from '../components/NewForm'
import EditForm from '../components/EditForm'
import Navbar from '../components/Navbar'

export default function Edit() {

    const navigate = useNavigate()
    const { id } = useParams()
    const [data, setData] = useState({})
    const [forms, setForms] = useState([])

    useEffect(() => {
        if(!localStorage.isAuth || JSON.parse(localStorage.isAuth) == false) navigate('/login')
        getWorkout(id).then(res => {
            setData(res.data)

            const exercises = []
            res.data.exercises.map(exercise => {
                exercises.push(<EditForm exercise = {exercise} />)
            })

            setForms(exercises)
        })
    }, [])

    const updWorkout = e => {
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
        
        updateWorkout(id, workout).then(navigate('/workouts'))
    }

    const addForm = e => {
        e.preventDefault()
        setForms([...forms, <NewForm />])
    }

    return (
        <div className = 'main'>
            <Navbar />
            <div>
                <form id = 'editWorkout' onSubmit = {updWorkout}>
                    {
                        forms.map(form => {
                            return form
                        })
                    }
                    <label>Calories: </label>
                    <input type = 'number' name = 'calories' min = '0' defaultValue = {data.calories}/>
                    <button onClick={addForm}>Add Exercise</button>
                    <input type = 'submit' />
                </form>
            </div>
        </div>
    )
}