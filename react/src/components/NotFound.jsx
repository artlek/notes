import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function NotFound() {
    
    return(
        <Stack className='NotFound' sx={{ m: 2 }}>
            <Typography variant="h1">
                404
            </Typography>
            <Typography>
                Page not found
            </Typography>
        </Stack>
    )
}
