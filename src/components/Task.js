import React, { useState, useEffect } from 'react';

function Task(props) {

    /*****************
	 * DEFINE STATES *
	 *****************/

    const [taskArray, setTaskArray] = useState([])

    const [taskList, setTaskList] = useState([
        { taskName: 'Submit resume', deadline: '', notes: '' },
        { taskName: 'Interview Prep', deadline: '', notes: '' },
        { taskName: 'New thing', deadline: '', notes: '' }
    ])

    const [newTask, setNewTask] = useState({ taskName: null, deadline: '', notes: '' })

    /********************
	 * HELPER FUNCTIONS *
	 ********************/

    // Sets newTask state to input values
    const handleChange = (e) => {
        setNewTask({...newTask, [e.target.name]: e.target.value})
    }

    // Post the created task to database
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('this is e', e)
        console.log('submit button clicked', e.target.value)
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

    // Update 'completed' value in database 
    const markAsCompleted = (e) => {
        let preJSONBody = {
            completed: true
        }
        console.log('e.target!', e._id)
        fetch(`http://localhost:8000/tasks/${props.jobId}/${e._id}`, {
            method: 'PATCH',
            body: JSON.stringify(preJSONBody),
            headers: { 'Content-Type': 'application/JSON', 'Authorization': 'Bearer ' + props.user.token }
        })
        .then(() => props.getJobs())
        .catch(error => console.log(error))
    }

    // Delete task
    const deleteTask = (e) => {
        console.log('This is e: ', e._id)
        fetch(`http://localhost:8000/tasks/${props.jobId}/${e._id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/JSON', 'Authorization': 'Bearer ' + props.user.token }
        })
        .then(() => props.getJobs())
        .catch(error => console.log(error))
    }

    // Iterate through task array to display all tasks created 
    props.tasks.sort(function compare(a, b) {
        let dateA = new Date(a.deadline)
        let dateB = new Date(b.deadline)
        return dateA - dateB
    })

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
                    <h2>{task.completed ? 'Completed' : <button onClick={() => markAsCompleted(task)}>Mark as Completed</button>}</h2>
                    <button onClick={() => deleteTask(task)}>Delete Task</button>

            </div>
        )
    })
    
    /**********************
	 * TASK CREATION FORM *
	 **********************/
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* BUG: NEED TO RESET SELECT AFTER SUBMIT */}
                <select name='taskName' value={newTask.taskName} onChange={handleChange} >
                    <option value='null' >--Select a Task--</option>
                    <option value='Submit Resume' >Submit Resume</option>
                    <option value='Accept Offer' >Accept Offer</option>
                    <option value='Other Misc Task' >Other Misc Task</option>
                </select>
                <label htmlFor='deadline'>Deadline: </label>
                <input type='date' name='deadline' id='deadline' value={newTask.deadline} onChange={handleChange} />
                <label htmlFor='notes' >Notes:</label>
                <input type='text' name='notes' id='notes' value={newTask.notes} onChange={handleChange} />
                <button type='submit' value={`${newTask.taskName}`} onClick={handleSubmit} >Add Task</button>
            </form>
            <div className='added-tasks'>
                {tasks}
            </div>
        </div>
    )
}
export default Task