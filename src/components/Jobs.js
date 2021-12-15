import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';

function Jobs(props) {

    const [newJob, setNewJob] = useState({
        jobTitle: "",
        company: "",
        zipCode: "",
        applied: false,
        jobDescription: "",
        owner: props.user._id
    })

    /*handleChange{
        setNewJob({ ...newJob, [e.target.name]: e.target.value })
    }

    handleCheck{
        setNewJob({ ...newJob, [e.target.name]: e.target.checked }) (? not sure if this is right)
        
    }
    handleSubmit{
        add newJob to Job state array
        API call to post
        reset new job to empty values
    }
    */
    const handleChange = (e) => {
        setNewJob({ ...newJob, [e.target.name]: e.target.value })
    }

    const handleCheck = (e) => {
        setNewJob({ ...newJob, [e.target.name]: e.target.checked })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let preJSONBody = {
            jobTitle: newJob.jobTitle,
            company: newJob.company,
            zipCode: newJob.zipCode,
            //   leaving tasks off for now
            applied: Boolean(newJob.applied),
            jobDescription: newJob.jobDescription,
            owner: props.user._id
        }
        fetch("http://localhost:8000/jobs", {
            method: "POST",
            body: JSON.stringify(preJSONBody),
            headers: { 'Content-Type': 'application/JSON' }
        })
            .then(response => response.json())
            .then(postedJob => {
                setNewJob({
                    jobTitle: "",
                    company: "",
                    zipCode: "",
                    applied: false,
                    jobDescription: "",
                    owner: props.user._id
                })
                props.getJobs()
            })
            .catch(error => console.log(error))
    }

    const allJobs = props.jobs.map(job => <JobCard job={job} />)
    console.log(allJobs)

    return (
        <div className="container-div">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="jobTitle">Job Title: </label>
                    <input type="text" name="jobTitle" id="jobTitle" onChange={handleChange} value={newJob.jobTitle} />
                </div>
                <div>
                    <label htmlFor="company">Company: </label>
                    <input type="text" name="company" id="company" onChange={handleChange} value={newJob.company} />
                </div>
                <div>
                    <label htmlFor="zipCode">Zip Code: </label>
                    <input type="text" name="zipCode" id="zipCode" onChange={handleChange} value={newJob.zipCode} />
                </div>
                <div>
                    <label htmlFor="jobDescription">Job Description: </label>
                    <input type="text" name="jobDescription" id="jobDescription" onChange={handleChange} value={newJob.jobDescription} />
                </div>
                <div>
                    <label htmlFor="applied">Applied </label>
                    <input type="checkbox" name="applied" id="applied" onChange={handleCheck} checked={newJob.applied ? "checked" : ""} />
                </div>
                <input type="submit" value="submit" />

            </form>

            <div className="job-cards">
                {allJobs}
            </div>
        </div>
    )
}
export default Jobs