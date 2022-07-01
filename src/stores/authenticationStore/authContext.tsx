import React, { useContext, useState, useEffect } from "react";
import authService from "../../services/auth.service";

interface IAuthContext {
    currentUser: I.IUser | undefined;
    register: (email: string, password: string) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
    resetPassword: (email: string, passwordResetToken: string) => void;
    updateEmail: (emailUpdateToken: string) => void;
    updatePassword: (oldPassword: string, newPassword: string) => void;
    activateAccount: (accountActivationToken: string) => void;
    initPasswordReset: (email: string) => void;
    initEmailUpdate: (newEmailAddress: string) => void;
    getUser: (userId: string) => Promise<I.IUser>;
    isUserAuthenticated: () => boolean;
}

const AuthContext = React.createContext({} as IAuthContext);

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("AuthContext must be used within an AuthProvider.");
    }
    return context;
}

// eslint-disable-next-line max-lines-per-function
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<I.IUser>();

    useEffect(() => {
        initAuth();
    }, []);

    const initAuth = async () => {
        try {
            if (isUserAuthenticated()) {
                // useless now but kept for semantic
                const { member } = await authService.refreshToken();
                return !currentUser?.id && setCurrentUser(await getUser(member?.id));
            }

            currentUser?.id && setCurrentUser(undefined);
        } catch (error) {}
    };

    const register = (email: string, password: string) => {
        return authService.register({ email, password });
    };

    const activateAccount = (accountActivationToken: string) => {
        return authService.activateAccount({ token: accountActivationToken });
    };

    const login = async (email: string, password: string) => {
        const { user } = await authService.login({ email, password });
        setCurrentUser(user);
    };

    const logout = async () => {
        await authService.logout({ userId: currentUser!.id });
        setCurrentUser(undefined);
    };

    const initPasswordReset = (email: string) => {
        return authService.initPasswordReset({ email });
    };

    const resetPassword = (email: string, passwordResetToken: string) => {
        return authService.resetPassword({ email, token: passwordResetToken });
    };

    const updatePassword = (oldPassword: string, newPassword: string) => {
        return authService.updatePassword({ userId: currentUser!.id, oldPassword, newPassword });
    };

    const initEmailUpdate = (newEmailAddress: string) => {
        return authService.initEmailUpdate({ userId: currentUser!.id, email: newEmailAddress });
    };

    const updateEmail = (emailUpdateToken: string) => {
        return authService.updateEmail({ token: emailUpdateToken });
    };

    const getUser = (userId: string) => {
        return authService.getUser(userId);
    };

    const isUserAuthenticated = () => {
        return authService.isUserAuthenticated();
    };

    const value: IAuthContext = {
        currentUser,
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
        isUserAuthenticated
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
