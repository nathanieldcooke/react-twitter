import React from "react";
import App from "./App";
import UserContext from "./contexts/UserContext";

class AppWithContext extends React.Component {
    constructor() {
        super();
        this.state = {
            authToken: localStorage.getItem('authToken') || null,
            currentUserId: localStorage.getItem('currentUserId') || null,
            login: this.login,
            logout: this.logout
        }
    }

    login = (authToken, currentUserId) => {
        this.setState({ authToken, currentUserId }, () => {
            console.log('log', this.state);
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('currentUserId', currentUserId);
        });
    }

    logout = () => {
        this.setState({ authToken: null, currentUserId: null }, () => {
            console.log('logout', this.state);
            localStorage.setItem('authToken', null);
            localStorage.setItem('currentUserId', null);
        });
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                <App currentUserId={this.state.currentUserId} />
            </UserContext.Provider>
        )
    }
}


export default AppWithContext;