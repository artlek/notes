import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import register from '../services/register';
import { useSnackbar } from '../context/SnackbarContext';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Logo from './Logo';
import GuestNav from './GuestNav';

export default function Register() {
    const { login, isLoading, user } = useAuth();
    if (user) {
        return <Navigate to='/' replace />;
    }
    const [loading, setLoading] = useState(false);
    const showSnackbar = useSnackbar();
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .matches(/^[^~`!@#\$%\^&\*\+=\{}\[\]\|\\:;<>\?'"]*$/, { message: 'Incorrect characters. Allowed only: -_(),.'})
            .required('is required')
            .min(2, 'min 2 marks required')
            .max(50, 'max 50 marks required'),
        email: Yup.string()
            .email('must be valid email address')
            .required('is required')
            .min(2, 'min 2 marks required')
            .max(50, 'max 50 marks required'),
        password: Yup.string()
            .required('is required')
            .matches(/[a-z]/, 'must contain at least one lowercase letter')
            .matches(/[0-9]/, 'must contain at least one number')
            .min(8, 'must be at least 8 characters long'),
        passwordconfirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'does not match')
            .required('is required'),
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            passwordconfirm: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            register(values, setLoading, showSnackbar, resetForm);
        }
    });
    
    return(
        <Stack className='Register'
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
            <Box component='form' onSubmit={formik.handleSubmit}
                sx={{
                    width: { xs: '90vw', sm: '25rem' }
                }}    
            >   
                <Stack direction='row'>
                    <Typography variant='caption'>Name</Typography>
                    <Typography variant='caption' color='error' mx='0.2rem'>
                        {formik.touched.name && formik.errors.name ? formik.errors.name : ' '}
                    </Typography>
                </Stack>
                <TextField
                    sx={{
                        mb: '1rem',
                        '& .MuiInputBase-root': { bgcolor: 'background.paper', height: '3rem' },
                    }}
                    fullWidth
                    id='name'
                    name='name'
                    type='text'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                />
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
                    fullWidth
                    id='email'
                    name='email'
                    type='text'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.email)}
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
                    size='small'
                    fullWidth
                    id='password'
                    name='password'
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                />
                <Stack direction='row'>
                    <Typography variant='caption'>Confirm password</Typography>
                    <Typography variant='caption' color='error' mx='0.2rem'>
                        {formik.touched.passwordconfirm && formik.errors.passwordconfirm ? formik.errors.passwordconfirm : ' '}
                    </Typography>
                </Stack>
                <TextField
                    sx={{
                        mb: '1rem',
                        '& .MuiInputBase-root': { bgcolor: 'background.paper', height: '3rem', },
                    }}
                    fullWidth
                    id='passwordconfirm'
                    name='passwordconfirm'
                    type='password'
                    value={formik.values.passwordconfirm}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.passwordconfirm && Boolean(formik.errors.passwordconfirm)}
                />
                <Button fullWidth type='submit' loadingPosition='start' variant='contained' loading={loading}
                    sx={{
                        my: '1rem',
                        height: '3rem',
                    }}
                >
                    Register
                </Button>
            </Box>
            <GuestNav />
        </Stack>
    )
}