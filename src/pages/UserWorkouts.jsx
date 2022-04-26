import { useEffect, useState } from 'react'
import { getWorkouts } from '../services/workouts-api'
import { useNavigate } from 'react-router-dom'


export default function UserWorkouts() {

    const navigate = useNavigate()

    const [data, setData] = useState([])

    useEffect(() => {
        if(!localStorage.isAuth || JSON.parse(localStorage.isAuth) == false) navigate('/login')
        getWorkouts().then(res => setData(res.data))
    }, [])

    return (
        <div className = 'main'>
            <div id = 'userContainer'>
                {
                    data.map((workout, i) => {
                        return (
                            <div key = {i}>
                                <h2>Workout {i + 1}</h2>
                                {
                                    workout.exercises.map((exercise, j) => {
                                        return (
                                            <div key = {j}>
                                                <h2>Name: {exercise.name}</h2>
                                                <h2>Reps: {exercise.reps}</h2>
                                                <h2>Sets: {exercise.sets}</h2>
                                            </div>
                                        )

                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}