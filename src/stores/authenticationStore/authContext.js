import React, { useContext, useState, useEffect } from "react";
import authService from "../../services/auth.service";

const AuthContext = React.createContext();

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("AuthContext must be used within an AuthProvider.");
    }
    return context;
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        initAuth();
    }, []);

    const initAuth = async () => {
        if (isUserAuthenticated()) {
            authService.refreshToken();

            !currentUser?.id && setCurrentUser(await getUser());
        }
    };

    const register = (email, password) => {
        return authService.register({ email, password });
    };

    const activateAccount = (accountActivationToken) => {
        return authService.activateAccount({ token: accountActivationToken });
    };

    const login = async (email, password) => {
        const { user } = await authService.login({ email, password });
        setCurrentUser(user);
    };

    const logout = async () => {
        await authService.logout({ userId: currentUser.id });
        setCurrentUser(null);
    };

    const initPasswordReset = (email) => {
        return authService.initPasswordReset({ email });
    };

    const resetPassword = (email, passwordResetToken) => {
        return authService.resetPassword({ email, token: passwordResetToken });
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

    const isUserAuthenticated = () => {
        authService.isUserAuthenticated();
    };

    const value = {
        currentUser,
        setCurrentUser,
        register,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        activateAccount,
        initPasswordReset,
        initEmailUpdate,
        getUser,
        isUserAuthenticated,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
