const NewForm = props => {
    return (
        <>
            <label>Exercise: </label>
            <input type = 'text' name = 'name' required />
            <label>Reps: </label>
            <input type = 'number' name = 'reps' min = '0' required />
            <label>Sets: </label>
            <input type = 'number' name = 'sets' min = '0' required />
        </>
    )
}

export default NewForm