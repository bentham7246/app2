import React from 'react';
import {useHistory} from 'react-router-dom'
import './dashboard.css'

function Dashboard(props) {
    const history=  useHistory()
    const handleLogout = ()=>{
        localStorage.removeItem('bi_token');
        localStorage.removeItem('bi_user');
        return history.push('/')
    }


    return (
        <div>
            <header className="embed-container  shadow header">
                <p className="col-lg-6 col-md-6 col-sm-6">
                    Power BI Embedded Sample
                </p>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <p className='userName'>{localStorage.getItem('bi_user')}</p>
                    <button className='logoutBtn' onClick={handleLogout}>Logout</button>
                </div>
            </header>
            <section id="text-container" className="embed-container col-lg-4 col-md-4 col-sm-4 mb-5 ml-5 mt-5">
                <div>
                    <p>  Embedded Report  </p>
                    <p> <button type="button" id="toggleEdit" >Toggle Edit Mode</button></p>
                    <p> <button type="button" id="logEvents" >Start Event Logging</button></p>
                    <p> <button type="button" id="logEventsStop" >Stop Event Logging</button></p>
                    <p> <button type="button" id="changetheme" >Change Theme</button></p>
                </div>

                <div id="dataSelectedContainer" className=""> </div>

            </section>
        </div>
    );
}

export default Dashboard; 