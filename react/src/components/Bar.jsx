import Stack from '@mui/material/Stack';

export default function Bar({ children }) {
    
    return(
        <Stack className='Bar' direction='row'
            sx={{
                minHeight: '2rem',
                maxHeight: '4rem',
                width: '100%',
                alignItems: 'center',
        }}>
            {children}
        </Stack>
    )
}