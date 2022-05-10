import React, { useState, createContext } from 'react';
import { RestFulApi } from '../apis/api';
import { setCookie, deleteCookie } from '../utils/functions';
import Message from '../utils/message/message';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [currentUserData, setCurrentUserData] = useState(null)
    const [currentUserId, setCurrentUserId] = useState(null)
    const [user, setUser] = useState([])
    const [catchError, setCatchError] = useState({})



    function get_current_user_data() {
        return currentUserData;
    }

    function get_current_user_id() {
        return currentUserId;
    }



    function is_user_logged_in() {
        if (currentUserId) {
            return true;
        } else {
            return false;
        }
    }

    function is_user_logged_in() {
        if (currentUserId) {
            return true;
        } else {
            return false;
        }
    }


    function is_authentication_required(authentication_required) {
        if (authentication_required) {
            return authentication_required;
        }
        return false;
    }

    function check_for_authentication_requirement(authentication_required = false) {
        if (is_authentication_required(authentication_required) && !is_user_logged_in()) {
            window.location.replace('https://kikiq.ir/')
        }
    }



    function clear_user_cookie() {
        deleteCookie("last_access")
        deleteCookie("user_id")
        deleteCookie("username")
        deleteCookie("password")
    }


    function user_logout() {
        setCurrentUserData(null);
        setCurrentUserId(null);
        localStorage.removeItem("currentUserId");
        localStorage.removeItem("currentUserData");
        clear_user_cookie();
    }



    function user_login(username, password) {
        user_logout()
        // let func = "get_user2"
        let res = RestFulApi(`https://apis.kikiq.ir/api.php?fn=get_user2&arg1=${username}`)

        res.then(function (value) {
            setUser(value)
        });
        res.catch(function (reason) {
            // <Message>The server is not currently responsive!</Message>
            // <Message clas="error">{reason}</Message>
            setCatchError(reason)
            // console.log("reason: ",  reason)
        })

        if (!user) {
            return;
        }

        if (password != user['password']) {
            return;
        }

        setCurrentUserData(user);
        setCurrentUserId(user['id']);
        window.localStorage.setItem("currentUserId", currentUserId)
        window.localStorage.setItem("currentUserData", JSON.stringify(currentUserData))

        let d = new Date();
        let now = d.toUTCString()
        setCookie('last_access', now, 15)
        setCookie('user_id', currentUserId, 15)
        setCookie('username', user['username'], 15)
        setCookie('password', user['password'], 15)
    }


    return (
        <AuthContext.Provider value={{
            ...props,
            currentUserData,
            currentUserId,
            setCurrentUserData,
            setCurrentUserId,
            catchError,
            get_current_user_data,
            get_current_user_id,
            is_authentication_required,
            checkAuthentication: check_for_authentication_requirement,
            is_user_logged_in,
            login: user_login,
            logout: user_logout
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
