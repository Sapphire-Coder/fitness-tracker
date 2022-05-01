import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
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
        <div className = 'container' id = 'boardShow'>
            <Navbar />
            <h1>{data.title}</h1>
            <div className = 'container-fluid'>
                <div className = 'row justify-content-around'>
                    {
                        exercises.map((exercise, i) => {
                            return (
                                <div key = {i} className = 'col-4'>
                                    <h4 className = 'exercise'>Exercise: {exercise.name}</h4>
                                    <h4 className = 'reps'>Reps: {exercise.reps}</h4>
                                    <h4 className = 'sets'>Sets: {exercise.sets}</h4>
                                </div>
                            )
                        })
                    }
                </div>
                <div className = 'row justify-content-around'>
                    <h4 id = 'calories' className = 'col-4 align-self-center'>Calories: {calories}</h4>
                </div>
                <div className = 'container-fluid'>
                    <div id = 'content'>
                        <p>{data.content}</p>
                    </div>
                    <div className = 'row justify-content-around'>
                        <button onClick = {newWorkout} className = 'btn'>Add Workout</button>
                    </div>
                    {
                        user == data.user && (
                            <div className = 'row justify-content-around'>
                                <button onClick = {() => navigate(`/board/${id}/edit`)} className = 'btn'>Edit Post</button>
                                <button onClick = {delPost} className = 'btn'>Delete Post</button>
                            </div>
                        )
                    }
                </div>
            </div>
            <div id = 'commentSection' className = 'container'>
                {
                    comments.map((comment, i) => {
                        return (
                            <div key = {i} className = 'conatiner-fluid comment'>
                                <h4 style={{textDecorationLine: 'underline'}}>Username:</h4>
                                <h5>{comment.username}</h5>
                                <h5 style={{textDecorationLine: 'underline'}}>Comment:</h5>
                                <p>{comment.comment}</p>
                                {
                                    user == comment.user && <button onClick = {e => {
                                        e.preventDefault()
                                        setLoading(true)
                                        deleteComment(comment._id).then(() => setLoading(false))
                                    }} className = 'btn'>Delete Comment</button> 
                                }
                            </div>
                        )
                    })
                }
                <div id = 'commentBox' className = 'container'>
                    <h4>Add a comment</h4>
                    <form onSubmit={addComment}>
                        <div className = 'form-group row'>
                            <label>Add Comment: </label>
                            <textarea name = 'comment' cols = '40' rows = '5' placeholder = 'comment' required className = 'form-control'></textarea>
                        </div>
                        <div className = 'row justify-content-around'>
                            <input type = 'submit' className = 'btn'/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}