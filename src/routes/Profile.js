import { authService } from "fireInterface";
import React from "react";
import { useNavigate } from "react-router-dom";

export default () => {
    const history = useNavigate();
    const onLogOut = () => {
        authService.signOut();

        history('/');
    };

    return (
        <>
            <button onClick={onLogOut}>Log Out</button>
        </>
    )
};