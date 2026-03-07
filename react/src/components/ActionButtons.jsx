import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

export default function ActionButtons({ children }) {
    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
    return(
        <Stack className='ActionButtons' direction='row' gap={0.5}
            sx={{
                '& .MuiButtonBase-root': {
                    border: 'none !important',
            
                    bgcolor: 'transparent',
                    '&:hover': {
                        '& .MuiSvgIcon-root': {
                            color: 'primary.hover',
                        }
                    },
                    '& .MuiSvgIcon-root': {
                        color: isMobile ? 'white' : 'text.primary',
                        '&:hover': {
                            color: 'primary.hover',
                        }
                    }
                },
            }}>
            {children}
        </Stack>
    )
}