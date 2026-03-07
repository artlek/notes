
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';
import { fetchCategories, deleteCategories } from '../services/categoryService';
import { useOutletContext } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MainMenu from './MainMenu.jsx';
import MenuBar from './MenuBar.jsx';
import NoItems from './NoItems';
import Logo from './Logo';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ActionButtons from './ActionButtons.jsx';
import AddCategoryForm from './AddCategoryForm.jsx';
import EditCategoryForm from './EditCategoryForm.jsx';
import CategoryHeader from './CategoryHeader.jsx';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MainDrawer from './MainDrawer.jsx';
import BackButton from './BackButton.jsx';
import PageContent from './PageContent.jsx';
import { Box } from '@mui/material';

export default function Categories() {
    const navigate = useNavigate();
    const showSnackbar = useSnackbar();
    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories, isLoading, setIsLoading] = useOutletContext();
    const [openMainMenu, setOpenMainMenu] = useState(false);
    const [openAddCategoryDrawer, setOpenAddCategoryDrawer] = useState(false);
    const [openEditCategoryDrawer, setOpenEditCategoryDrawer] = useState(false);
  
    const toggleMainMenu = (newOpen) => {
        setOpenMainMenu(newOpen);
    };
    const refreshCategories = () => {
        fetchCategories(setCategories, setIsLoading, showSnackbar);
    }
    const onBackClick = () => {
        navigate('/');
    }
    const handleDelete = () => {
        if (selectedCategories.length === 0) return;
        deleteCategories(selectedCategories, setSelectedCategories, setIsLoading, refreshCategories, showSnackbar);
        setSelectedCategories([]);
    }
    const handleOpenAddCategoryDrawer = () => {
        setOpenAddCategoryDrawer(true);
    }
    const handleCloseAddCategoryDrawer = () => {
        setOpenAddCategoryDrawer(false);
    }
    const handleOpenEditCategoryDrawer = () => {
        setOpenEditCategoryDrawer(true);
    }
    const handleCloseEditCategoryDrawer = () => {
        setOpenEditCategoryDrawer(false);
    }
    
    const actionButtons = (
        <ActionButtons>
            { selectedCategories.length > 0 &&
                <Button onClick={handleDelete} >
                    <DeleteIcon />
                </Button>
            }
            {
                selectedCategories.length === 1 &&
                <Button onClick={handleOpenEditCategoryDrawer} >
                    <EditIcon />
                </Button>
            }
            <Button onClick={handleOpenAddCategoryDrawer}>
                <AddIcon />
            </Button>
        </ActionButtons>
    )

    const handleToggle = (value) => () => {
        const currentIndex = selectedCategories.indexOf(value);
        const newChecked = [...selectedCategories];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setSelectedCategories(newChecked);
    };

    return (
        <Stack className='Categories' direction='column' sx={{ m: 1 }}>

            <MenuBar>
                <MainMenu openMainlMenu={openMainMenu} toggleMainMenu={toggleMainMenu} />
                <Stack direction='row' gap={2} width='100%' justifyContent='center'
                    sx={{
                        justifyContent: 'flex-end',
                    }}
                >
                    { isMobile ? (actionButtons) : (<Box width='100%' display='flex' justifyContent='center'><Logo /></Box>) }
                </Stack>
            </MenuBar>

            <MainDrawer openMainDrawer={openAddCategoryDrawer} handleCloseMainDrawer={handleCloseAddCategoryDrawer}>
                <AddCategoryForm handleClose={handleCloseAddCategoryDrawer} isLoading={isLoading} setIsLoading={setIsLoading} refreshCategories={refreshCategories} />
            </MainDrawer>

            <MainDrawer openMainDrawer={openEditCategoryDrawer} handleCloseMainDrawer={handleCloseEditCategoryDrawer}>
                <EditCategoryForm 
                    categoryId={selectedCategories[0]}
                    handleClose={handleCloseEditCategoryDrawer}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    refreshCategories={refreshCategories} />
            </MainDrawer>

            <CategoryHeader>
                <BackButton onClick={onBackClick} />
                <Typography variant='h1' flexGrow={1}>Categories</Typography>
                {!isMobile && actionButtons}
            </CategoryHeader>
            <PageContent>
                <List sx={{ width: '100%', opacity: isLoading ? 0.3 : 1, pointerEvents: isLoading ? 'none' : 'auto' }}>
                    {
                        categories && categories.length !== 0 ? (
                                <>
                                    {categories.map((category) => {
                                        const categoryId = `checkbox-list-category-${category.id}`;
                                        return (
                                            <ListItem key={category.id} disableGutters
                                                sx={(theme) => ({
                                                    py: 0,
                                                    borderBottom: `1px solid ${theme.palette.divider}`,
                                                })}>
                                                <ListItemButton role={undefined} onClick={handleToggle(category.id)}
                                                    sx={{
                                                        '& .MuiListItemIcon-root': {
                                                            minWidth: '2.5rem'
                                                        }
                                                    }}>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge='start'
                                                            checked={selectedCategories.indexOf(category.id) !== -1}                                                        tabIndex={-1}
                                                            disableRipple
                                                            icon={<RadioButtonUncheckedIcon />} 
                                                            checkedIcon={<CheckCircleIcon />} 
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        id={categoryId} 
                                                        primary={category.name} 
                                                        sx={{
                                                            '& .MuiListItemText-primary': {
                                                                color: 'text.primary',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap',
                                                            },
                                                        }}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </>
                            ) : (
                                <NoItems />
                            )
                        }
                </List>
            </PageContent>
        </Stack>
    );
}