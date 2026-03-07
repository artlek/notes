import Stack from '@mui/material/Stack';

export default function NoteHeader({ children }) {

    return(
        <Stack className='NoteHeader' direction='row'
            sx={{
                alignItems: 'center',
                my: 1,
                mb: 0,
            }}
        >
            {children}
        </Stack>   
    )
}