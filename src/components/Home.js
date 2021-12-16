import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom'


const Home = (props) => {
	// const { msgAlert, user } = props
	const [tasks, setTasks] = useState([])
	console.log('props in home', props)

	useEffect(() => {
		if (props.user) {
			fetch('http://localhost:8000/tasks', {
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


	
	return (
		<>
			<h2>Home Page</h2>
		</>
	)
}

export default Home
