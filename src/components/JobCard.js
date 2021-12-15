import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'


function JobCard (props) {

    //map function to display all the job cards

    return (
        <div className="JobCard-container">
            <h1> <Link to={`/job/${props.job._id}`}> {props.job.jobTitle} - {props.job.company}</Link></h1>
            <p>Applied: {props.job.applied ? 'Yes' : 'No'}</p>
        </div>
    )
}
export default JobCard