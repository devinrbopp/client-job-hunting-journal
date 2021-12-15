import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import JobForm from './JobForm';

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

    /*********************
	 * HELPER FUNCTIONS  *
	 *********************/
    const handleChange = (e) => {
        setNewJob({ ...newJob, [e.target.name]: e.target.value }) // Sets newJob state to input values
    }

    const handleCheck = (e) => {
        setNewJob({ ...newJob, [e.target.name]: e.target.checked }) // Sets 'applied' value to true/false
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

    /*********************************************
	 * ITERATE THROUGH JOBS TO DISPLAY ALL JOBS  *
	 *********************************************/
    const allJobs = props.jobs.map(job => <JobCard job={job} user={props.user} getJobs={props.getJobs}/>)
    console.log(allJobs)

    return (
        <div className="container-div">
            <h2>Add a new job:</h2>
            <JobForm handleCheck={handleCheck} handleChange={handleChange} job={newJob} handleSubmit={handleSubmit} />

            <div className="job-cards">
                {allJobs}
            </div>
        </div>
    )
}
export default Jobs