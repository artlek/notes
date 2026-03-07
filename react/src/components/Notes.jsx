import Stack from '@mui/material/Stack';

export default function Notes( { children } ) {

    return(
        <Stack className='Notes' direction='row' gap={2}
            sx={{
                flexWrap: 'wrap',
                alignItems: 'flex-end',
            }}
        >
            {children}
        </Stack>
    )
}