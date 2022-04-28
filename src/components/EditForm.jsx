const EditForm = props => {

    const { exercise } = props

    console.log(exercise)
    return (
        <>
            <label>Exercise: </label>
            <input type = 'text' name = 'name' defaultValue = {exercise.name}/>
            <label>Reps: </label>
            <input type = 'number' name = 'reps' min = '0' defaultValue = {exercise.reps}/>
            <label>Sets: </label>
            <input type = 'number' name = 'sets' min = '0' defaultValue={exercise.sets}/>
        </>
    )
}

export default EditForm