import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import defaultTheme from '../themes/defaultTheme';
import darkTheme from '../themes/darkTheme';
import { useMediaQuery } from '@mui/material';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

export const MyThemeProvider = ({ children }) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState(() => {
        const savedMode = localStorage.getItem('appMode');
        if (savedMode) return savedMode;
        return prefersDarkMode ? 'dark' : 'light';
    });

    useEffect(() => {
        localStorage.setItem('appMode', mode);
    }, [mode]);


    const colorMode = useMemo(
            () => ({
                toggleColorMode: () => {
                    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
                },
            }),[]
    );

    const theme = useMemo(
        () => (mode === 'light' ? defaultTheme : darkTheme),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
