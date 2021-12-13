import userEvent from '@testing-library/user-event';
import React, { useState, useEffect } from 'react';


function Profile (props) {
    // for(let i=0; i<5; i++) {
    //     //most recent 5 due dates compared to Date()
    // }
    return (
        <div>
            <h1>Profile Page</h1>
            {/* Tasks, user info, last saved job
            Tasks stored in state
             user info passed as a prop from app.js
             last saved job passed as a prop from */}
             <h2> props.user.name</h2>
             <ul>
                 <li>props.user.location</li>
                 <li>props.user.techStack</li>
             </ul>
            <p>prop.lastEnteredJob</p>
            <ul>

            </ul>

        </div>
    )
}
export default Profile