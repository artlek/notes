import Stack from '@mui/material/Stack';

export default function Header({ children }) {
    return(
       <Stack className='Header' direction='row'
        sx={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {children}
        </Stack>
    )
}