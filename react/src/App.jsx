import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Register from './components/Register';
import Login from './components/Login.jsx';
import NotFound from './components/NotFound';
import { SnackbarProvider } from './context/SnackbarContext.jsx';
import NoteDetails from './components/NoteDetails.jsx';
import Home from './components/Home.jsx';
import Layout from './components/Layout.jsx';
import { LoadingProvider } from './context/LoadingContext.jsx';
import Categories from './components/Categories.jsx';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import About from './components/About.jsx';
import HowToUse from './components/HowToUse.jsx';
import { MyThemeProvider } from './context/ThemeContext.jsx';

export default function App() {
    
    const zoom = 100;
    useEffect(() => {
        document.documentElement.style.setProperty('--base-size', `${zoom}%`);
    }, [zoom]);

    const ProtectedRoute = ({ children }) => {
        const { user } = useAuth();
        const location = useLocation();
        if (!user) {
            return <Navigate to='/login' state={{ from: location }} replace />;
        }

        return children;
    };

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <AuthProvider>
                    <Layout />
                </AuthProvider>
            ),
            children: [
                { path: '/register', element: <Register /> },
                { path: '/login', element: <Login /> },
                { path: '/about', element: <About /> },
                { path: '/how-to-use', element: <HowToUse /> },
                {
                    path: '/note/:noteId',
                    element: (
                        <ProtectedRoute>
                            <NoteDetails />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: '/',
                    element: (
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: '/categories',
                    element: (
                        <ProtectedRoute>
                            <Categories />
                        </ProtectedRoute>
                    ),
                },
                { path: '*', element: <NotFound /> },
            ],
        }
    ]);

    return (
        <MyThemeProvider>
            <SnackbarProvider>       
                <LoadingProvider>
                    <RouterProvider router={router} />
                </LoadingProvider>
            </SnackbarProvider>
        </MyThemeProvider>
    )
}
