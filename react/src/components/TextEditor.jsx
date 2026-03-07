import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useRef, useEffect } from 'react';
import { updateNoteContent } from '../services/noteService';
import '@mdxeditor/editor/style.css';
import { 
    MDXEditor,
    BlockTypeSelect,
    headingsPlugin, 
    listsPlugin, 
    quotePlugin, 
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    ListsToggle,
    CreateLink,
    linkPlugin,
    linkDialogPlugin
} from '@mdxeditor/editor';
import DOMPurify from 'dompurify';
import { useMediaQuery, useTheme } from '@mui/material';

export default function TextEditor({ note, setIsUpdating, setError, syncStatus, actionButtons }) {
    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setMarkdown(note.content || '');
        }
    }, [note.content]);

    const timerRef = useRef(null);
    const checkSanity = (noteContent) => {
        const sanitizedContent = DOMPurify.sanitize(noteContent);
    }

    const handleContent = (noteContent) => {
        checkSanity(noteContent);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            updateNoteContent(note.id, DOMPurify.sanitize(noteContent), setIsUpdating, setError);
        }, 1000);
    }

    return (
        <Box className='TextEditor'
            sx={(style)=>({
                width: '100%',
                bgcolor: 'background.paper',
                '& p': { m: 0.5 },
                '& [role="toolbar"]': { 
                    borderRadius: '3px',
                    bgcolor: 'background.default',
                },
                '& [role="textbox"]': {
                    color: 'text.secondary',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                },
                '& .mdxeditor': { height: '100%', display: 'flex', flexDirection: 'column' },
                '& .mdxeditor-root-contenteditable': {
                    border: `1px solid ${style.palette.divider}`,
                    display: 'flex', 
                    flexGrow: 1,
                    '& div': {
                        height: '100%',
                        width: '100%',
                    },
                },
                '& div.MDXEditor-Toolbar button': {
                    '&:hover': {
                        color: 'primary.main',
                        '& svg': {
                            color: 'primary.main',
                        }
                    },
                    bgcolor: 'background.default',
                    '& svg': {
                        color: 'text.primary',
                    },
                },
            })}
        >
            <MDXEditor
                ref={editorRef}
                markdown={DOMPurify.sanitize(note.content) || ''}
                key={note.id}
                onChange={(noteContent) => handleContent(noteContent)}
                plugins={[
                    headingsPlugin(), 
                    listsPlugin(), 
                    quotePlugin(),
                    linkPlugin(), 
                    linkDialogPlugin(),
                    toolbarPlugin({
                        toolbarContents: () => (
                            <Stack direction='column' gap={1} width='100%'>
                                <Stack className='MDXEditor-Toolbar' direction='row'
                                    sx={{
                                        '& [role="combobox"]': { width: '100px' },
                                        '& button': { p: '0.25rem' },
                                    }}
                                >
                                    <UndoRedo />
                                    <BlockTypeSelect />
                                    <BoldItalicUnderlineToggles />
                                    <ListsToggle />
                                    { !isMobile && <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }} >{actionButtons}{syncStatus}</Box> }
                                </Stack>
                            </Stack>
                        )
                    })
                ]} 
            />
        </Box>
    )
}