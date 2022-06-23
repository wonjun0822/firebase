import { dbService, storageService } from "fireInterface";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet = ({ tweet }) => {
    const [editTweet, setEditTweet] = useState(tweet.text);
    const [edting, setEdting] = useState(false);

    const onDeleteClick = () => {
        if (window.confirm('Are you sure you want to delete this tweet?')) {
            dbService.doc(`Tweets/${tweet.id}`).delete();
            storageService.refFromURL(tweet.fileUrl).delete();
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
        <div className="nweet">
            {edting ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input type="text" className="formInput" value={editTweet} onChange={onChange} required autoFocus />
                        <input type="submit" className="formBtn" value="Update" />
                    </form>
                    <button className="formBtn cancelBtn" onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{tweet.text}</h4>
                    {tweet.fileUrl && <img src={tweet.fileUrl} alt="" />}
                    <div className="nweet__actions">
                        <span onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash} /></span>
                        <span onClick={toggleEditing}><FontAwesomeIcon icon={faPencilAlt} /></span>
                    </div>
                </>
            )}
        </div>
    )
};

export default Tweet;