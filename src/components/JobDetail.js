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


    // Get url parameter
    let id = useParams().id                 
    console.log('THIS IS THE ID', id)

    // Filter through job array to get the job selected
    let currentJob = props.jobs.filter(job => { 
        return job._id === id
    })

    // Function to set edit form to T/F
    const editToggle = () => {                  
        editForm ? setEditForm(false) : setEditForm(true)
    }

    let content
    // If check to display either form or info
    if (editForm) {             
        content = (
            <JobForm handleCheck={() => { 'func' }} handleChange={() => { 'func' }} job={currentJob[0]} handleSubmit={() => { 'func' }} />
        )
    } else {                    
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