import { Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

export default function GuestNav() {

    return(
       <Stack className='GuestNav' direction='row' gap={2}>
            <Link component={RouterLink} to='/login'>login</Link>
            <Link component={RouterLink} to='/register'>register</Link>
            <Link noWrap component={RouterLink} to='/how-to-use'>how to use</Link>
            <Link component={RouterLink} to='/about'>about</Link>
        </Stack>
    )
}