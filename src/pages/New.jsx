import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createWorkout } from '../services/workouts-api'
import NewForm from '../components/NewForm'

export default function New() {

    const navigate = useNavigate()

    const [forms, setForms] = useState([<NewForm />])

    useEffect(() => {
        if(!localStorage.isAuth || JSON.parse(localStorage.isAuth) == false) navigate('/login')
    }, [])

    const newWorkout = e => {
        
        e.preventDefault()

        const exercises = []

        for(let i = 0; i < e.target.name.length; i++) {
            exercises.push({
                name: e.target.name[i].value,
                reps: e.target.reps[i].value,
                sets: e.target.sets[i].value
            })
        }

        const workout = {
            exercises: exercises,
            calories: e.target.calories.value
        }
        
        console.log(exercises)
        createWorkout(workout)
        navigate('/')
    }

    const addForm = e => {
        e.preventDefault()
        setForms([...forms, <NewForm />])
    }

    return (
        <div className = 'main'>
            <div>
                <form id = 'userWorkout' onSubmit = {newWorkout}>
                    {
                        forms.map(form => {
                            return form
                        })
                    }
                    <label>Calories: </label>
                    <input type = 'number' name = 'calories' min = '0'/>
                    <button onClick={addForm}>Add Exercise</button>
                    <input type = 'submit' />
                </form>
            </div>
        </div>
    )
}