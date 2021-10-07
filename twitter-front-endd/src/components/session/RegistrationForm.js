import React from 'react';
import {apiBaseUrl} from '../../config.js'
import UserContext from '../../contexts/UserContext'

// class RegistrationFormWithContext extends React.Component {

// }

const RegistrationFormWithContext = (props) => {
    

    
    return (
        <UserContext.Consumer>
            {value => <RegistrationForm value={value} {...props} />}
        </UserContext.Consumer>
    )
}

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        // TODO: Set up default state

        console.log("Deez the PROPS: ", props)
        this.state = {
            username: '',
            email: '',
            password: ''
        };
    }

    updateUsername = (e) => {
        this.setState({ username: e.target.value });
    }

    updateEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    updatePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    registerUser = async (e) => {
        e.preventDefault()

        const { username, email, password } = this.state

        try {

            const response = await fetch(`${apiBaseUrl}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, email, password})
            })

            if (!response.ok) {
                throw response
            }

            const {token, user: {id}} = await response.json()
            console.log("resData: ", token, id);
            this.props.value.updateContext(token, id)
        } catch (e) {
            console.error(e)
        }
    }

    render() {
        // TODO: Render registration form

        const {username, email, password} = this.state

        return (
            <form onSubmit={this.registerUser}>
                <h2>Register</h2>
                <label>UserName</label>
                <br/>
                <input
                    type='text'
                    onChange={this.updateUsername}
                    value={username}
                />
                <br/>
                <label>Email</label>
                <br />
                <input
                    type='email'
                    onChange={this.updateEmail}
                    value={email}
                />
                <br/>
                <label>Password</label>
                <br />
                <input
                    type='password'
                    onChange={this.updatePassword}
                    value={password}
                />
                <br/>
                <button type='submit'>Submit</button>
            </form>
        );
    }
}

export default RegistrationFormWithContext;