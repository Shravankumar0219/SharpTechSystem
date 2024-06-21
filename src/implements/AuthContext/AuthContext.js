// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token) {
            setIsAuthenticated(true);
            setIsAdmin(role === 'ADMIN');
        }
    }, []);

    const verifylogin = (token, role, transactionId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('transactionId', transactionId);
    //    localStorage.setItem('email', email);  Store email in local storage Storin the emil in the Login
        setIsAuthenticated(true);
        setIsAdmin(role === 'ADMIN');
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email'); // Ensure email is also removed
        localStorage.removeItem('transactionId');
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, verifylogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
