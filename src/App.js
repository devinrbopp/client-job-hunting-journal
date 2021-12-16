// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import Profile from './components/Profile'
import Jobs from './components/Jobs'
import JobDetail from './components/JobDetail'



const App = () => {

    /************************************
	 *          DEFINE STATES           *
	 ************************************/
	const [jobs, setJobs] = useState([])
	const [profile, setProfile] = useState([])
	const [user, setUser] = useState(null)
	const [msgAlerts, setMsgAlerts] = useState([])
	const [currentProfile, setCurrentProfile] = useState(null)
	


	console.log('user in app', user)
	console.log('message alerts', msgAlerts)
	const clearUser = () => {
		console.log('clear user ran')
		setUser(null)
	}

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id))
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
			)
		})
	}

	/*****************************************
	 * FUNCTION TO GET USER PROFILE FROM DB  *
	 *****************************************/	
	const getProfile = () => {
		if (user != null) {
			// Fetch request into db using userId as a param
			fetch(`http://localhost:8000/profiles/${user._id}`) 
			.then(profile => {
				console.log('PROFILE RETRIEVED FROM SERVER')
				return profile.json()
			})
			.then(profile =>{
				// Set current profile to the profile retrieved from fetch req
				console.log('this is profile:', profile)
				setCurrentProfile(profile[0]) 				
				return 'complete'
			})
			.catch(error => console.log(error))
		}
	}

	/**********************************************
	 * FUNCTION TO GET USER'S SAVED JOBS FROM DB  *
	 **********************************************/	
	const getJobs = () => {
		if (user != null) {
			fetch('http://localhost:8000/jobs/user', {		
				// Requires user to be signed in
				headers: {
					'Authorization': 'Bearer ' + user.token 
				}
			})
				.then(jobs => {
					console.log('JOBS RETRIEVED FROM SERVER', jobs)
					return jobs.json()						
				})
				.then(jobs => {
					console.log('this is jobs: ', jobs)
					setJobs(jobs)							
				})
				.catch(error => console.log(error))
		}
	}

	/************************************************
	 * HOOK TO RUN FUNCTIONS WHENEVER USER LOGS IN  *
	 ************************************************/	
	useEffect(() => {
		console.log('i am about to run getProfile')
		getProfile()
		getJobs()
	}, [user])

	/*******************************
	 * RENDER PAGES AND SET ROUTES *
	 *******************************/	
	return (
		<Fragment>
			<Header user={user} currentProfile={currentProfile} />
			<Routes>
				<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
				<Route
					path='/sign-up'
					element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-in'
					element={<SignIn msgAlert={msgAlert} setUser={setUser} getProfile={getProfile}/>}
				/>
				<Route
					path='/sign-out'
					element={
						<RequireAuth user={user}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} setCurrentProfile={setCurrentProfile} />
						</RequireAuth>
					}
				/>
				<Route
					path='/change-password'
					element={
						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
				/>
				<Route
					path='/profile'
					element={< Profile user={user} currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} getProfile={getProfile} />}
					
				/>
				<Route
					path='/jobs'
					element={< Jobs user={user} jobs={jobs} getJobs={getJobs} />}
				/>
				<Route
					path='/job/:id'
					element={< JobDetail jobs={jobs} user={user} getJobs={getJobs} />}
				/>
				
			</Routes>
			{msgAlerts.map((msgAlert) => (
				<AutoDismissAlert
					key={msgAlert.id}
					heading={msgAlert.heading}
					variant={msgAlert.variant}
					message={msgAlert.message}
					id={msgAlert.id}
					deleteAlert={deleteAlert}
				/>
			))}
		</Fragment>
	)
}

export default App
