import axios from "axios";

import { toast } from "react-toastify";

import React, { createContext, useEffect, useState } from "react";
import backEndApi from "../utils/constant";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUserInfo = async (token) => {
    try {
      const response = await axios.get(`${backEndApi}/account/profile/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setIsAuthenticated(true);
      setUser(response.data);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };
  // console.log(user, "AuthContext");
  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await loadUserInfo(token);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        `${backEndApi}/account/login/`,
        credentials
      );
      toast.success("Login successful!");
      const { token } = response.data;
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      await loadUserInfo(token);
      window.location.href = "/";
    } catch (error) {
      toast.error("An error occurred during login.");
      console.error("Error logging in:", error);
      setError(
        error.response ? error.response.data : "An error occurred during login."
      );
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${backEndApi}/account/logout/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      setUser(null);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      toast.error("Logout Success.");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // console.log({ user, isAuthenticated });
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
