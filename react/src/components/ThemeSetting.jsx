import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { useColorMode } from '../context/ThemeContext';
import { useTheme } from '@mui/material/styles';

export default function ThemeSetting() {
    const theme = useTheme();
    const { toggleColorMode } = useColorMode();
    return(
        <Stack className='ThemeSetting' direction='column' gap={1}>
            <Typography variant='h2' sx={{ mb: 2 }}>Settings</Typography>
            <Stack direction='row' sx={{ alignItems: 'center'}}>
                <Typography variant='body' flexGrow={1}>Dark mode</Typography>
                <Switch checked={theme.palette.mode === 'dark'} onClick={toggleColorMode} />
            </Stack>
            {/* <Divider /> */}
        </Stack>
    )
}