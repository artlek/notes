import { Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useAuth } from '../context/AuthContext';

export default function MenuButtons({ handleClickSettingsButton }) {
    const listItemButtonStyle = {
        '& .MuiTypography-root': {
            color: 'inherit',
            fontWeight: 600,
        },
        '&:hover': {
            bgcolor: 'transparent',
            '& .MuiTypography-root': {
                color: 'primary.main',
                },
            },
        };
    
    const { user } = useAuth();

    return(
        <>
            <List className='MenuButtons'
                sx={{
                    p: 0,
                }}
            >
                <ListItem disablePadding>
                    <ListItemButton sx={listItemButtonStyle} component={RouterLink} to='/'>
                        <ListItemText primary='Home' />
                    </ListItemButton>
                </ListItem>
                {
                    user && (
                        <ListItem disablePadding>
                            <ListItemButton sx={listItemButtonStyle} onClick={handleClickSettingsButton}>
                                <ListItemText primary='Settings' />
                            </ListItemButton>
                        </ListItem>
                    )
                }
                <ListItem disablePadding>
                    <ListItemButton sx={listItemButtonStyle} component={RouterLink} to='/about'>
                        <ListItemText primary='About' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={listItemButtonStyle} component={RouterLink} to='/how-to-use'>
                        <ListItemText primary='How to use' />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
        </>
    )
}