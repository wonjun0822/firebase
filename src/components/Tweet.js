import { dbService } from "fireInterface";
import React, { useState } from "react";

const Tweet = ({ tweet }) => {
    const [editTweet, setEditTweet] = useState(tweet.text);
    const [edting, setEdting] = useState(false);

    const onDeleteClick = () => {
        if (window.confirm('Are you sure you want to delete this tweet?')) {
            dbService.doc(`Tweets/${tweet.id}`).delete();
        }
    }

    const toggleEditing = () => {
        setEdting((prev) => !prev);
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        await dbService.doc(`Tweets/${tweet.id}`).update({
            text: editTweet
        });

        setEdting(false);
    }

    const onChange = (event) => {
        const {
            target: { value }
        } = event;

        setEditTweet(value);
    }

    return (
        <div>
            {edting ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" value={editTweet} onChange={onChange} required />
                        <input type="submit" value="Update"/ >
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{tweet.text}</h4>
                    <button onClick={onDeleteClick}>Delete</button>
                    <button onClick={toggleEditing}>Edit</button>
                </>
            )}
        </div>
    )
};

export default Tweet;