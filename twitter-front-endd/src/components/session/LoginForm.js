import React from 'react';
import { apiBaseUrl } from '../../config';
import UserContext from '../../contexts/UserContext';

const LoginFormWithContext = (props) => {


    return (
        <UserContext.Consumer>
            { value => <LoginForm value={value} {...props} />}
        </UserContext.Consumer>
    )

}


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        // TODO: Set up default state
        this.state = {
            email: '',
            password: ''
        }
    }

    // updateEmail = (e) => {
    //     this.setState({ email: e.target.value });
    // }

    // updatePassword = (e) => {
    //     this.setState({ password: e.target.value });
    // }

    update = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    loginUser = async (e) => {
        e.preventDefault()

        const { email, password } = this.state

        try {

            const response = await fetch(`${apiBaseUrl}/users/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            if (!response.ok) {
                throw response
            }

            const { token, user: { id } } = await response.json()
            console.log("resData: ", token, id);
            this.props.value.login(token, id)
        } catch (e) {
            console.error(e)
        }
    }

    render() {

        // const { email, password } = this.state

        return (
            <form onSubmit={this.loginUser}>
                <h2>Log In</h2>
                <br />
                <label>Email</label>
                <br />
                <input
                    type='email'
                    onChange={this.update}
                    value={this.state.email}
                    name='email'
                />
                <br />
                <label>Password</label>
                <br />
                <input
                    type='password'
                    onChange={this.update}
                    value={this.state.password}
                    name='password'
                />
                <br />
                <button type='submit'>Submit</button>
            </form>
        );
    }
};

export default LoginFormWithContext;