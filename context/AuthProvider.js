import React, { createContext, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import axiosConfig from '../helpers/axiosConfig'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    axiosConfig

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                error,
                isLoading,
                login: (email, password) => {
                    setIsLoading(true);
                    axiosConfig.post('/login', {
                        email,
                        password,
                        device_name: 'mobile'
                    })
                        .then((response) => {
                            const { user: responseUser, token } = response.data;
                            const newUser = {
                                token: token,
                                id: responseUser.id,
                                name: responseUser.name,
                                username: responseUser.username,
                                email: responseUser.email,
                                avatar: responseUser.avatar
                            };
                            setUser(newUser);
                            setError(null);
                            SecureStore.setItemAsync('user', JSON.stringify(newUser));
                        }).catch(error => {
                            const key = Object.keys(error.response.data.errors)[0];
                            setError(error.response.data.errors[key][0]);
                        }).finally(() => {
                            setIsLoading(false);
                        });

                },
                logout: () => {
                    setIsLoading(true);
                    axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
                    axiosConfig.post('/logout')
                        .then((response) => {
                            setError(null);
                        }).catch(error => {
                            setError(error.response.data.message);
                            console.log(error.response);
                        }).finally(() => {
                            setIsLoading(false);
                            setUser(null);
                            SecureStore.deleteItemAsync('user');
                        });
                }
            }}>
            {children}
        </AuthContext.Provider>
    );
}