import { Divider, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import ListSubheader from '@mui/material/ListSubheader';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';

export default function CategorizedNotesList({ categories, setActiveCategory, setOpenMainMenu, getNoteCount }) {
    const handleClick = (activeCategory) => {
        setOpenMainMenu(false);
        setActiveCategory(activeCategory);
    }
    const listItemButtonStyle = {
        '& .MuiTypography-root': {
            color: 'inherit',
            fontWeight: 600,
        },
        '&:hover': {
            bgcolor: 'transparent',
            '& .MuiTypography-root, & .MuiListItemIcon-root': {
                color: 'primary.main',
                },
            },
        };

    const categoryItems = categories.map((category) => {
        return (
            <ListItem key={category.id} disablePadding>
                <ListItemButton onClick={() => handleClick(category.name)} sx={listItemButtonStyle} >
                    <ListItemIcon>
                        <FolderSpecialIcon />
                    </ListItemIcon>
                    <ListItemText primary={category.name} />
                    <Typography variant='body1'>{getNoteCount(category.name)}</Typography>
                </ListItemButton>
            </ListItem>
        )
    });

    return(
        <>
            <List className='CategorizedNotesList' subheader={<ListSubheader sx={{ bgcolor: 'transparent', textTransform: 'uppercase' }}>Notes</ListSubheader>}>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleClick('all')} sx={listItemButtonStyle}>
                        <ListItemIcon>
                            <FolderCopyIcon />
                        </ListItemIcon>
                        <ListItemText  primary='All notes' />
                        <Typography variant='body1'>{getNoteCount('all')}</Typography>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleClick('Uncategorized')} sx={listItemButtonStyle}>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary='Uncategorized' />
                        <Typography variant='body1'>{getNoteCount('Uncategorized')}</Typography>
                    </ListItemButton>
                </ListItem>
                {categoryItems}
                <ListSubheader color='inherit' sx={{ bgcolor: 'transparent' }}>
                    <Link component={RouterLink} to='/categories'>manage categories</Link>
                </ListSubheader>
            </List>
            <Divider />
        </>
    )
}