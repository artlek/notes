import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addNote } from '../services/noteService';
import { useSnackbar } from '../context/SnackbarContext';
import { Typography } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useOutletContext } from 'react-router-dom';

export default function AddNoteForm({ handleClose, isLoading, setIsLoading, refreshNotes }) {
    const showSnackbar = useSnackbar();
    const [categories] = useOutletContext();
    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .transform((value) => (value ? value.replace(/\s{2,}/g, ' ').trim() : value))
            .required('note name is required')
            .matches(/^[\p{L}\p{N}\-_]+( [\p{L}\p{N}\-_]+)*$/u, { message: 'name: allowed only numbers, letters, dash and underscore.'})
            .min(2, 'name: min. 2 makrs.')
            .max(50, 'name: max. 50 marks in name field'),
        description: yup
            .string()
            .transform((value) => (value ? value.replace(/\s{2,}/g, ' ').trim() : value))
            .trim()
            .matches(/^[\p{L}\p{N}\-_]+( [\p{L}\p{N}\-_]+)*$/u, { message: 'description:. allowed only numbers, letters, dash and underscore.'})
            .min(2, 'description: min. 2 makrs')
            .max(50, 'description: max. 50 marks')
            .nullable(),
        categoryId: yup
            .string()
            .nullable()
            .transform((value) => {
                if (!value || value === '') return null;
                return String(value).startsWith('/api/categories/') 
                    ? value 
                    : `/api/categories/${value}`;
            })
        });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            categoryId: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            const transformedValues = validationSchema.cast(values);
            const payload = {
                name: transformedValues.name,
                description: transformedValues.description,
                Category: transformedValues.categoryId
            };
            addNote(payload, resetForm, showSnackbar, setIsLoading, refreshNotes, handleClose);
        },
    });

    const handleCancel = () => {
        handleClose();
        formik.resetForm();
    }
    
    return(
        <Stack className='AddNoteForm' component='form' onSubmit={formik.handleSubmit}>
            <Typography variant='h2'>Add note</Typography>
            <Stack direction='column' 
                sx={{
                    my: 3,
                    justifyItems: 'center',
                    alignItems: 'flex-start'
                }}
            >
                <Stack direction='row'>
                    <Typography variant='caption' sx={{ whiteSpace: 'nowrap' }}>Note name</Typography>
                    <Typography variant='caption' color='error' mx='0.2rem'>
                        {formik.touched.name && formik.errors.name ? formik.errors.name : ' '}
                    </Typography>
                </Stack>
                <TextField
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
                <Stack direction='row' sx={{ mt: 2 }}>
                    <Typography variant='caption' sx={{ whiteSpace: 'nowrap' }}>Note description</Typography>
                    <Typography variant='caption' color='error' mx='0.2rem'>
                        {formik.touched.description && formik.errors.description ? formik.errors.description : ' '}
                    </Typography>
                </Stack>
                <TextField
                    autoComplete='off'
                    id='description'
                    type='text'
                    name='description'
                    fullWidth
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                />
                <Stack direction='row' sx={{ mt: 2 }}>
                    <Typography variant='caption' sx={{ whiteSpace: 'nowrap' }}>Category</Typography>
                    <Typography variant='caption' color='error' mx='0.2rem'>
                        {formik.touched.categoryId && formik.errors.categoryId ? formik.errors.categoryId : ' '}
                    </Typography>
                </Stack>
                <Select
                    displayEmpty
                    id='categoryId'
                    name='categoryId'
                    fullWidth
                    onChange={formik.handleChange}
                    value={formik.values.categoryId}
                    onBlur={formik.handleBlur}
                    error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                >
                    <MenuItem value=''>
                        <em>Uncategorized</em>
                    </MenuItem>
                    {
                        categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                        ))
                    }
                </Select>
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