/**
 * TODOS:
 * - Save token and user data check auth here
 */
// and it is the auth context will save user data and session and localStorage data

import React, { useContext, useState, useEffect } from "react";
import authService from "../../services/auth.service";

const AuthContext = React.createContext();

function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("AuthContext must be used within an AuthProvider.");
    }
}

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {}, []);

    const signup = async (email, password) => {
        return authService.register({ email, password });
    };

    const activateAccount = (accountActivationToken) => {
        return authService.activateAccount({ token: accountActivationToken });
    };

    const login = async (email, password) => {
        try {
            return authService.login({ email, password });
        } catch (error) {}
    };

    const logout = async () => {
        try {
            return authService.logout({ userId: currentUser.id });
        } catch (error) {}
    };

    const initPasswordReset = (email) => {
        return authService.initPasswordReset({ email });
    };

    const resetPassword = (email, passwordResetToken) => {
        return authService.resetPassword({ email, token: passwordResetToken });
    };

    const refreshToken = async (email) => {
        try {
            return await authService.refreshToken();
        } catch (error) {}
    };

    const updatePassword = (oldPassword, newPassword) => {
        return authService.updatePassword({ userId: currentUser.id, oldPassword, newPassword });
    };

    const initEmailUpdate = (newEmailAddress) => {
        return authService.initEmailUpdate({ userId: currentUser.id, email: newEmailAddress });
    };

    const updateEmail = (emailUpdateToken) => {
        return authService.updateEmail({ token: emailUpdateToken });
    };

    const getUser = (userId) => {
        return authService.getUser(userId);
    };

    const value = {
        currentUser,
        setCurrentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        activateAccount,
        initPasswordReset,
        refreshToken,
        initEmailUpdate,
        getUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const module = { AuthProvider, useAuth };
