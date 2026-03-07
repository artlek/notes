import apiClient from '../utils/axios/apiClient';

export default async function register(values, setLoading, showSnackbar, resetForm) {
    
    try {
        setLoading(true);
        const credentials = {
            "name": values.name,
            "email": values.email,
            "password": values.password
        };
        const options = {
            headers: {
                'Content-Type': 'application/ld+json',
            }
        };
        const response = await apiClient.post("/api/register", credentials, options);
        showSnackbar(response.data.email + ' account was registered. Now you can log in.', 'success');
        resetForm();
    } catch (error) {
        console.error('Registration failed:', error.response.data?.detail || error.message);
        showSnackbar('Registration failed: '+ error.response.data?.detail || error.message, 'error');
    }
    finally {
        setLoading(false);
    }
}