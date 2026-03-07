import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function NoteSubheader({ children }) {
    
    return(
        <Stack className='NoteSubheader' direction='row' gap={1}
            sx={{
                alignItems: 'center',
                minWidth: 0,
                minHeight: '1.7rem',
                mb: { xs: 0 },
            }}>
            <Typography variant='body1'
                sx={(theme)=>({
                    fontSize: { xs: '0.8rem', md: `${theme.typography.body1.fontSize}` },
                    width: '100%',      
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    ml: 6,
                })}
            >
                {children}
            </Typography>
        </Stack>   
    )
}