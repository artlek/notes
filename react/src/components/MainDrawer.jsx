import { Dialog, SwipeableDrawer, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Puller from './Puller';

export default function MainDrawer({ children, openMainDrawer, handleCloseMainDrawer }) {
    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

    return (
        <Stack direction='row' className='MainDrawer'>
            {
                isMobile ? (
                    <SwipeableDrawer
                        disableSwipeToOpen={true}
                        disableScrollLock
                        disableBackdropTransition
                        open={openMainDrawer}
                        onClose={handleCloseMainDrawer}
                        anchor='bottom'
                        sx={{
                            height: 'auto',
                            maxHeight: '80vh',
                            '& .MuiDrawer-paper': {
                                bgcolor: 'background.default',
                                p: '2rem',
                            },
                        }}
                    >
                        <Puller />
                        {children}
                    </SwipeableDrawer>
                ) : (
                    <Dialog
                        onClose={handleCloseMainDrawer}
                        // onOpen={() => {}} 
                        open={openMainDrawer}
                        sx={{
                            '& .MuiDialog-paper': {
                                bgcolor: 'background.default',
                                p: '2rem',
                            }
                        }}
                    >
                        {children}
                    </Dialog>
                )
            }
        </Stack>
    );
}