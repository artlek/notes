import Stack from '@mui/material/Stack';

export default function PageContent({ children }) {
    
    return(
        <Stack className='PageContent' direction='column'
            sx={{
                maxWidth: '900px',
                mt: '1rem',
            }}
        >
            {children}
        </Stack>
    )
}