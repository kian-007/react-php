import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [currentUserData, setCurrentUserData] = useState(null)
    const [currentUserId, setCurrentUserId] = useState(null)



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



    function user_login(id) {
        setCurrentUserId(id)

        // user_logout();
        // $user = get_user($username);

        // if (!$user) {
        //     return;
        // }

        // if (sha1($password) != $user['password']) {
        //     return;
        // }

        // global $current_user;
        // global $current_user_id;
        // $current_user = $user;
        // $current_user_id = $user['id'];


        // $_SESSION['last_access'] = time();
        // $_SESSION['user_id'] = $current_user_id;
        // $_SESSION['username'] = $user['username'];
        // $_SESSION['password'] = $user['password'];
    }


    return (
        <AuthContext.Provider value={{
            ...props,
            currentUserData,
            currentUserId,
            setCurrentUserData,
            setCurrentUserId,
            get_current_user_data,
            get_current_user_id,
            is_authentication_required,
            checkAuthentication: check_for_authentication_requirement,
            is_user_logged_in,
            login: user_login
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
