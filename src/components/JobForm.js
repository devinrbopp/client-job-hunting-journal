function JobForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className='job-form-input'>
                <label className='job-form-label' htmlFor='jobTitle'>Job Title: </label>
                <input className='job-form-field' type='text' name='jobTitle' id='jobTitle' onChange={props.handleChange} value={props.job.jobTitle}required />
            </div>
            <div className='job-form-input'>
                <label className='job-form-label' htmlFor='company'>Company: </label>
                <input className='job-form-field' type='text' name='company' id='company' onChange={props.handleChange} value={props.job.company}required />
            </div>
            <div className='job-form-input'>
                <label className='job-form-label' htmlFor='zipCode'>Zip Code: </label>
                <input className='job-form-field' type='text' name='zipCode' id='zipCode' minLength='5' maxLength='5' onChange={props.handleChange} value={props.job.zipCode} />
            </div>
            <div className='job-form-input'>
                <label className='job-form-label' htmlFor='jobDescription'>Job Description: </label>
                <input className='job-form-field' type='text' name='jobDescription' id='jobDescription' onChange={props.handleChange} value={props.job.jobDescription} />
            </div>
            <div className='job-form-input'>
                <label className='job-form-label' htmlFor='applied'>Applied </label>
                <input className='job-form-field' type='checkbox' name='applied' id='applied' onChange={props.handleCheck} checked={props.job.applied ? 'checked' : ''} />
            </div>
            <input type='submit' value='submit' />
        </form>
    )
}
export default JobForm