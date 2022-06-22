import { fireInterface, authService } from "fireInterface";
import React, { useState } from "react";

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

        const popup = await authService.signInWithPopup(provider);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" value={email} required onChange={onChange} />
                <input name="password" type="password" placeholder="PassWord" value={password} required onChange={onChange} />
                <input type="submit" value="Sign in" />
            </form>

            <>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="git" onClick={onSocialClick}>Continue with Github</button>
            </>
        </>
    )
};

export default Auth;