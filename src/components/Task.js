import React, { useState, useEffect } from 'react';

function Task(props) {

    // Declare all states
    const [taskArray, setTaskArray] = useState([])
    const [taskList, setTaskList] = useState([{ taskName: 'Submit resume', deadline: '', notes: '' },
    { taskName: 'Interview Prep', deadline: '', notes: '' },
    { taskName: 'New thing', deadline: '', notes: '' }])
    const [newTask, setNewTask] = useState({ taskName: '', deadline: '', notes: '' })

    const handleSelect = (e) => {
        e.preventDefault()
        // console.log('this is e', e)
        // console.log("this is e.target.value", e.target.value)
        setNewTask(taskList[e.target.value])
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('this is e', e)
        console.log("submit button clicked", e.target.value)
        console.log('this is jobId', props.jobId)
        setTaskArray((previousTask) => [...taskArray, newTask])
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
        })
        .catch(error => { console.log(error) })
    }

    const getTask = () => {
        fetch(`http://localhost:8000/tasks`, {
            headers: { 'Content-Type': 'application/JSON' }
        })
        .then(tasks => {
            console.log('this is tasks: ', tasks)
        })
    }

    const tasks = taskArray.map(taskName => {
        return (
            <div>
                <h1>{taskName.taskName}</h1>
                <h2>Deadline:</h2>
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
                    <h2>General notes:</h2> {/* Research better/bigger text input field that saves */}
                    <form>
                    <input type="text"/>
                    </form>

            </div>
        )
    })

    //REMIND GORO ABOUT LINE 27
    return (
        <div>
            <form onChange={handleSelect}>
                <select name="taskName-dropdown">
                    <option value="null">--Select a Task--</option>
                    <option value={0}>{taskList[0].taskName}</option>
                    <option value={1}>{taskList[1].taskName}</option>
                    <option value={2}>{taskList[2].taskName}</option>
                </select>
                <button type="submit" value={`${newTask.taskName}`} onClick={handleSubmit}>Add Task</button>
            </form>
            <div className='added-tasks'>
                <p>You selected: {newTask.taskName}</p>
            </div>
            <div>
                {tasks}
            </div>
        </div>
    )
}
export default Task