const NewForm = props => {
    return (
        <>
            <div className = 'form-group row'>
                <label>Exercise: </label>
                <input type = 'text' name = 'name' placeholder = 'exercise' required className = 'form-control'/>
            </div>
            <div className = 'form-group row'>
                <label>Reps: </label>
                <input type = 'number' name = 'reps' min = '0' placeholder = 'reps' required className = 'form-control'/>
            </div>
            <div className = 'form-group row'>
                <label>Sets: </label>
                <input type = 'number' name = 'sets' min = '0' placeholder = 'sets' required className = 'form-control'/>
            </div>
        </>
    )
}

export default NewForm