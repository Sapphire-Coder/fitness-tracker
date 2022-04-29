import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getComments, createComment, deleteComment } from '../../services/comments-api'
import { deletePost, getPost } from '../../services/posts-api'
import { findUser } from '../../services/users-api'
import { createWorkout } from '../../services/workouts-api'

export default function BoardShow() {

    const navigate = useNavigate()
    const { id } = useParams()
    const [data, setData] = useState({})
    const [exercises, setExercises] = useState([])
    const [comments, setComments] = useState([])
    const [calories, setCalories] = useState(0)
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(!localStorage.isAuth || JSON.parse(localStorage.isAuth) == false) navigate('/login')
        getPost(id).then(res => {
            setData(res.data)
            setExercises(res.data.workout.exercises)
            setCalories(res.data.workout.calories)
        })
        findUser().then(res => setUser(res.data._id))
    }, [])

    useEffect(() => {
        getComments(id).then(res => setComments(res.data))
    }, [loading])

    const addComment = e => {
        e.preventDefault()
        setLoading(true)
        const comment = { post: id, comment: e.target.comment.value }
        createComment(comment).then(() => setLoading(false))
        e.target.comment.value = null
    }

    const newWorkout = e => {
        
        e.preventDefault()

        const exercises = []

        const len = document.querySelectorAll('.exercise').length
        const postExercises = document.querySelectorAll('.exercise')
        const postReps = document.querySelectorAll('.reps')
        const postSets = document.querySelectorAll('.sets')

        if(len > 0) {
            for(let i = 0; i < len; i++) {
                exercises.push({
                    name: postExercises[i].childNodes[1].nodeValue,
                    reps: postReps[i].childNodes[1].nodeValue,
                    sets: postSets[i].childNodes[1].nodeValue
                })
            }
        }
        else {
            console.log('I went here instead')
            exercises.push({
                name: postExercises.childNodes[1].nodeValue,
                reps: postReps.childNodes[1].nodeValue,
                sets: postSets.childNodes[1].nodeValue
            })
        }

        const workout = {
            exercises: exercises,
            calories: document.querySelector('#calories').childNodes[1].nodeValue
        }
        
        createWorkout(workout)
        alert('Workout Saved!')
    }

    const delPost = e => {
        e.preventDefault()
        deletePost(data._id)
        navigate('/board')
    }

    return (
        <div className='main'>
            <div id = 'post'>
                <h1>{data.title}</h1>
                {
                    exercises.map((exercise, i) => {
                        return (
                            <div key = {i}>
                                <h3 className = 'exercise'>Exercise: {exercise.name}</h3>
                                <h3 className = 'reps'>Reps: {exercise.reps}</h3>
                                <h3 className = 'sets'>Sets: {exercise.sets}</h3>
                            </div>
                        )
                    })
                }
                <h3 id = 'calories'>Calories: {calories}</h3>
                <div id = 'context'>
                    <h3>{data.content}</h3>
                    <button onClick = {newWorkout}>Add Workout</button>
                </div>
                {
                    user == data.user && (
                        <div>
                            <button onClick = {() => navigate(`/board/${id}/edit`)}>Edit Post</button>
                            <button onClick = {delPost}>Delete Post</button>
                        </div>
                    )
                }
            </div>
            <div id = 'commentSection'>
                {
                    comments.map((comment, i) => {
                        return (
                            <div key = {i} className = 'comment'>
                                <h3 style={{textDecorationLine: 'underline'}}>Username:</h3>
                                <h3>{comment.username}</h3>
                                <p style={{textDecorationLine: 'underline'}}>Comment:</p>
                                <p>{comment.comment}</p>
                                {
                                    user == comment.user && <button onClick = {e => {
                                        e.preventDefault()
                                        setLoading(true)
                                        deleteComment(comment._id).then(() => setLoading(false))
                                    }}>Delete Comment</button> 
                                }
                            </div>
                        )
                    })
                }
                <div id = 'commentBox'>
                    <form onSubmit={addComment}>
                        <label>Add Comment: </label>
                        <textarea name = 'comment' cols = '40' rows = '10' required ></textarea>
                        <input type = 'submit'/>
                    </form>
                </div>
            </div>
        </div>
    )
}