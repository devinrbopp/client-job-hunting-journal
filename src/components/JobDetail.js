import React, { useState, useEffect } from 'react';
import Tasks from './Task';
import { useParams } from 'react-router-dom'
import JobForm from './JobForm';

function JobDetail(props) {
    /******************
     * DEFINE STATES  *
     ******************/
    // Get url parameter
    let id = useParams().id

    // Filter through job array to get the job selected
    // let currentJob = props.jobs.filter(job => { 
    //     return job._id === id
    // })
    // editForm determines whether the edit form should be displayed
    const [editForm, setEditForm] = useState(false)
    // current job determines which job is on the current page using the params
    const [currentJob, setCurrentJob] = useState(props.jobs.filter(job => {
        return job._id === id
    }))
    // edit job is an editable state that is changed by the form
    const [editJob, setEditJob] = useState(currentJob[0])

    const [tasks, setTasks] = useState([])

    // FETCH TO RETRIEVE LIST OF TASKS
    const getTasks = () => {
        fetch('http://localhost:8000/tasks', {
            headers: {
                'Authorization': 'Bearer ' + props.user.token 
            }
        })
            .then(tasks => tasks.json())
            .then(tasks => {
                console.log('THESE ARE TASKS BEFORE THEY ARE FILTERED', tasks)
                return tasks.filter(task => {
                    console.log(task.jobId._id)
                    console.log(id)
                    return task.jobId._id == id
                })
            })
            .then(theseTasks => {
                console.log('THESE ARE THE TASKS FOR THIS JOB PAGE:', theseTasks)
                setTasks(theseTasks)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getTasks()
    }, [props])

    // when a new list of jobs is retrieved, reset the current job to its updated info
    useEffect(() => {
        setCurrentJob(props.jobs.filter(job => {
            return job._id === id
        }))
    }, [props.jobs])

    // when the current job has updated, copy its info to the editJob state
    useEffect(() => {
        setEditJob(currentJob[0])
    }, [currentJob])

    const handleChange = (e) => {
        setEditJob({ ...editJob, [e.target.name]: e.target.value })
    }

    // Sets 'applied' value to true/false
    const handleCheck = (e) => {
        setEditJob({ ...editJob, [e.target.name]: e.target.checked })
    }

    // Function to set edit form to T/F
    const editToggle = () => {
        editForm ? setEditForm(false) : setEditForm(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let preJSONBody = {
            jobTitle: editJob.jobTitle,
            company: editJob.company,
            zipCode: editJob.zipCode,
            //   leaving tasks off for now
            applied: Boolean(editJob.applied),
            jobDescription: editJob.jobDescription,
            owner: editJob.owner
        }
        fetch(`http://localhost:8000/jobs/${editJob._id}`, {
            method: "PATCH",
            body: JSON.stringify(preJSONBody),
            headers: { 'Content-Type': 'application/JSON', 'Authorization': 'Bearer ' + props.user.token }
        })
            .then(() => {
                props.getJobs()
                setEditJob(currentJob[0])
                setEditForm(false)
            })
            .catch(error => console.log(error))
    }

    let content
    // If check to display either form or info
    if (editForm) {
        content = (
            <JobForm handleCheck={handleCheck} handleChange={handleChange} job={editJob} handleSubmit={handleSubmit} />
        )
    } else {
        content = (
            <>
                <div className="job-description-div">
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
            <Tasks getTasks={getTasks} jobId={id} tasks={tasks} user={props.user} getJobs={props.getJobs} />
        </div>
    )
}
export default JobDetail