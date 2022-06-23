import { authService } from "fireInterface";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default ({ refreshUser, user }) => {
    const [name, setName] = useState(user.displayName ?? '');

    const history = useNavigate();

    const onLogOut = () => {
        authService.signOut();

        history('/');
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        if (user.displayName !== name) {
            await user.updateProfile({
                displayName: name
            });

            refreshUser();
        }
    };

    const onChangeName = (event) => {
        const { target: { value } } = event;

        setName(value);
    }

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input type="text" className="formInput" placeholder="Display Name" value={name} onChange={onChangeName} autoFocus />
                <input type="submit" className="formBtn" value="Update Profile" style={{ marginTop: 10 }} />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOut}>
                Log Out
            </span>
        </div>
    )
};