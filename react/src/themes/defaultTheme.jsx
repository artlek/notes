import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

const FONT_FAMILY = '"Source Sans 3", "Roboto", sans-serif';
const PRIMARY_MAIN = '#156bb1';
const PRIMARY_HOVER = '#47a5f3';
const SECONDARY_MAIN = '#928904';
const BACKGROUND_DEFAULT = '#f5f5f5';
const BACKGROUND_PAPER = '#ffffff';
const BACKGROUND_ALTERNATE = `color-mix(in srgb, ${PRIMARY_MAIN}, white 89%)`;
const TEXT_PRIMARY = '#2e2e2e';
const TEXT_SECONDARY = '#616161';
const TEXT_DISABLED = '#a7a7a7';
const DIVIDER = '#e0e0e0';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: PRIMARY_MAIN,
            hover: PRIMARY_HOVER,
        },
        secondary: {
            main: SECONDARY_MAIN,
        },
        background: {
            default: BACKGROUND_DEFAULT,
            paper: BACKGROUND_PAPER,
            alternate: BACKGROUND_ALTERNATE,
        },
        text: {
            primary: TEXT_PRIMARY,
            secondary: TEXT_SECONDARY,
            disabled: TEXT_DISABLED,
        },
        divider: DIVIDER
    },
    typography: {
        fontFamily: FONT_FAMILY,
        h1: {
            fontSize: '2.2rem',
            color: TEXT_PRIMARY,
            fontWeight: 600
        },
        h2: {
            fontSize: '1.6rem',
            color: TEXT_PRIMARY,
            fontWeight: 600,
            margin: '1rem 0 0.5rem 0'
        },
        h3: {
            fontSize: '1.3rem',
            color: TEXT_SECONDARY,
        },
        h4: {
            fontSize: '1.4rem',
            color: TEXT_PRIMARY,
            fontWeight: 600,
        },
        caption: {
            fontSize: '0.9rem',
            color: TEXT_SECONDARY,
        },
        subtitle1: {
            fontSize: '0.9rem',
            color: TEXT_PRIMARY,
            fontWeight: 600
        },
        subtitle2: {
            fontSize: '0.6rem',
            color: TEXT_SECONDARY,
        },
        body1: {
            fontSize: '1rem',
            color: TEXT_SECONDARY,
        },
        fontWeightExtraLight: 200,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        fontWeightSemiBold: 600,
        fontWeightBlack: 900,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: BACKGROUND_DEFAULT,
                    height: '100%',
                },
            },
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    height: '2rem',
                    minWidth: '3rem',
                    textTransform: 'uppercase',
                    fontSize: '1rem',
                    fontWeight: 700,
                    borderRadius: '3px',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    height: '2rem',
                    width: '3rem',
                    borderRadius: '3px',
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    padding: '20px 0',
                    width: '100%',
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    backgroundColor: BACKGROUND_PAPER,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    width: '100%',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: PRIMARY_MAIN,
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                        color: `color-mix(in srgb, ${PRIMARY_MAIN}, white 25%)`,
                    }
                },
            },
        }
    },
});

export default defaultTheme;
