import Box from '@mui/material/Box';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuBar from './MenuBar.jsx';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MainMenu from './MainMenu.jsx';
import Logo from './Logo.jsx';
import PageContent from './PageContent.jsx';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function HowToUse() {
    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
    const [openMainMenu, setOpenMainMenu] = useState(false);
    const toggleMainMenu = (newOpen) => {
        setOpenMainMenu(newOpen);
    };

    return(
        <Stack className='HowToUse' direction='column' sx={{ m: 2 }}>

            <MenuBar>
                <MainMenu openMainlMenu={openMainMenu} toggleMainMenu={toggleMainMenu} />

                <Stack direction='row' gap={2} width='100%' justifyContent='center'
                    sx={{
                        justifyContent: 'flex-end'
                    }}
                >
                    { !isMobile && <Box width='100%' display='flex' justifyContent='center'><Logo /></Box> }
                </Stack>
            </MenuBar>

            <Typography variant='h1' flexGrow={1}>How to use</Typography>
            <PageContent>
                <Typography variant='h2'>Signing up</Typography>
                <Typography>
                    First you have to sign up on the <Link component={RouterLink} to='/register'>registration page</Link>.
                    Next just log in to the application on the <Link component={RouterLink} to='/login'>login page</Link>.
                </Typography>
                <Typography variant='h2'>Adding categories</Typography>
                <Typography>
                    In the <Link component={RouterLink} to='/categories'>categories page</Link> you can add new categories.
                    You can add as many categories as you want. 
                    By choosing the category (or categories) you can edit or delete them.
                    Note that categories work like catalogs - only one category can be associated with a note.
                </Typography>
                <Typography variant='h2'>Adding notes</Typography>
                <Typography>
                   You can add new notes in the <Link component={RouterLink} to='/'>main page</Link> by clicking the <strong>+</strong> button.
                   Description field is not required. 
                   You can relate the note to only one category (or choose <em>Uncategorized</em>).
                   The note list shows the name and date of creation. It shows also a preview of the note.
                   To filter notes by category, choose a category from aside menu.
                </Typography>
                <Typography variant='h2'>Managing notes</Typography>
                <Typography>
                   Note managing is possible on the note page. 
                   You can edit or delete the note or refresh its content by choosing according button from the menu.<br/>
                   The markdown editor provides basic text formatting functions.
                   Note content is synchronizes with the server on every change (there is a one second delay).
                   The cloud icon on the right side of the note title indicates that the note is synchronized with the server.
                </Typography>
            </PageContent>
            
        </Stack>
    )
}
