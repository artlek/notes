import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function NoItems() {
    
    return(
        <Box className='NoItems'>
            <Typography m={1} variant="caption">No items</Typography>
        </Box>
    )
}