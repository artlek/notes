import Box from '@mui/material/Box';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ErrorIcon from '@mui/icons-material/Error';

export default function SyncStatus({ isUpdating, error }) { 

    return(
        <Box className='SyncStatus'
            sx={{
                m: 1,
                alignItems: 'center'
            }}
        >
        {
            error ? (
                <ErrorIcon 
                    sx={{
                        fontSize: '1.2rem',
                        color: 'red !important',
                        mx: '0.5rem'
                    }}
                />
            ) : (
                isUpdating ? (
                    <AutorenewIcon
                        sx={{      
                            animation: 'spin 1s linear infinite',
                            '@keyframes spin': {
                                '0%': {
                                transform: 'rotate(0deg)',
                                },
                                '100%': {
                                transform: 'rotate(360deg)',
                                },
                            },
                            fontSize: '1.2rem',
                            color: 'text.secondary',
                            mx: '0.5rem'
                        }}
                    />
                ) : (
                    <CloudDoneIcon
                        sx={{
                            fontSize: '1.2rem',
                            color: 'green !important',
                            mx: '0.5rem'
                        }}
                    />
                )
            )
        }
        </Box>
    )
}