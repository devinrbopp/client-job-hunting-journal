import React, { useState, useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import dateFormat, { masks } from "dateformat"
import apiUrl from '../apiConfig'

const Home = (props) => {
	const [tasks, setTasks] = useState([])
	// console.log('props in home', props)

	useEffect(() => {
		if (props.user) {
			fetch(apiUrl + '/tasks', {
				headers: {
					'Authorization': 'Bearer ' + props.user.token 
				}
			})
				.then(response => {
					return response.json()
				})
				.then(response => {
					response.sort(function compare(a, b) {
						let dateA = new Date(a.deadline)
						let dateB = new Date(b.deadline)
						return dateA - dateB
					})
					setTasks(response)
				})
				.catch(error => {console.log(error)})
		}
	}, [])

	const upcomingTasks = tasks.map(task => {
		let style
        let today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        if (task.deadline.substr(0, 10) <= date) {
            style = { color: 'red' }
        } else {
            style = { color: 'black' }
        }
		return (
			<div>
				<h4><Link to={`job/${task.jobId._id}`}>{task.taskName}</Link> - <small>{task.jobId.jobTitle}, {task.jobId.company}</small></h4>
				<h6 style={style}>Deadline: {dateFormat(task.deadline, 'dddd, mmmm dS, yyyy', true)}</h6>

				<p className='task-notes'>Notes: {task.notes}</p>
			</div>
		)
	}).slice(0,5)

	return (
		<>
			{props.user ? <h1>Upcoming Tasks:</h1> : 
			<div id='hero-welcome'>
				<h3 id='hero-text-min'>Minimize your stress.</h3>
				<h1 id='hero-text-max'>Maximize your efficiency.</h1>
				<p id='hero-text-p'>Launch your job search in an organized way to keep your stress levels minimized, and your efficiency levels maximized. Click sign up to get started.</p>
			</div>}
			<div className='upcoming-tasks-container'>
				{upcomingTasks}
			</div>
		</>
	)
}
export default Home