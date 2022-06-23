import { React } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Home from "routes/Home";
import Profile from "routes/Profile";
import Auth from "routes/Auth";
import Navigation from "components/Navigation";

const AppRouter = ({ refreshUser, isLogin, user }) => {
    return (
        <Router>
            { isLogin && <Navigation user={user} /> }
            <div
                style={{
                    maxWidth: 890,
                    width: "100%",
                    margin: "0 auto",
                    marginTop: 80,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
            <Routes>
                {isLogin ? ( 
                    <>
                        <Route path="/" element={<Home user={user} />} />
                        <Route path="/Profile" element={<Profile refreshUser={refreshUser} user={user} />} />
                    </>
                ) : (
                    <Route path="/" element={<Auth />} />
                )}
            </Routes>
            </div>
        </Router>
    );
};

export default AppRouter;