const EditForm = props => {

    const { exercise } = props

    return (
        <>
            <label>Exercise: </label>
            <input type = 'text' name = 'name' defaultValue = {exercise.name} required />
            <label>Reps: </label>
            <input type = 'number' name = 'reps' min = '0' defaultValue = {exercise.reps} required />
            <label>Sets: </label>
            <input type = 'number' name = 'sets' min = '0' defaultValue={exercise.sets} required />
        </>
    )
}

export default EditForm