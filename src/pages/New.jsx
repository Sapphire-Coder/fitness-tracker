import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createWorkout } from '../services/workouts-api'
import NewForm from '../components/NewForm'
import Navbar from '../components/Navbar'

export default function New() {

    const navigate = useNavigate()

    const [forms, setForms] = useState([<NewForm />])

    useEffect(() => {
        if(!localStorage.isAuth || JSON.parse(localStorage.isAuth) == false) navigate('/login')
    }, [])

    const newWorkout = e => {
        
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
        
        createWorkout(workout)
        navigate('/workouts')
    }

    const addForm = e => {
        e.preventDefault()
        setForms([...forms, <NewForm />])
    }

    return (
        <div id = 'new'>
            <Navbar />
            <h1>Create Workout</h1>
            <div className = 'container'>
                <form id = 'newWorkout' onSubmit = {newWorkout}>
                    {
                        forms.map(form => {
                            return form
                        })
                    }
                    <button onClick={addForm} className = 'btn'>Add Exercise</button> <br/>
                    <div className = 'form-group row'>
                        <label>Calories: </label>
                        <input type = 'number' name = 'calories' min = '0' placeholder = 'calories' required className = 'form-control'/>
                    </div>
                    <input type = 'submit' className = 'btn'/>
                </form>
            </div>
        </div>
    )
}