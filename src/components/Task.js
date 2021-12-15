import React, { useState, useEffect } from 'react';

function Task(props) {

    // Declare all states
    const [taskArray, setTaskArray] = useState([])
    const [taskList, setTaskList] = useState([
        { taskName: 'Submit resume', deadline: '', notes: '' },
        { taskName: 'Interview Prep', deadline: '', notes: '' },
        { taskName: 'New thing', deadline: '', notes: '' }
    ])
    const [newTask, setNewTask] = useState({ taskName: null, deadline: '', notes: '' })

    const handleChange = (e) => {
        setNewTask({...newTask, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('this is e', e)
        console.log("submit button clicked", e.target.value)
        console.log('this is jobId', props.jobId)
        // setTaskArray((previousTask) => [...taskArray, newTask])
        let preJSONBody = {
            taskName: newTask.taskName,
            deadline: newTask.deadline,
            notes: newTask.notes
        }
        console.log('This is preJSONBody: ', preJSONBody)
        fetch(`http://localhost:8000/tasks/${props.jobId}`, { //change jobId to prop.jobId after job page completed
            method: 'POST',
            body: JSON.stringify(preJSONBody),
            headers: { 'Content-Type': 'application/JSON', 'Authorization': 'Bearer ' + props.user.token }
        })
        .then(response => {
            console.log(response.json())
            setNewTask({ taskName: null, deadline: '', notes: '' })
            props.getJobs()
        })
        .catch(error => { console.log(error) })
    }

    const tasks = props.tasks.map(task => {
        return (
            <div>
                <h1>{task.taskName}</h1>
                <h2>Deadline: {task.deadline}</h2>
                    {/* 
                    Need to npm i @material-ui/core for this to work
                    <TextField
                        id= deadline"
                        label="Choose your deadline"
                        type= deadline"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    /> */}
                    <h2>General notes: {task.notes}</h2> {/* Research better/bigger text input field that saves */}
                    <h2>Completed: {task.completed ? 'Yes!' : 'No!'}</h2>

            </div>
        )
    })

    //REMIND GORO ABOUT LINE 27
    return (
        <div>
            <form onSubmit={handleSubmit}>
                // BUG: NEED TO RESET SELECT AFTER SUBMIT
                <select name="taskName" value={newTask.taskName} onChange={handleChange}>
                    <option value="null">--Select a Task--</option>
                    <option value='Submit Resume'>Submit Resume</option>
                    <option value='Accept Offer'>Accept Offer</option>
                    <option value='Other Misc Task'>Other Misc Task</option>
                </select>
                <label htmlFor="deadline">Deadline: </label>
                <input type="date" name="deadline" id="deadline" value={newTask.deadline} onChange={handleChange} />
                <label htmlFor="notes">Notes:</label>
                <input type="text" name="notes" id="notes" value={newTask.notes} onChange={handleChange} />
                <button type="submit" value={`${newTask.taskName}`} onClick={handleSubmit}>Add Task</button>
            </form>
            <div className='added-tasks'>
                {tasks}
            </div>
        </div>
    )
}
export default Task