const NewForm = props => {
    return (
        <>
            <label>Exercise: </label>
            <input type = 'text' name = 'name'/>
            <label>Reps: </label>
            <input type = 'number' name = 'reps' min = '0'/>
            <label>Sets: </label>
            <input type = 'number' name = 'sets' min = '0'/>
        </>
    )
}

export default NewForm