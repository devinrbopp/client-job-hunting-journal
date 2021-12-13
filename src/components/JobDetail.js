import React, { useState, useEffect } from 'react';
import Task from './Task';

function JobDetail (props) {
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
                <p id="dropdown">Task dropdown menu</p>
                <p id="deadline">Deadline and notes</p>
            </form>
            <Task/>
        </div>
    )
}
export default JobDetail