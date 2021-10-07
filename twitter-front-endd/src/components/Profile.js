import React from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../config';
import UserContext from '../contexts/UserContext';

const ProfileWrapper = (props) => {
    const { userId } = useParams();

    return (
        <UserContext.Consumer>
            {value => <Profile value={value} {...props} userId={userId}/>}
        </UserContext.Consumer>
    )
} 

class Profile extends React.Component {

    
    constructor(props) {
        super(props);
        // TODO: Set up default state
        this.state = {
            tweets: [],
            users: {}
        }
    }

    async fetchUser() {
        // const { userId } = useParams()

        const user = await fetch(`${apiBaseUrl}/users/${this.props.userId}`, {
            headers: {
                Authorization: `Bearer ${this.props.value.authToken}`,
            },
        })

        console.log('User: ', user)

        const userData = await user.json()

        console.log("UserData: ", userData)

    }

    async fetchUserTweets () {
        const tweets = await fetch(`${apiBaseUrl}/users/${this.props.userId}/tweets`, {
            headers: {
                Authorization: `Bearer ${this.props.value.authToken}`,
            },
        })

        const tweetsData = await tweets.json()

        console.log("Teets Data User: ", tweetsData)
    }
    
    async componentDidMount() {

        console.log('Profile Props: ', this.props)
        // TODO: Fetch user and their tweets
        
        // fetch the user 
        this.fetchUser()

        // fetch the 
        this.fetchUserTweets()
    }

    render() {
        return (
            <h1>Profile Page</h1>
        );
    }
};

export default ProfileWrapper;