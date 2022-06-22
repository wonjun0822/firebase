import { dbService } from "fireInterface";
import React, { useEffect, useState } from "react";
import Tweet from "components/Tweet";

const Home = ({ user }) => {
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        dbService.collection('Tweets').onSnapshot((snapshot) => {
            const array = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setTweets(array);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();

        await dbService.collection('Tweets').add({
            text: tweet,
            createDt: Date.now(),
            createId: user.uid
        });

        setTweet('');
    };

    const onChange = (event) => {
        const { target: { value } } = event;

        setTweet(value);
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="What's on your mind?" value={tweet} onChange={onChange} maxLength={120} />
                <input type="submit" value="Tweet" />
            </form>

            <div>
                {tweets.map(tweet => (
                    <Tweet key={tweet.id} tweet={tweet} />
                ))}
            </div>
        </>
    )
};

export default Home;