/**
 * TODOS:
 * - Save toke and user data check auth here
 */

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
    try {
      return authService.register();
    } catch (error) {}
  };

  const login = async (email, password) => {
    try {
      return authService.register();
    } catch (error) {}
  };

  const logout = async () => {
    try {
      return authService.register();
    } catch (error) {}
  };

  const resetPassword = async (email) => {
    try {
      return authService.register();
    } catch (error) {}
  };

  const updateEmail = async (email) => {
    try {
      return authService.register();
    } catch (error) {}
  };

  const updatePassword = async (password) => {
    try {
      return authService.register();
    } catch (error) {}
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default { AuthProvider, useAuth };
