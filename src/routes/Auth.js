import { fireInterface, authService } from "fireInterface";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChange = (event) => {
        const {target : {name, value}} = event;

        if (name === 'email') {
            setEmail(value);
        }

        else if (name === 'password') {
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        await authService.signInWithEmailAndPassword(email, password);
    }

    const onSocialClick = async (event) => {
        const { target: { name }} = event;

        let provider;

        if (name === 'google') {
            provider = new fireInterface.auth.GoogleAuthProvider();
        }

        else if (name === 'git') {
            provider = new fireInterface.auth.GithubAuthProvider();
        }

        await authService.signInWithPopup(provider);
    }

    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <form onSubmit={onSubmit} className="container">
                <input name="email" className="authInput" type="email" placeholder="Email" value={email} required onChange={onChange} />
                <input name="password" className="authInput" type="password" placeholder="PassWord" value={password} required onChange={onChange} />
                <input type="submit" className="authInput authSubmit" value="Sign in" />
            </form>

            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button onClick={onSocialClick} name="git" className="authBtn">
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    )
};

export default Auth;