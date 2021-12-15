import React, { useState, useEffect } from 'react';
import Tasks from './Task';
import { useParams } from 'react-router-dom'
import JobForm from './JobForm';

function JobDetail (props) {
    const [jobTasks, setJobTasks] = useState([])
    const [editForm, setEditForm] = useState(false)

    

    let id = useParams().id
    console.log('THIS IS THE ID', id)

    let currentJob = props.jobs.filter(job =>{
        return job._id === id
    })

    const editToggle = () => {
        editForm ? setEditForm(false) : setEditForm(true)
    }

    let form

    // useEffect(() => {
        if (editForm) {
            form = (
                <JobForm handleCheck={()=> {'func'}} handleChange={()=> {'func'}} job={currentJob[0]} handleSubmit={()=> {'func'}} />
            )
        } else {
            form = (
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
    // }, [editForm])

    return ( 
        <div>
            <h1>This is job detail Page</h1>
            {form}
            {/* <div className="job-description-div">
                {form}
                <p>{currentJob[0].jobTitle}</p>
                <p>{currentJob[0].company}</p>
                <p>{currentJob[0].jobDescription}</p>
                <p>Applied: {currentJob[0].applied ? 'Yes' : 'No'}</p>
            </div>
            <button onClick={editToggle}>Edit Job Details</button>
            <div className="general-notes"> 
                <h2>General notes box</h2>
            </div> */}
            <Tasks jobId={id} tasks={currentJob[0].tasks} user={props.user} getJobs={props.getJobs} />
        </div>
    )
}
export default JobDetail