import React, { useState, useEffect } from 'react';

function JobCard (props) {

    //map function to display all the job cards

    return (
        <div className="JobCard-container">
            <h1>{props.job.jobTitle} - {props.job.company}</h1>
            <p>Applied: {props.job.applied ? 'Yes' : 'No'}</p>
        </div>
    )
}
export default JobCard