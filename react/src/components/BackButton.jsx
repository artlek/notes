import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BackButton({ onClick }) {
    return(
        <IconButton className='BackButton' type='button' onClick={onClick}
            sx={(theme)=>({
                color: 'inherit',
                borderRadius: '3px',
                '&:hover': {
                    bgcolor: 'transparent',
                    color: theme.palette.primary.main,
                }
            })}>
            <ArrowBackIcon 
                sx={{
                    fontSize: '2rem',
                }}
            />
        </IconButton>
    )
}