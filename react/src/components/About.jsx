import Box from '@mui/material/Box';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuBar from './MenuBar.jsx';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MainMenu from './MainMenu.jsx';
import Logo from './Logo';
import { TextField } from '@mui/material';
import PageContent from './PageContent.jsx';

export default function About() {
    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
    const [openMainMenu, setOpenMainMenu] = useState(false);
    const toggleMainMenu = (newOpen) => {
        setOpenMainMenu(newOpen);
    };

    const featuresContent = `    - easy and quick note creating with the Markdown editor
    - instant synchronization with the server
    - ability to assign notes to a category
    - filtering notes by category`;

    const mainInfoItems = [
        {
            key: 0,
            label: 'App name',
            value: 'Note App',
        },
        {
            key: 1,
            label: 'Description',
            value: 'Web application to managing your notes',
        },
        {
            key: 2,
            label: 'Version',
            value: '1.0.0',
        },
        {
            key: 3,
            label: 'Release date',
            value: '2026-03-07',
        },
        {
            key: 4,
            label: 'Requirements',
            value: 'Any popular updated web browser'
        },
        {
            key: 5,
            label: 'Author',
            value: 'Artur Lekston',
        },
        {
            key: 6,
            label: 'Main tech stack',
            value: 'React, Mui, API Platform, MariaDB',
        },
        {
            key: 7,
            label: 'Features',
            value: featuresContent,
        },
    ]

    return(
        <Stack className='About' direction='column' sx={{ m: 2 }}>

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

            <Typography variant='h1' flexGrow={1}>About</Typography>
            <PageContent>
                <Stack direction='column' gap={1} my={3}>
                    {
                        mainInfoItems.map((item) => {
                            return(
                                <TextField
                                    multiline
                                    key={item.key}
                                    label={item.label}
                                    value= {item.value}
                                    variant='filled'
                                    slotProps={{
                                        input: { readOnly: true, disableUnderline: true }
                                    }}
                                    sx={(theme)=>({
                                        '& .MuiFilledInput-root': {
                                            borderRadius: '3px',
                                            border: `1px solid ${theme.palette.divider}`,
                                            backgroundColor: 'background.paper',
                                            '&:hover': {
                                                backgroundColor: 'background.paper',
                                            },
                                            '&.Mui-focused': {
                                                backgroundColor: 'background.paper',
                                            },
                                        },
                                    })}
                                />
                            )
                        })
                    }
                </Stack>
            </PageContent>

        </Stack>
    )
}
