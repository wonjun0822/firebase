import { React } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Home from "routes/Home";
import Profile from "routes/Profile";
import Auth from "routes/Auth";
import Navigation from "components/Navigation";

const AppRouter = ({ isLogin, user }) => {
    return (
        <Router>
            { isLogin && <Navigation /> }
            <Routes>
                {isLogin ? ( 
                    <>
                        <Route path="/" element={<Home user={user} />} />
                        <Route path="/profile" element={<Profile />} />
                    </>
                ) : (
                    <Route path="/" element={<Auth />} />
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;