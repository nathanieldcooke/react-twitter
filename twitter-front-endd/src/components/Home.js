import React from 'react';
import { apiBaseUrl } from '../config';
import UserContext from '../contexts/UserContext';

class Home extends React.Component {
    constructor(props) {
        super(props);
        // TODO: Set up default state
        this.state = {
            tweets: []
        }
    }

    static contextType = UserContext;

    async fetchTweets() {
        console.log('fetching', this.context.authToken)
        const res = await fetch(`${apiBaseUrl}/tweets`, {
            headers: {
                Authorization: `Bearer ${this.context.authToken}`,
            },
        });

        return await res.json()
    }

    async componentDidMount() {
        // TODO: Fetch tweets
        console.log("Home Context", this.context)

        const tweets = await this.fetchTweets()
        console.log("Tweets: ", tweets)
        this.setState({ tweets: tweets.tweets })

    }

    logoutFunc(e) {
        // e.preventDefault()
        this.context.logout()
    }

    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <button
                    onClick={() => this.logoutFunc.bind(this)()}
                >Logout</button>
                <ul>
                    {this.state.tweets?.map((tweet) => {
                        const { id, message, user: { username } } = tweet;
                        return (
                            <li key={id}>
                                <h3>{username}</h3>
                                <p>{message}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
};

export default Home;