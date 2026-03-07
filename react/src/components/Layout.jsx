import Stack from '@mui/material/Stack';
import { fetchCategories } from '../services/categoryService';
import { useSnackbar } from '../context/SnackbarContext';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Outlet } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import { useLoading } from '../context/LoadingContext';

export default function Layout() {
    const { isLoading, setIsLoading } = useLoading();
    const [categories, setCategories] = useState([]);
    const showSnackbar = useSnackbar();
    const { user } = useAuth();

    const location = useLocation();
    useEffect(() => {
        const titles = {
            '/': 'All notes',
            '/register': 'Register',
            '/login': 'Login',
            '/about': 'About',
            '/how-to-use': 'How to use',
            '/categories': 'Categories',
        };
        document.title = titles[location.pathname] ? titles[location.pathname] + ' - Notes App' : 'Notes App';
        }, [location]);

    useEffect(() => {
        user && fetchCategories(setCategories, setIsLoading, showSnackbar);
    }, [user]);

    return(
        <>
            {isLoading && (
                <LinearProgress 
                    sx={{ 
                        position: 'fixed',
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        zIndex: 10000
                    }}
                />
            )}
            <Stack className='Layout' direction='column'
                sx={{
                    width: '100vw',
                    my: 1,
                    pb: 4,
                }}
            >
                <Stack className='ContentWrapper'
                    sx={{
                        opacity: isLoading ? 0.6 : 1,
                        transition: 'opacity 0.2s ease-in-out',
                        pointerEvents: isLoading ? 'none' : 'all',
                        flexGrow: 1,
                        pt: { md: '4rem' },
                        mx: { xs: 0, md: 3 },
                        ml: { xs: 0, md: '10rem' },
                        pb: { xs: 3, md: 0 },
                    }}
                >
                    <Outlet context={[categories, setCategories, isLoading, setIsLoading]} />
                </Stack>
            </Stack>
        </>
    )
}