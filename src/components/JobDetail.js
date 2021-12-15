import React, { useState, useEffect } from 'react';
import Tasks from './Task';
import { useParams } from 'react-router-dom'
import JobForm from './JobForm';

function JobDetail(props) {
    /******************
	 * DEFINE STATES  *
	 ******************/
    const [jobTasks, setJobTasks] = useState([])
    const [editForm, setEditForm] = useState(false)



    let id = useParams().id                 // Get url parameter
    console.log('THIS IS THE ID', id)

    let currentJob = props.jobs.filter(job => { // Filter through job array to get the job selected
        return job._id === id
    })

    const editToggle = () => {                  // Function to set edit form to T/F
        editForm ? setEditForm(false) : setEditForm(true)
    }

    let content

    if (editForm) {             // If editForm === true display the jobForm
        content = (
            <JobForm handleCheck={() => { 'func' }} handleChange={() => { 'func' }} job={currentJob[0]} handleSubmit={() => { 'func' }} />
        )
    } else {                    // Else display job details
        content = (
            <>
                <div className="job-description-div">
                    {form}
                    <p>{currentJob[0].jobTitle}</p>
                    <p>{currentJob[0].company}</p>
                    <p>{currentJob[0].jobDescription}</p>
                    <p>Applied: {currentJob[0].applied ? 'Yes' : 'No'}</p>
                </div>
                <button onClick={editToggle}>Edit Job Details</button>
                <div className="general-notes">
                    <h2>General notes box</h2>
                </div>
            </>
        )
    }

    return (
        <div>
            <h1>This is job detail Page</h1>
            {content}
            <Tasks jobId={id} tasks={currentJob[0].tasks} user={props.user} getJobs={props.getJobs} />
        </div>
    )
}
export default JobDetail