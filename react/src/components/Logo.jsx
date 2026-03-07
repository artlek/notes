import { Link as RouterLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Logo({ size='7rem' }) {
    return(
        <Stack className='Logo' direction='row' gap='0.2rem' component={RouterLink} to='/'
            sx={{
                textDecoration: 'none',
                containerType: 'inline-size',
                width: `${size}`,
                height: `calc(${size}/4)`,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Stack direction='row'
                sx={{
                    borderRadius: '6%',
                    bgcolor: 'primary.main',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    height: '100%',
                    px: '0.4rem',
                }}>
                <Typography sx={{ color: 'background.default', fontSize: '19cqw' }}>notes</Typography>
            </Stack>
            <Stack direction='row'
                sx={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}>
                <Typography sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '19cqw'}}>app</Typography>
            </Stack>
        </Stack>
    )
}