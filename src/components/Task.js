import React, { useState, useEffect } from 'react';
import dateFormat, { masks } from 'dateformat'
import apiUrl from '../apiConfig'

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
    const [newTask, setNewTask] = useState({ taskName: null, deadline: '', notes: '', owner: props.user._id, jobId: props.jobId })

    /********************
     * HELPER FUNCTIONS *
     ********************/

    // Sets newTask state to input values
    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value })
    }
    // Post the created task to database
    const handleSubmit = (e) => {
        e.preventDefault()
        let preJSONBody = {
            taskName: newTask.taskName,
            deadline: newTask.deadline.substring(0,10),
            notes: '',
            owner: props.user._id,
            jobId: props.jobId
        }
        fetch(apiUrl + `/tasks`, { 
            method: 'POST',
            body: JSON.stringify(preJSONBody),
            headers: { 'Content-Type': 'application/JSON', 'Authorization': 'Bearer ' + props.user.token }
        })
            .then(response => {
                // console.log(response.json())
                setNewTask({ taskName: null, deadline: '', notes: '', owner: props.user._id, jobId: props.jobId })
                props.getJobs()
            })
            .catch(error => { console.log(error) })
    }

    // Update 'completed' value in database 
    const markAsCompleted = (e) => {
        let preJSONBody = {
            completed: true
        }
        // console.log('e.target!', e._id)
        fetch(apiUrl + `/tasks/${e._id}`, {
            method: 'PATCH',
            body: JSON.stringify(preJSONBody),
            headers: { 'Content-Type': 'application/JSON', 'Authorization': 'Bearer ' + props.user.token }
        })
            .then(() => props.getTasks())
            .catch(error => console.log(error))
    }

    // Delete task
    const deleteTask = (e) => {
        // console.log('This is e: ', e._id)
        fetch(apiUrl + `/tasks/${e._id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/JSON', 'Authorization': 'Bearer ' + props.user.token }
        })
            .then(() => props.getTasks())
            .catch(error => console.log(error))
    }

    // handle changes to the notepad
    const handleNotepad = (e) => {
        let preJSONBody = {
            notes: e.target.value
        }
        // console.log('notepad change', e.target.value)
        // console.log(e.target.className)
        fetch(apiUrl + `/tasks/${e.target.className}`, {
            method: 'PATCH',
            body: JSON.stringify(preJSONBody),
            headers: { 'Content-Type': 'application/JSON', 'Authorization': 'Bearer ' + props.user.token }
        })
            .then(() => props.getTasks())
            .catch(error => console.log(error))
    }

    // Iterate through task array to display all tasks created 
    props.tasks.sort(function compare(a, b) {
        let dateA = new Date(a.deadline)
        let dateB = new Date(b.deadline)
        return dateA - dateB
    })

    const tasks = props.tasks.map(task => {
        let style
        let today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        if (task.deadline.substr(0, 10) <= date) {
            style = { color: 'red' }
        } else {
            style = { color: 'black' }
        }
        return (
            <div className='task-card'>
                <h1>{task.taskName}</h1>
                <h2 style={style} name='taskDeadline'>Deadline: {dateFormat(task.deadline, 'dddd, mmmm dS, yyyy', true)}</h2>
                <textarea placeholder={'Take notes here. Notes are saved automatically.'} onChange={handleNotepad} className={task._id} name='notepad' id='' rows='10'>{task.notes}</textarea>
                <br />
                {task.completed ? 'Completed' : <button onClick={() => markAsCompleted(task)}>Mark as Completed</button>}
                <button onClick={() => deleteTask(task)}>Delete Task</button>
            </div>
        )
    })

    /*********************
     * TASK CREATION FORM *
     **********************/

    return (
        <div>
            <div className='task-form-container'>
                <form onSubmit={handleSubmit}>
                    <label hidden className='task-form-label'>Select</label>
                    <select className='task-input' id='task-name-select' name='taskName' value={newTask.taskName} onChange={handleChange} >
                        <option value={null} selected={newTask.taskName == null ? true : false} >--Select a Task--</option>
                        <option value='Submit Resume' >Submit Resume</option>
                        <option value='Accept Offer' >Accept Offer</option>
                        <option value='Other Misc Task' >Other Misc Task</option>
                    </select>
                    <div id='task-deadline-input' className='task-input'>
                        <label htmlFor='deadline' className='task-form-label' >Deadline:  </label>
                        <input type='date' name='deadline' id='deadline' value={newTask.deadline} onChange={handleChange} /><br />
                    </div>
                    <button className='task-input' id='task-submit' type='submit' value={`${newTask.taskName}`} onClick={handleSubmit} >Add Task</button>
                </form>
            </div>
            <hr />
            <div className='task-cards'>
                {tasks}
            </div>
        </div>
    )
}
export default Task