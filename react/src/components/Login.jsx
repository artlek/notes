import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';
import GuestNav from './GuestNav';

export default function Login() {
    const { login, isLoading, setIsLoading, user } = useAuth();
    const location = useLocation();
    if (user) {
        return <Navigate to='/' replace />;
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('must be valid email address')
            .required('is required')
            .min(2, 'Min 2 marks required')
            .max(50, 'Max 50 marks required'),
        password: Yup.string()
            .required('is required')
            .min(8, 'must be at least 8 characters long')
    });
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async(values, { resetForm }) => {
            await login({username: values['email'], password: values['password']});
        },
    });

    return(
        <Stack className='Login' component='form' onSubmit={formik.handleSubmit}
            sx={{
                position: 'absolute',
                margin: 'auto',
                left: 0,
                right: 0,
                width: '200px',
                height: '400px',
                alignItems: 'center',
            }}  
        >
            <Box m='2.5rem'><Logo size='12rem' /></Box>
            <Box
                sx={{ width: { xs: '90vw', sm: '25rem' }}}    
            > 
                <Stack direction='row'>
                    <Typography variant='caption'>Email</Typography>
                    <Typography variant='caption' color='error' mx='0.2rem'>
                        {formik.touched.email && formik.errors.email ? formik.errors.email : ' '}
                    </Typography>
                </Stack>
                <TextField
                    sx={{
                        mb: '1rem',
                        '& .MuiInputBase-root': { bgcolor: 'background.paper', height: '3rem', },
                    }}
                    id='email'
                    fullWidth
                    name='email'
                    type='text'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                />
                <Stack direction='row'>
                    <Typography variant='caption'>Password</Typography>
                    <Typography variant='caption' color='error' mx='0.2rem'>
                        {formik.touched.password && formik.errors.password ? formik.errors.password : ' '}
                    </Typography>
                </Stack>
                <TextField
                    sx={{
                        mb: '1rem',
                        '& .MuiInputBase-root': { bgcolor: 'background.paper', height: '3rem', },
                    }}
                    fullWidth
                    id='password'
                    name='password'
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.password)}
                />
                <Button fullWidth type='submit' loadingPosition='start' variant='contained' loading={formik.isSubmitting}
                    sx={{
                        my: '1rem',
                        height: '3rem',
                        color: 'white'
                    }}
                >
                    Login
                </Button>
            </Box>
            <GuestNav />
        </Stack>
    )
}