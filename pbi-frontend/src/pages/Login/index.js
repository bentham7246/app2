import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './login.css'

function Login(props) {
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data) => {
        if (!email) {
            return setError('email is required!')
        }
        if (!password) {
            return setError('password is required!')
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const body = JSON.stringify({email, password})
        try {
            setLoading(true)
            const res = await axios.post(`/api/v1/users/login` , body, config);
            console.log(res.data.user);
            localStorage.setItem('bi_token', res?.data?.token);
            localStorage.setItem('bi_user', res?.data?.user?.username);
            setLoading(false)
            return history.push('/dashboard')
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
        
        // return
    }

    const handleChange = (e) => {
        e.preventDefault();
        setError('')
        e.target.name === 'email' ? setEmail(e.target.value) : setPassword(e.target.value)

    }

    return (
        <div className="login-form">
            <h1>Login Form</h1>
            <input type="email" name="email" placeholder="example@gmail.com" value={email} required onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={password} required onChange={handleChange} />
            <button disabled={loading} type="submit" onClick={handleSubmit} className='login-form-button'>
                {loading ? 'Loading...': 'Submit'}
            </button>
            {error && <small className='error-text'>*{error}</small>}

        </div>
    );
}

export default Login;