import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

function JobCard (props) {

    const markApplied = () => {
        let preJSONBody = {
            applied: true
        }
        fetch(`http://localhost:8000/jobs/${props.job._id}`, {
            method: 'PATCH',
            body: JSON.stringify(preJSONBody),
            headers: { 'Content-Type': 'application/JSON', 'Authorization': 'Bearer ' + props.user.token }
        })
        .then(() => props.getJobs())
        .catch(error => console.log(error))
    }
    
    const deleteJob = () => {
        fetch(`http://localhost:8000/jobs/${props.job._id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/JSON', 'Authorization': 'Bearer ' + props.user.token }
        })
        .then(() => props.getJobs())
        .catch(error => console.log(error))
    }

    //map function to display all the job cards

    return (
        <div className="JobCard-container">
            <h1> <Link to={`/job/${props.job._id}`}> {props.job.jobTitle} - {props.job.company}</Link></h1>
            <p>{props.job.applied ? 'Applied!' : <button onClick={markApplied}>Mark as Applied</button>}</p>
            <button onClick={deleteJob}>Delete</button>
        </div>
    )
}
export default JobCard