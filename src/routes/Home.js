import { dbService, storageService } from "fireInterface";
import React, { useEffect, useState } from "react";
import Tweet from "components/Tweet";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const Home = ({ user }) => {
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);
    const [file, setFile] = useState(null);

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

        let fileUrl = '';

        if (file != null) {
            const fileRef = storageService.ref().child(`${user.uid}/${uuidv4()}`);
            const response = await fileRef.putString(file, "data_url");

            fileUrl = await response.ref.getDownloadURL();
        }

        await dbService.collection('Tweets').add({
            text: tweet,
            fileUrl: fileUrl,
            createDt: Date.now(),
            createId: user.uid
        });

        setTweet('');
        setFile(null);
    };

    const onChange = (event) => {
        const { target: { value } } = event;

        setTweet(value);
    };

    const onFileChange = (event) => {
        const { target: { files } } = event;

        const reader = new FileReader();

        reader.onloadend = (e) => {
            setFile(e.currentTarget.result);
        };

        reader.readAsDataURL(files[0]);
    };

    const onClearFile = () => setFile(null);

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="factoryForm">
                <div className="factoryInput__container">
                    <input type="text" className="factoryInput__input" placeholder="What's on your mind?" value={tweet} onChange={onChange} maxLength={120} />
                    <input type="submit" className="factoryInput__arrow" value="&rarr;" />
                </div>

                <label htmlFor="attach-file" className="factoryInput__label">
                    <span>Add photos</span>
                    <FontAwesomeIcon icon={faPlus} />
                </label>
                <input
                    id="attach-file"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    style={{
                      opacity: 0,
                    }}
                />
                {file && (
                    <div className="factoryForm__attachment">
                        <img src={file} alt="" style={{ backgroundImage: file }} />
                        <div className="factoryForm__clear" onClick={onClearFile}>
                            <span>Remove</span>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div>
                )}
            </form>

            <div style={{ marginTop: 30 }}>
                {tweets.map(tweet => (
                    <Tweet key={tweet.id} tweet={tweet} />
                ))}
            </div>
        </div>
    )
};

export default Home;