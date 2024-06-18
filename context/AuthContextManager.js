import React, { useEffect } from 'react'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Create a context; these context variables are accessible within every component.
const AuthContext = React.createContext({
    user: null,
    login: () => { },
    logout: () => { },
});


const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState({})

    const unAuthorizedUser = {
        user_id: '',
        firstName: '',
        lastName: '',
        email: '',
        accountType: ''
    }

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('JWT_Token');
            if (token) {
                return token
            }
        } catch (e) {
            console.log("cant getToken from secure storage")
        }
    };

    const removeToken = async () => {
        try {
            await AsyncStorage.removeItem('JWT_Token')
        } catch (e) {
            console.log("cant remove from secure storage")
        }

    }

    const storeToken = async (token) => {
        try {
            await AsyncStorage.setItem('JWT_Token', token);
        } catch (e) {
            console.error(e)
        }
    };

    useEffect(() => {
        (async function () {
            try {
                const token = await getToken()
                const response = await axios.get('http://10.0.2.2:3000/users/validate', {
                    headers: { "Authorization": `Bearer ${token}` }
                })

                setAuthUser(response.data)
                console.log(response.data)

            } catch (e) {
                console.error("cant validate token")
            }
        })()

    }, [])

    // Set user data when they login
    const login = (user, token) => {
        if (user && token) {
            setAuthUser(user)
            storeToken(token)
        }
    }

    // Reset user data when they logout
    const logout = () => {
        setAuthUser(null)
        removeToken()
        console.log("logout successfully!")
    }

    return (
        <AuthContext.Provider value={{ authUser, login, logout, }}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext, AuthProvider };