import React, { useState, useEffect } from 'react';
import Task from './Task';



function Profile(props) {    

    /**************************************
	 * DEFINE NEW PROFILE AND EDIT STATES *
	 **************************************/	
    const [newProfile, setNewProfile] = useState({
        name: '',
        skills: [],
        zipCode: '',
        interviewQuestions: {},
        owner: props.user._id
    })
    const [edit, setEdit] = useState(false)

    /*********************
	 * HELPER FUNCTIONS  *
	 *********************/	

    const editProfile = (e) => {
        setEdit(true)                       // Set edit state to true on click
    }
    
    const handleChange = (e) => {
        setNewProfile({...newProfile, [e.target.name]: e.target.value}) // Set values in new profile state to entries
        props.setCurrentProfile({...props.currentProfile, [e.target.name]: e.target.value})
    }
    /*********************************
	 * FUNCTION TO SET EDIT PROFILE  *
	 *********************************/	
    const handleEdit = (e) => {
        e.preventDefault()                                      // Prevent refresh
        // console.log('this is currentProfile.owner: ', props.currentProfile.owner)
        // console.log('this is user._id: ', props.user._id)
        let preJSONBody = {                         // Send data to the API in this object form
            name: props.currentProfile.name,
            skills: props.currentProfile.skills,
            zipCode: props.currentProfile.zipCode,
            interviewQuestions: props.currentProfile.interviewQuestions,
            owner: props.currentProfile.owner      // Assigns a user to profile
        }
        fetch(`http://localhost:8000/profiles/${props.currentProfile._id}`, {       // Fetch request to update profile
            method: 'PATCH',
            body: JSON.stringify(preJSONBody),
            headers: { 'Content-Type': 'application/JSON', 'Authorization': 'Bearer ' + props.user.token }
        })
        .then(() => {
            console.log('is this hitting?')
            setNewProfile({             // Reset profile state to empty state
                name: '',
                skills: [],
                zipCode: '',
                interviewQuestions: {},
                owner: props.user._id
            })
            setEdit(false)             // Set edit to false so edit form no longer shows
            props.getProfile()        // Call getProfile function to show info
        })
        .catch(error => { console.log(error) })
    }
    /*************************************
	 * FUNCTION TO CREATE FIRST PROFILE  *
	 *************************************/	
    const handleSubmit = (e) => {       
        e.preventDefault()
        let preJSONBody = {
            name: newProfile.name,
            skills: newProfile.skills,
            zipCode: newProfile.zipCode,
            interviewQuestions: newProfile.interviewQuestions,
            owner: newProfile.owner
        }
        fetch('http://localhost:8000/profiles', {
            method: 'POST',
            body: JSON.stringify(preJSONBody),
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then(response => response.json())
        .then(() => {
            setNewProfile({
                name: '',
                skills: [],
                zipCode: '',
                interviewQuestions: {},
                owner: props.user._id
            })
            props.getProfile()
        })
        .catch(error => { console.log(error) })
    }
   /***********************
	 * PROFILE INFO FORMS  *
	 ***********************/	
    let display 
    // If check to see if a profile exists
    // If doesn't exist, show form upon first login
    if (props.currentProfile === undefined) {
        display = (
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="name">Name</label>
                    <input onChange={handleChange} type="text" name="name" id="name" value={newProfile.name} />
                </div>
                <div>
                    <label htmlFor="skills">Skills</label>
                    <input onChange={handleChange} type="text" name="skills" id="skills" value={newProfile.skills} />
                </div>
                <div>
                    <label htmlFor="zipCode">Zip Code</label>
                    <input onChange={handleChange} type="text" name="zipCode" id="zipCode" value={newProfile.zipCode} />
                </div>
                <input type="submit" value="submit" />
            </form>
        )
    } 
    // If profile exists, check if edit state is false
        else {     
        // If edit state false, show profile info otherwise show form            
        if (edit === false){    
            display = (
                <div>
                    <h1>profile</h1>
                    <h2>{props.currentProfile.name}</h2>
                    <h3>{props.currentProfile.skills}</h3>
                    <h3>{props.currentProfile.zipCode}</h3>
                    <h3>{props.currentProfile.interviewQuestions}</h3>
                    <button onClick={editProfile}>Edit Profile</button>
                </div>
            )
        } else {            
        
            display = (
                <form onSubmit={handleEdit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input onChange={handleChange} type="text" name="name" id="name" value={props.currentProfile.name}/>
                    </div>
                    <div>
                        <label htmlFor="skills">Skills</label>
                        <input onChange={handleChange} type="text" name="skills" id="skills" value={props.currentProfile.skills} />
                    </div>
                    <div>
                        <label htmlFor="zipCode">Zip Code</label>
                        <input onChange={handleChange} type="text" minLength="5" maxLength="5" name="zipCode" id="zipCode" value={props.currentProfile.zipCode} />
                    </div>
                    <input type="submit" value="submit" />
                </form>)
        }
    }

    // START OF EDIT 
    // useEffect(() => {
    //     setNewProfile({
    //         name: 
    //     })
    // })
    
    //map(dueDate) function {
    // for all due dates, pick the closest 5
    // query dates.sort
    // return first 5
    /* 
    */
    //}

 /*let content;

    if (profile === null){
        return profile creation form
        set content = form
    } else {
        return profile
        set content to actual profile
        <h1>Profile Page</h1>

        Tasks, user info, last saved job
        Tasks stored in state
        User info passed as a prop from app.js
        Last saved job passed as a prop from 

        <h2> props.user.name</h2>
        <ul>
            <li>props.user.location</li>
            <li>props.user.techStack</li>
        </ul>
        <p>prop.lastEnteredJob</p>
        <Task />
    }
*/

    return (
        <div>
            {display}
        </div>
    )
}
export default Profile