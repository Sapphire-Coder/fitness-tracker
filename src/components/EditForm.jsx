const EditForm = props => {

    const { exercise } = props

    return (
        <>
            <div className = 'form-group row'>
                <label>Exercise: </label>
                <input type = 'text' name = 'name' defaultValue = {exercise.name} required className = 'form-control'/>
            </div>
            <div className = 'form-group row'>
                <label>Reps: </label>
                <input type = 'number' name = 'reps' min = '0' defaultValue = {exercise.reps} required className = 'form-control'/>
            </div>
            <div className = 'form-group row'>
                <label>Sets: </label>
                <input type = 'number' name = 'sets' min = '0' defaultValue={exercise.sets} required className = 'form-control'/>
            </div>
        </>
    )
}

export default EditForm