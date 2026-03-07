import apiClient from './axios/apiClient';

export default async function fetchNotes(setNotes, setLoadingNote, showSnackbar) {
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