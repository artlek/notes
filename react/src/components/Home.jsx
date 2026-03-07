import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NoItems from './NoItems';
import { useEffect } from 'react';
import PageContent from './PageContent.jsx';
import Notes from './Notes.jsx';
import Note from './Note.jsx';
import { fetchNotes } from '../services/noteService';
import { useSnackbar } from '../context/SnackbarContext';
import Stack from '@mui/material/Stack';
import MenuBar from './MenuBar.jsx';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MainMenu from './MainMenu.jsx';
import AddIcon from '@mui/icons-material/Add';
import Logo from './Logo';
import { useLoading } from '../context/LoadingContext';
import MainDrawer from './MainDrawer.jsx';
import ActionButtons from './ActionButtons.jsx';
import AddNoteForm from './AddNoteForm.jsx';
import CategoriesList from './CategorizedNotesList.jsx';
import { useOutletContext } from 'react-router-dom';

export default function Home() {
    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
    const [loadingNote, setLoadingNote] = useState(true);
    const [categories, setCategories] = useOutletContext();
    const [notes, setNotes] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const showSnackbar = useSnackbar();
    const [openMainMenu, setOpenMainMenu] = useState(false);
    const [openAddNoteDrawer, setOpenAddCategoryDrawer] = useState(false);

    const toggleMainMenu = (newOpen) => {
        setOpenMainMenu(newOpen);
    };

    const getNoteCount = (categoryName) => {
        if (categoryName === 'all') return notes.length;
        
        if (categoryName === 'Uncategorized') {
            return notes.filter(note => !note.Category).length;
        }

        const categoryObj = categories.find(c => c.name === categoryName);
        if (!categoryObj) return 0;

        return notes.filter(note => {
            if (!note.Category) return false;
            const noteCategoryId = note.Category.replace(/\D/g, '');
            return String(categoryObj.id) === String(noteCategoryId);
        }).length;
    };

    const {isLoading, setIsLoading} = useLoading();

    const visibleNotes = notes.filter((note) => {
        if (activeCategory === 'all') return true; 
        if (activeCategory === 'Uncategorized') {
            return !note.Category; 
        }
        const selectedCategory = categories.find((cat) => cat.name === activeCategory);
        
        if (selectedCategory && note.Category) {
            const noteCategoryId = note.Category.replace(/\D/g, '');
            return String(selectedCategory.id) === String(noteCategoryId);
        }

        return false;
    });

    const handleOpenAddNoteDrawer = () => {
        setOpenAddCategoryDrawer(true);
    };
    const handleCloseAddNoteDrawer = (event, reason) => {
        setOpenAddCategoryDrawer(false);            
    };

    const noteItems = visibleNotes.map((note) => {
        return (
            <Note key={note.id} note={note} loadingNote={loadingNote} />
        )
    })

    const actionButtons = (
        <ActionButtons>
            <Button onClick={handleOpenAddNoteDrawer}>
                <AddIcon />
            </Button>
        </ActionButtons>
    );

    const refreshNotes = () => {
        fetchNotes(setNotes, setLoadingNote, showSnackbar);
    };

    useEffect(() => {
        refreshNotes();
    }, []);

    return(
        <Stack className='Home' direction='column' sx={{ m: 2 }}>
            
            <MainDrawer
                openMainDrawer={openAddNoteDrawer}
                handleCloseMainDrawer={handleCloseAddNoteDrawer}
            >
                <AddNoteForm
                    handleClose={handleCloseAddNoteDrawer}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    refreshNotes={refreshNotes}
                />
            </MainDrawer>

            <MenuBar>
                <MainMenu openMainlMenu={openMainMenu} toggleMainMenu={toggleMainMenu}>
                    <CategoriesList categories={categories} setActiveCategory={setActiveCategory} setOpenMainMenu={setOpenMainMenu} getNoteCount={getNoteCount} />
                </MainMenu>
                <Stack direction='row' gap={2} width='100%' justifyContent='center'
                    sx={{
                        justifyContent: 'flex-end'
                    }}
                >
                    { isMobile ? actionButtons : (<Box width='100%' display='flex' justifyContent='center'><Logo /></Box>) }
                </Stack>
            </MenuBar>
            
            <Stack direction='row' sx={{ alignItems: 'center', pb: 2 }}>
                <Typography sx={{ flexGrow: 1 }} variant='h1'>{activeCategory === 'all' ? 'All notes' : activeCategory}</Typography>
                {!isMobile && actionButtons}
            </Stack>
            
            <PageContent>
                <Notes>
                    { noteItems.length > 0 ? noteItems : <Box sx={{ height: '17rem' }}><NoItems /></Box>}
                </Notes>
            </PageContent>

        </Stack>
    )
}