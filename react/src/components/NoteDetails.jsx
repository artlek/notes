import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import NoteHeader from './NoteHeader';
import NoteSubheader from './NoteSubheader';
import TextEditor from './TextEditor';
import SyncStatus from './SyncStatus';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNote } from '../services/noteService';
import NotFound from './NotFound';
import { useSnackbar } from '../context/SnackbarContext';
import { useLoading } from '../context/LoadingContext';
import Logo from './Logo';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';
import MainMenu from './MainMenu';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import MainDrawer from './MainDrawer';
import ActionButtons from './ActionButtons';
import DeleteNoteConfirmation from './DeleteNoteConfirmation';
import EditNoteForm from './EditNoteForm';
import PageContent from './PageContent';
import BackButton from './BackButton';

export default function NoteDetails() {
    const noteId = useParams().noteId;
    const navigate = useNavigate();
    const onBackClick = () => navigate(-1);
    const { isLoading, setIsLoading } = useLoading();
    const [isUpdating, setIsUpdating] = useState(true);
    const showSnackbar = useSnackbar();
    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [error, setError] = useState(false);
    const [note, setNote] = useState(null);
    const [openMainMenu, setOpenMainMenu] = useState(false);
    const [openDeleteNoteDrawer, setOpenDeleteNoteDrawer] = useState(false);
    const [openEditNoteDrawer, setOpenEditNoteDrawer] = useState(false);

    const toggleMainMenu = (newOpen) => {
        setOpenMainMenu(newOpen);
    };
    const handleOpenDeleteNoteDrawer = () => {
        setOpenDeleteNoteDrawer(true);
    }
    const handleCloseDeleteNoteDrawer = () => {
        setOpenDeleteNoteDrawer(false);
    }
    const handleOpenEditNoteDrawer = () => {
        setOpenEditNoteDrawer(true);
    }
    const handleCloseEditNoteDrawer = () => {
        setOpenEditNoteDrawer(false);
    }
    const refreshNote = () => {
        fetchNote(noteId, setNote, setIsLoading, showSnackbar);
    }
    useEffect(() => {
        const loadData = async () => {
            await fetchNote(noteId, setNote, setIsLoading, showSnackbar);
            setIsInitialLoad(false);
            setIsUpdating(false);
        };
        loadData();
    }, [noteId]);

    if (isInitialLoad) {
        return;
    }

    if (!note) {
        return <NotFound />;
    }

    const actionButtons = (
        <ActionButtons>
            <Button onClick={handleOpenEditNoteDrawer}>
                <EditIcon />
            </Button>
            <Button onClick={handleOpenDeleteNoteDrawer}>
                <DeleteIcon />
            </Button>
            <Button onClick={refreshNote}>
                <RefreshOutlinedIcon />
            </Button>
        </ActionButtons>
    )

    return(
        <Stack className='NoteDetails' direction='column'>
            <MenuBar>
                <MainMenu openMainlMenu={openMainMenu} toggleMainMenu={toggleMainMenu} />
                <Stack direction='row' width='100%'
                    sx={{
                        justifyContent: 'flex-end',
                    }}
                >
                    { isMobile ? (actionButtons) : (<Box width='100%' display='flex' justifyContent='center'><Logo /></Box>) }
                </Stack>
            </MenuBar>

            <MainDrawer
                openMainDrawer={openDeleteNoteDrawer}
                closeMainDrawer={handleCloseDeleteNoteDrawer}
            >
               <DeleteNoteConfirmation
                    noteId={noteId}
                    handleClose={handleCloseDeleteNoteDrawer}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </MainDrawer>

            <MainDrawer
                openMainDrawer={openEditNoteDrawer}
                closeMainDrawer={handleCloseEditNoteDrawer}
            >
                <EditNoteForm
                    note={note}
                    handleClose={handleCloseEditNoteDrawer}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    fetchNote={fetchNote}
                    setNote={setNote}
                />
            </MainDrawer>

            <NoteHeader>
                <BackButton onClick={onBackClick} />
                <Stack direction='column' flex={1} 
                    sx={{
                        minWidth: 0,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant='h1'
                        sx={(theme)=>({
                            fontSize: { xs: '1.6rem', md: `${theme.typography.h1.fontSize}` },
                            width: '100%',      
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        })}
                    >
                        {note.name}
                    </Typography>
                </Stack>
                <Stack direction='row' sx={{ height: '100%' }}>
                    { isMobile && <SyncStatus isUpdating={isUpdating} error={error} /> }
                </Stack>
            </NoteHeader>
            <NoteSubheader>
                {note.description}
            </NoteSubheader>
            <PageContent>
                <Stack direction='row' gap={1} sx={{ width: '100%' }}>
                    <Typography variant='caption' color='error'
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            mx: 1,  
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            alignItems: 'center',
                        }}
                    >
                    </Typography>
                </Stack>
                <TextEditor syncStatus={<SyncStatus isUpdating={isUpdating} error={error} />} actionButtons={actionButtons} note={note} setIsUpdating={setIsUpdating} setError={setError}/>
            </PageContent>
        </Stack>
    );
}