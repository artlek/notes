import { Box } from '@mui/material';
export default function Puller() {

    return(
       <Box className='Puller' direction='row'
            sx={{
                my: 0.5,
                width: 60,
                height: 6,
                backgroundColor: 'text.disabled',
                borderRadius: 3,
                position: 'absolute',
                top: 8,
                left: 'calc(50% - 30px)',
            }}
        />
    )
}