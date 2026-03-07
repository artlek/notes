import { Stack } from '@mui/material';

export default function CategoryBar( {children} ) {

    return (
        <Stack className='CategoryBar' direction='row' gap={1}
            sx={{
                flexWrap: 'wrap',
                alignItems: 'center'
            }}
        >
            {children}
        </Stack>
    );
}