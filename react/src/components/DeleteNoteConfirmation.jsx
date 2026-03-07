import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { deleteNote } from '../services/noteService';
import { useSnackbar } from '../context/SnackbarContext';
import { Typography } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useNavigate } from 'react-router-dom';

export default function DeleteNoteConfirmation({ noteId, handleClose, isLoading, setIsLoading }) {
    const showSnackbar = useSnackbar();
    const navigate = useNavigate();
    const handleDelete = () => {
        deleteNote(noteId, setIsLoading, showSnackbar, handleClose, navigate);
    }

    const handleCancel = () => {
        handleClose();
    }
    
    return(
        <Stack className='DeleteNoteConfirmation' gap={5}>
            <Typography variant='h2'>
                Delete note?
            </Typography>
            <Stack direction='row'
                sx={{
                    width: '100%',
                    gap: 1,
                }}
            >
                <Button
                    fullWidth
                    onClick={handleCancel}
                    startIcon={<ClearRoundedIcon />}
                    variant='contained'
                    sx={{
                        height: '3rem',
                        borderRadius: '4px'
                    }}
                >
                    Cancel
                </Button>
                <Button
                    fullWidth
                    startIcon={<CheckRoundedIcon />}
                    onClick={handleDelete}
                    disabled={isLoading}
                    variant='contained'
                    color='error'
                    sx={{
                        height: '3rem',
                        borderRadius: '4px'
                    }}
                >
                    Delete
                </Button>
            </Stack>
        </Stack>
    )
}