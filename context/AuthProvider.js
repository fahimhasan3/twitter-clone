import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: (email, password) => {
                    // communicate with backedn and store token in secureStore
                    setUser('Andre');
                },
                logout: () => {
                    setUser(null);
                }
            }}>
            {children}
        </AuthContext.Provider>
    );
}