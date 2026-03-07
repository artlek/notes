import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { alpha, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function Note({ note, loadingNote }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/note/${note.id}`);
    };

    const getPreviewContent = (content) => {
        if (!content) return '';
        return content.split('\n').slice(0, 60).join('\n');
    };

    
    return(
        <IconButton disableRipple className='Note' disabled={loadingNote} onClick={handleClick}
            sx={(theme)=>({
                p: 0,
                color: 'primary.main',
                width: '7rem',
                height: '13rem',
                alignItems: 'flex-end',
                '&:hover': {
                    bgcolor: 'transparent',
                    '& .MuiTypography-subtitle1': {
                        color: 'primary.main',
                    },
                    '& .MuiBox-root': {
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                    }
                }
            })}
        >
            <Stack direction='column' 
                sx={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <Stack sx={{
                    height: '3rem',
                    justifyContent: 'flex-end',
                    textAlign: 'left',
                    py: '0.25rem'
                }}>
                    <Typography variant='subtitle2'
                        sx={{
                            lineHeight: 1.2,
                            width: '100%',      
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {note.createdAt ? new Date(note.createdAt).toLocaleString(undefined, { 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: 'numeric' 
                            }) : null}
                    </Typography>
                    <Typography variant='subtitle1'
                        sx={{
                            lineHeight: 1.2,
                            width: '100%',      
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {note.name}
                    </Typography>
                </Stack>
                <Box
                    sx={(theme) => ({
                        flexGrow: 1,
                        borderRadius: '4px',
                        bgcolor: 'background.paper',
                        border: `1px solid ${theme.palette.divider}`,
                        overflow: 'hidden',
                        position: 'relative',
                    })}
                >
                    <Stack
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            fontFamily: 'monospace',
                            width: '750%',
                            transformOrigin: 'top left',
                            transform: 'scale(0.125)',
                            p: 8,
                            whiteSpace: 'nowrap',
                            textOverflow: 'clip',
                            overflow: 'hidden',
                            pointerEvents: 'none',
                            textAlign: 'left',
                            '& *': {
                                margin: '0 0 4px 0 !important',
                                wordBreak: 'break-word',
                                color: 'text.disabled',
                                width: '100%',
                                lineHeight: 1.4,
                            },
                            '& h1, & h2, & h3': {
                                lineHeight: 1.6,
                            }
                        }}
                        >
                        <ReactMarkdown>
                            {getPreviewContent(note.content)}
                        </ReactMarkdown>
                    </Stack>
                </Box>
            </Stack>
        </IconButton>
    )
}