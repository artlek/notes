import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Divider } from '@mui/material';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import UserPanel from './UserPanel';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import BackButton from './BackButton';
import MenuButtons from './MenuButtons';
import MainDrawer from './MainDrawer';
import ThemeSetting from './ThemeSetting';

export default function MainMenu({ toggleMainMenu, openMainlMenu, children }) {
    const theme = useTheme();

    const [openSettingsDrawer, setOpenSettingsDrawer] = React.useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const handleClickSettingsButton = () => {
        setOpenSettingsDrawer(true);
        toggleMainMenu(false);
    }

    return (
        <Box className='MainMenu'>
            <MainDrawer openMainDrawer={openSettingsDrawer} handleCloseMainDrawer={()=>setOpenSettingsDrawer(false)}>
                <ThemeSetting />
            </MainDrawer>
            <IconButton disableRipple onClick={()=>toggleMainMenu(true)}
                sx={(theme)=>({
                    color: isMobile ? 'inherit' : 'inherit',
                    '&:hover': {
                        color: 'primary.hover'
                    }
                })}
            >
                <MenuIcon />
            </IconButton>
            <Drawer anchor='left' open={openMainlMenu} onClose={()=>toggleMainMenu(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        bgcolor:'background.default',
                    }
                }}
            >
                <Stack gap={2}
                    sx={{
                        bgcolor: 'background.default',
                        height: '100%',
                        width: { xs: '80vw', sm: '20rem' },

                    }}
                >   
                    <Stack direction='row' sx={{ width: '100%', justifyContent: 'flex-end', p: 2 }}>
                        <BackButton onClick={()=>toggleMainMenu(false)} />
                    </Stack>
                    <Box mx='1rem'><UserPanel /></Box>
                    <Divider />
                    <MenuButtons handleClickSettingsButton={handleClickSettingsButton} />
                    {children}
                </Stack>
            </Drawer>
        </Box>
    );
}