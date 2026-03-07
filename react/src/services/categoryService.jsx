import apiClient from "../utils/axios/apiClient";

export const fetchCategories = async (setCategories, setIsLoadingCategories, showSnackbar) => {
    try {
        setIsLoadingCategories(true);
        const response = await apiClient.get('/api/categories', {
            headers: {
                'Accept': 'application/ld+json'
            }
        });
        const data = response.data.member;
        setCategories(data);
    } catch (error) {
        console.error('Fetch categories error:', error);
        const errorMsg = error.response?.data?.['hydra:description'] || 'Failed to load categories';
        showSnackbar(errorMsg, 'error');
        setCategories([]);
    } finally {
        setIsLoadingCategories(false);
    }
}

export const addCategory = async (values, resetForm, showSnackbar, setIsLoading, refreshCategories, handleClose ) => {
    try {
        setIsLoading(true);
        const response = await apiClient.post(
            '/api/categories/add',
            { name: values.name.trim() },
            { 
                headers: { 
                    'Content-Type': 'application/ld+json', 
                    'Accept': 'application/ld+json' 
                } 
            }
        );
        refreshCategories();
        setIsLoading(false);
        handleClose();
        resetForm();
        showSnackbar('Category added successfully!', 'success');
    } catch (error) {
        const errorData = error.response?.data;
        let errorMessage = 'Server error';
        if (error.response?.status === 422) {
            errorMessage = errorData?.['hydra:description'] || errorData?.detail || 'Validation error';
        } else {
            errorMessage = error.message;
        }
        console.error('API Error:', error.response?.status, errorData);
        showSnackbar('Error adding category: ' + errorMessage, 'error');
        setIsLoading(false);
    }
}

export const deleteCategories = async (selectedCategories, setSelectedCategories, setIsLoading, refreshCategories, showSnackbar) => {
    try {
        setIsLoading(true);
        const deletePromises = selectedCategories.map(id => 
            apiClient.delete(`/api/categories/delete/${id}`, {
        })
        );
        await Promise.all(deletePromises);
        showSnackbar('Category deleted successfully', 'success');
        setSelectedCategories([]);
        refreshCategories();
    } catch (error) {
        showSnackbar('Delete error: ' + (error.response?.data?.detail || error.message), 'error');
        refreshCategories();
    }
    finally {
        setIsLoading(false);
    }
}

export const editCategory = async (categoryId, newName, setIsLoading, refreshCategories, handleClose, showSnackbar) => {
    try {
        setIsLoading(true);
        const response = await apiClient.patch(`/api/categories/${categoryId}/name`, {
            name: newName.trim(),
            headers: {
                'Content-Type': 'application/merge-patch+json',
            },
        });
        refreshCategories();
        showSnackbar('Category name updated successfully', 'success');
        handleClose();
    } catch (err) {
        showSnackbar('Error updating category name: ' + (err.response?.data?.detail || err.message), 'error');
        refreshCategories();
        handleClose();
    }
    finally {
        setIsLoading(false);
    }
}