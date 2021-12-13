import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';

function Jobs (props) {

    const [newJob, setNewJob] = useState([])

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


    return(
        <div className="container-div">
            <div>
                <label htmlFor="jobTitle">Job Title </label>
                <input type="text" name="jobTitle" id="jobTitle"  />
            </div>
            <div>
                <label htmlFor="company">Company </label>
                <input type="text" name="company" id="company"  />
            </div>
            <div>
                <label htmlFor="zipCode">Zip Code </label>
                <input type="text" name="zipCode" id="zipCode"  />
            </div>
            <div>
                <label htmlFor="jobDescription">Job Description </label>
                <input type="text" name="jobDescription" id="jobDescription"  />
            </div>
            <div>
                <label htmlFor="applied">Applied </label>
                <input type="checkbox" name="applied" id="applied"/>
            </div>
            <input type="submit" value="submit" />
            
            <div className="job-cards">
                < JobCard/>
            </div>
        </div>
    )
}
export default Jobs