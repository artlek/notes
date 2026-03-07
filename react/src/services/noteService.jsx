import apiClient from "../utils/axios/apiClient";

export const fetchNotes = async (setNotes, setLoadingNote, showSnackbar) => {
    try {
        setLoadingNote(true);
        const response = await apiClient.get('/api/notes', {
            headers: {
                'Accept': 'application/ld+json'
            }
        });
        const data = response.data.member;
        setNotes(data);
    } catch (error) {
        console.error('Fetch notes error:', error);
        const errorMsg = error.response?.data?.['hydra:description'] || 'Failed to load notes';
        showSnackbar(errorMsg, 'error');
        setNotes([]);
    } finally {
        setLoadingNote(false);
    }
}

export const fetchNote = async (id, setNote, setIsLoading, showSnackbar) => {
    try {
        setIsLoading(true);
        const response = await apiClient.get(`/api/notes/${id}`, {
            headers: {
                'Accept': 'application/ld+json'
            }
        });
        const data = response.data;
        setNote(data);
    } catch (error) {
        console.error('Fetch note error:', error);
        const errorMsg = error.response?.data?.['hydra:description'] || 'Failed to load note';
        showSnackbar(errorMsg, 'error');
        setNote(null);
    } finally {
        setIsLoading(false);
    }
}

export const addNote = async (values, resetForm, showSnackbar, setIsLoading, refreshNotes, handleClose) => {
    try {
        setIsLoading(true);
        const response = await apiClient.post(
            '/api/notes/add',
            values,
            { 
                headers: { 
                    'Content-Type': 'application/ld+json', 
                    'Accept': 'application/ld+json' 
                } 
            }
        );
        refreshNotes();
        resetForm();
        showSnackbar('Note added successfully!', 'success');
        handleClose();
    } catch (error) {
        const errorData = error.response?.data;
        let errorMessage = 'Server error';
        if (error.response?.status === 422) {
            errorMessage = errorData?.['hydra:description'] || errorData?.detail || 'Validation error';
        } else {
            errorMessage = error.message;
        }
        console.error('API Error:', error.response?.status, errorData);
        showSnackbar('Error adding note: ' + errorMessage, 'error');
    } finally {
        setIsLoading(false);
    }
}

export const deleteNote = async (noteId, setIsLoading, showSnackbar, handleClose, navigate) => {
    try {
        setIsLoading(true);
        const response = await apiClient.delete(`/api/notes/delete/${noteId}`);
        showSnackbar('Note deleted successfully', 'success');
        handleClose();
        navigate('/', { replace: true });
    } catch (error) {
        handleClose();
        navigate('/', { replace: true });
        showSnackbar('Delete error: ' + (error.response?.data?.detail || error.message), 'error');
    }
    finally {
        setIsLoading(false);
    }
}

export const editNote = async (note, payload, setIsLoading, handleClose, showSnackbar, fetchNote, setNote, resetForm, navigate) => {
    try {
        setIsLoading(true);
        const response = await apiClient.patch(`/api/notes/${note.id}`, payload, {
            headers: {
                'Content-Type': 'application/merge-patch+json',
            },
        });
        resetForm();
        fetchNote(note.id, setNote, setIsLoading, showSnackbar);
        showSnackbar('Note updated successfully', 'success');
        handleClose();
    } catch (err) {
        showSnackbar('Error updating note: ' + (err.response?.data?.detail || err.message), 'error');
        handleClose();
        navigate('/', { replace: true });
    } finally {
        setIsLoading(false);
    }
}

export const updateNoteContent = async (noteId, newContent, setIsUpdating, setError) => {
    try {
        setIsUpdating(true);
        const response = await apiClient.patch(`/api/notes/${noteId}`, {
            content: newContent.trim(),
            headers: {
                'Content-Type': 'application/merge-patch+json',
            },
        });
        setError(false);
    } catch (err) {
        console.error("Błąd zapisu:", err);
        setError(true);
    }
    finally {
        setIsUpdating(false);
    }
}