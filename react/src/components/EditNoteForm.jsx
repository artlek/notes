import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { editNote, fetchNote } from '../services/noteService';
import { useSnackbar } from '../context/SnackbarContext';
import { Typography } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

export default function EditNoteForm({ note, handleClose, isLoading, setIsLoading, setNote }) {
    const showSnackbar = useSnackbar();
    const navigate = useNavigate();
    const [categories] = useOutletContext();
    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .transform((value) => (value ? value.replace(/\s{2,}/g, ' ').trim() : value))
            .required('field is required')
            .matches(/^[\p{L}\p{N}\s\-_]+$/u, { message: 'only numbers, letters, dash and underscore.'})
            .min(2, 'min. 2 makrs')
            .max(50, 'max. 50 marks'),
        description: yup
            .string()
            .transform((value) => (value ? value.replace(/\s{2,}/g, ' ').trim() : value))
            .trim()
            .matches(/^[\p{L}\p{N}\-_]+( [\p{L}\p{N}\-_]+)*$/u, { message: 'only numbers, letters, dash and underscore.'})
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

    const categoryId = note?.Category?.['@id'] 
        ? note.Category['@id'].split('/').pop() 
        : '';

    const formik = useFormik({
        initialValues: {
            name: note?.name || '',
            description: note?.description || '',
            categoryId: categoryId,
        },
        enableReinitialize: true,
        validateOnBlur: false,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            const transformedValues = validationSchema.cast(values);
            const payload = {
                name: transformedValues.name,
                description: transformedValues.description,
                Category: transformedValues.categoryId
            };
            editNote(note, payload, setIsLoading, handleClose, showSnackbar, fetchNote, setNote, resetForm, navigate);
        },
    });

    const handleCancel = () => {
        handleClose();
        formik.resetForm();
    }
    
    return(
        <Stack className='EditNoteForm' component='form' onSubmit={formik.handleSubmit} gap={2}>
            <Typography variant='h2'>Edit note</Typography>
            <Stack direction='column' 
                sx={{
                    justifyItems: 'center',
                    alignItems: 'flex-start'
                }}
            >
                <Stack direction='row'>
                    <Typography variant='caption' sx={{ whiteSpace: 'nowrap' }}>Name</Typography>
                    <Typography variant='caption' color='error' mx='0.2rem'>
                        {formik.touched.name && formik.errors.name ? formik.errors.name : ' '}
                    </Typography>
                </Stack>
                <TextField
                    autoFocus
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
                <Stack direction='column' 
                    sx={{
                        justifyItems: 'center',
                        alignItems: 'flex-start'
                    }}
                >
                    <Stack direction='row'>
                        <Typography variant='caption' sx={{ whiteSpace: 'nowrap' }}>Description</Typography>
                        <Typography variant='caption' color='error' mx='0.2rem'>
                            {formik.touched.description && formik.errors.description ? formik.errors.description : ' '}
                        </Typography>
                    </Stack>
                    <TextField
                        id='description'
                        type='text'
                        name='description'
                        fullWidth
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                    />
                   </Stack>
                <Stack direction='column' 
                    sx={{
                        justifyItems: 'center',
                        alignItems: 'flex-start'
                    }}
                >
                <Stack direction='row'>
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
                    mt: 2,
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
                    Save
                </Button>
            </Stack>
        </Stack>
    )
}