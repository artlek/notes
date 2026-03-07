import Stack from '@mui/material/Stack';
import { useAuth } from '../context/AuthContext';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

export default function UserPanel() {
    const { user, logout } = useAuth();
    const logoutUser = () => {
        logout();
    }

    return(
       <Stack className='UserPanel' direction='row' gap={1}
            sx={{
                height: '2rem',
                alignItems: 'center',
            }}
        >
            {
                user?.status === 'logged_in' ? (
                    <Stack direction='row' sx={{ alignItems: 'center', minWidth: 0 }}>
                        <Stack direction='column'>
                            <Typography variant='caption' 
                                sx={{
                                    lineHeight: 1.2,
                                    width: '100%',
                                    textAlign: 'left',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    fontWeight: 'bold',
                                }}
                            >
                                {user.name}
                            </Typography>
                            <Typography variant='caption' 
                                sx={{
                                    lineHeight: 1.2,
                                    width: '100%',
                                    textAlign: 'left',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                }}
                            >
                                {user.email}
                            </Typography>
                        </Stack>
                        <IconButton onClick={logoutUser}
                            sx={{
                                '&:hover': {
                                    bgcolor: 'transparent',
                                    color: 'primary.main'
                                },
                            }}
                        >
                            <LogoutIcon sx={{ fontSize: '1.2rem'}} />
                        </IconButton>
                    </Stack>
                ) : (
                    <>
                        <Link component={RouterLink} to='/login' variant='caption' 
                            sx={{
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            login
                        </Link>
                        <Typography variant='caption' color='text.secondary'>|</Typography>
                        <Link component={RouterLink} to='/register' variant='caption'
                            sx={{
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            sign in
                        </Link>
                    </>
                )
            }
        </Stack>
    )
}