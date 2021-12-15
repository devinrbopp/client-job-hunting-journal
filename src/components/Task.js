import React, { useState, useEffect } from 'react';

function Task(props) {

    // Declare all states
    const [taskArray, setTaskArray] = useState([])
    const [taskList, setTaskList] = useState([{ task: 'Submit resume', date: '', notes: '' },
    { task: 'Interview Prep', date: '', notes: '' },
    { task: 'New thing', date: '', notes: '' }])
    const [newTask, setNewTask] = useState({ task: '', date: '', notes: '' })

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
        setTaskArray((previousTask) => [...taskArray, newTask])
        // let preJSONBody = {
        //     task: newTask.task,
        //     date: newTask.date,
        //     notes: newTask.notes
        // }
        // fetch('http://localhost:8000/tasks/:jobId', { //change jobId to prop.jobId after job page completed
        //     method: 'POST',
        //     body: JSON.stringify(preJSONBody),
        //     headers: { 'Content-Type': 'application/JSON'}
        // })
        // .then(response => {
        //     console.log(response.json())
        // })
        // .catch(error => { console.log(error) })
    }
    const tasks = taskArray.map(task => {
        return (
            <div>
                <h1>{task.task}</h1>
                <h2>Deadline:</h2>
                    {/* 
                    Need to npm i @material-ui/core for this to work
                    <TextField
                        id="date"
                        label="Choose your deadline"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    /> */}
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
                <select name="task-dropdown">
                    <option value="null">--Select a Task--</option>
                    <option value={0}>{taskList[0].task}</option>
                    <option value={1}>{taskList[1].task}</option>
                    <option value={2}>{taskList[2].task}</option>
                </select>
                <button type="submit" value={`${newTask.task}`} onClick={handleSubmit}>Add Task</button>
            </form>
            <div className='added-tasks'>
                <p>You selected: {newTask.task}</p>
            </div>
            <div>
                {tasks}
            </div>
        </div>
    )
}
export default Task