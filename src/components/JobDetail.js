import React, { useState, useEffect } from 'react';
import Task from './Task';

function JobDetail (props) {

    /*
        const jobDisplay = () => {
            find which job is clicked
            display that job from the state (props.jobs.x)
        }
    */
    return ( 
        <div>
            <h1>This is job detail Page</h1>
            <div className="job-description-div">
                <p>Job title</p>
                <p>Company</p>
                <p>Job description</p>
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