import React, { useState, useEffect } from 'react';
import Task from './Task';



function Profile(props) {    

    const [newProfile, setNewProfile] = useState({
        name: '',
        skills: [],
        zipCode: '',
        interviewQuestions: {},
        owner: props.user._id
    })
    const [edit, setEdit] = useState(false)

    const editProfile = (e) => {
        setEdit(true)
    }
    const handleChange = (e) => {
        setNewProfile({...newProfile, [e.target.name]: e.target.value})
    }

    const handleEdit = (e) => {
        e.preventDefault()
        // console.log('this is currentProfile.owner: ', props.currentProfile.owner)
        // console.log('this is user._id: ', props.user._id)
        let preJSONBody = {
            name: newProfile.name,
            skills: newProfile.skills,
            zipCode: newProfile.zipCode,
            interviewQuestions: newProfile.interviewQuestions,
            owner: props.currentProfile.owner
        }
        fetch(`http://localhost:8000/profiles/${props.currentProfile._id}`, {
            method: 'PATCH',
            body: JSON.stringify(preJSONBody),
            headers: { 'Content-Type': 'application/JSON', 'Authorization': 'Bearer ' + props.user.token }
        })
        .then(() => {
            console.log('is this hitting?')
            setNewProfile({
                name: '',
                skills: [],
                zipCode: '',
                interviewQuestions: {},
                owner: props.user._id
            })
            setEdit(false)
            props.getProfile()
        })
        .catch(error => { console.log(error) })
    }
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
    let display 
    if (props.currentProfile.length === 0) {
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
    } else {
        if (edit === false){
            display = (
                <div>
                    <h1>profile</h1>
                    <h2>{props.currentProfile.name}</h2>
                    <h3>{props.currentProfile.skills.join(", ")}</h3>
                    <h3>{props.currentProfile.zipCode}</h3>
                    <h3>{props.currentProfile.interviewQuestions}</h3>
                    <button onClick={editProfile}>Edit Profile</button>
                </div>
            )
        } else {
        
            display = (
                <form onSubmit={handleEdit} >
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