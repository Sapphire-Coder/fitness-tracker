import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../services/posts-api'
import NewForm from '../../components/NewForm'
import Navbar from '../../components/Navbar'

export default function BoardNew() {

    const navigate = useNavigate()

    const [forms, setForms] = useState([<NewForm />])

    useEffect(() => {
        if(!localStorage.isAuth || JSON.parse(localStorage.isAuth) == false) navigate('/login')
    }, [])

    const newPost = e => {
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
        createPost(post)
        navigate('/board')
    }

    const addForm = e => {
        e.preventDefault()
        setForms([...forms, <NewForm />])
    }

    return (
        <div className = 'main'>
            <Navbar />
            <h1>Create a new post</h1>
            <div id = 'newPostForm'>
                <form onSubmit = {newPost}>
                <label>Title: </label>
                    <input type = 'text' name = 'title' required />
                    {
                        forms.map(form => {
                            return form
                        })
                    }
                    <button onClick={addForm}>Add Exercise</button>
                    <label>Calories: </label>
                    <input type = 'number' name = 'calories' min = '0' required/>
                    <label>Post: </label>
                    <textarea name = 'content' cols = '80' rows = '20' required ></textarea>
                    <input type = 'submit'/>
                </form>
            </div>
        </div>
    )
}