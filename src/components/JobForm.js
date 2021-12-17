

function JobForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label htmlFor="jobTitle">Job Title: </label>
                <input type="text" name="jobTitle" id="jobTitle" onChange={props.handleChange} value={props.job.jobTitle}required />
            </div>
            <div>
                <label htmlFor="company">Company: </label>
                <input type="text" name="company" id="company" onChange={props.handleChange} value={props.job.company}required />
            </div>
            <div>
                <label htmlFor="zipCode">Zip Code: </label>
                <input type="text" name="zipCode" id="zipCode" onChange={props.handleChange} value={props.job.zipCode} />
            </div>
            <div>
                <label htmlFor="jobDescription">Job Description: </label>
                <input type="text" name="jobDescription" id="jobDescription" onChange={props.handleChange} value={props.job.jobDescription} />
            </div>
            <div>
                <label htmlFor="applied">Applied </label>
                <input type="checkbox" name="applied" id="applied" onChange={props.handleCheck} checked={props.job.applied ? "checked" : ""} />
            </div>
            <input type="submit" value="submit" />
        </form>
    )
}

export default JobForm
