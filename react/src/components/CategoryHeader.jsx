import { Stack } from "@mui/material"

export default function CategoryHeader({ children }) {
    
    return(
        <Stack className='CategoryHeader' direction='row'
            sx={{
                alignItems: 'center',
                pb: 2,
            }}>
            {children}
        </Stack>   
    )
}