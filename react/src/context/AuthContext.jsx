import { createContext, useContext, useEffect, useState } from 'react';
import apiClient from '../utils/axios/apiClient';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from './SnackbarContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const showSnackbar = useSnackbar();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const checkAuth = async () => {
        try {
            const response = await apiClient.get('/api/user');
            setUser(response.data);
        } catch (err) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (credentials) => {
        const from = location.state?.from?.pathname || '/';
        try {
            const response = await apiClient.post('/api/login_check', credentials);
            setUser(response.data.user);
            navigate(from, { replace: true });
        } catch (error) {
            setUser(null);
            setError((error.response?.status || 'Error') + ' Login failed');
            const message = 'Login failed';
            showSnackbar(message, 'error'); 
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            await apiClient.post('/api/logout');
            navigate('/login', { replace: true } );
        } catch (error) {
            setError(error);
            console.error("Błąd podczas wylogowywania:", error);
        } finally {
            setUser(null);
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, logout, login, isLoading, setIsLoading, error }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
