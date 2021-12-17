import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import JobForm from './JobForm';

import apiUrl from '../apiConfig'

function Jobs(props) {

    /*************************
	 * DEFINE NEWJOB STATES  *
	 *************************/	
    const [newJob, setNewJob] = useState({
        jobTitle: "",
        company: "",
        zipCode: "",
        applied: false,
        jobDescription: "",
        owner: props.user._id
    })

    /*********************
	 * HELPER FUNCTIONS  *
	 *********************/

    // Sets newJob state to input values
    const handleChange = (e) => {
        setNewJob({ ...newJob, [e.target.name]: e.target.value }) 
    }
    // Sets 'applied' value to true/false
    const handleCheck = (e) => {
        setNewJob({ ...newJob, [e.target.name]: e.target.checked }) 
    }

    /***************************
	 * POST CREATED JOB TO DB  *
	 ***************************/
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
        fetch(apiUrl + "/jobs", {
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

    /*********************************************
	 * ITERATE THROUGH JOBS TO DISPLAY ALL JOBS  *
	 *********************************************/
    const allJobs = props.jobs.map(job => <JobCard job={job} user={props.user} getJobs={props.getJobs}/>)
    console.log(allJobs)

    return (
        <div className="container-div">
            <div id='job-form-container'>
                <h2>Add a new job:</h2>
                <JobForm handleCheck={handleCheck} handleChange={handleChange} job={newJob} handleSubmit={handleSubmit} />
            </div>

            <div className="job-cards">
                {allJobs}
            </div>
        </div>
    )
}
export default Jobs