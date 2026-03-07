import AppBar from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';
import { useMediaQuery } from '@mui/material';

export default function MenuBar({ children }) {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const color = isMobile ? 'primary' : 'inherit';

    return(
        <AppBar className='MenuBar' color={color} elevation={0}
            sx={(theme)=>({
                position: 'fixed',
                top: { xs: 'auto', md: 0 },
                bottom: { xs: 0, md: 'auto' },
                borderBottom: { md: `1px solid ${theme.palette.divider}` },
            })}
        >
            <Toolbar>
                {children}
            </Toolbar>
        </AppBar>
    )
}