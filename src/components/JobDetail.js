import React, { useState, useEffect } from 'react';
import Task from './Task';
import { useParams } from 'react-router-dom'

function JobDetail (props) {
    let id = useParams().id
    console.log('THIS IS THE ID', id)

    let currentJob = props.jobs.filter(job =>{
        return job._id === id
    })
    console.log('CURRENT JOB', currentJob)
    return ( 
        <div>
            <h1>This is job detail Page</h1>
            <div className="job-description-div">
                <p>{currentJob[0].jobTitle}</p>
                <p>{currentJob[0].company}</p>
                <p>{currentJob[0].jobDescription}</p>
            </div>
            <div className="general-notes"> 
                <h2>General notes box</h2>
            </div>
            <form>
                <Task/>
            </form>
        </div>
    )
}
export default JobDetail