import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addCategory } from '../services/categoryService';
import { useSnackbar } from '../context/SnackbarContext';
import { Typography } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

export default function AddCategoryForm({ handleClose, isLoading, setIsLoading, refreshCategories }) {
    const showSnackbar = useSnackbar();
    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required('field is required')
            .matches(/^[\p{L}\p{N}\s\-_]+$/u, { message: 'only numbers, letters, dash and underscore.'})
            .min(2, 'min. 2 makrs')
            .max(50, 'max. 50 marks')
        });

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validateOnBlur: false,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            addCategory(values, resetForm, showSnackbar, setIsLoading, refreshCategories, handleClose);
        },
    });

    const handleCancel = () => {
        handleClose();
        formik.resetForm();
    }

    return(
        <Stack className='AddCategoryForm' component='form' onSubmit={formik.handleSubmit}>
            <Typography variant='h2'>Add category</Typography>
            <Stack direction='column' 
                sx={{
                    my: 3,
                    justifyItems: 'center',
                    alignItems: 'flex-start'
                }}
            >
                <Stack direction='row'>
                    <Typography variant='caption' sx={{ whiteSpace: 'nowrap' }}>Category name</Typography>
                    <Typography variant='caption' color='error' mx='0.2rem'>
                        {formik.touched.name && formik.errors.name ? formik.errors.name : ' '}
                    </Typography>
                </Stack>
                <TextField
                    autoFocus
                    autoComplete='off'
                    id='name'
                    type='text'
                    name='name'
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                />
            </Stack>
            <Stack direction='row'
                sx={{
                    width: '100%',
                    gap: 1,
                }}
            >
                <Button
                    fullWidth
                    onClick={handleCancel}
                    startIcon={<ClearRoundedIcon />}
                    variant='contained'
                    color='error'
                    sx={{
                        height: '3rem',
                        borderRadius: '4px'
                    }}
                >
                    Cancel
                </Button>
                <Button
                    fullWidth
                    startIcon={<CheckRoundedIcon />}
                    type='submit'
                    disabled={isLoading}
                    variant='contained'
                    sx={{
                        height: '3rem',
                        borderRadius: '4px'
                    }}
                >
                    Add
                </Button>
            </Stack>
        </Stack>
    )
}