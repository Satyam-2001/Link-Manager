import { Box, Button, CircularProgress, IconButton, TextField, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { tokens } from "../../theme";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useRef, useState } from "react";
import { StyledModal } from "../../ui/StyledModal";
import { useDropZone } from "../../hooks/useDropZone";
import { addCourse, editCourse } from "../../store/course-slice";
import { useDispatch, useSelector } from "react-redux";
import { deleteMedia, uploadMedia } from "../../services/uploadMedia";
import { courseModalActions } from "../../store/course_modal-slice";
import AddImage from "../../utils/AddImage";


const CourseModal = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const dispatch = useDispatch()
    const { mode, open, status, course } = useSelector(state => state.course_modal)

    const [imageFile, setImageFile] = useState(undefined)

    const titleRef = useRef()
    const urlRef = useRef()
    const descriptionRef = useRef()

    useEffect(() => {
        setImageFile(course.image)
    }, [course])


    const createCourseHandler = () => {
        const body = {
            title: titleRef.current.value,
            url: urlRef.current.value,
            description: descriptionRef.current.value,
            image: imageFile,
        }
        if (mode === 'add') {
            dispatch(addCourse(body))
        }
        else {
            dispatch(editCourse({ _id: course._id, ...body }))
        }
    }

    const closeModal = () => {
        dispatch(courseModalActions.closeModal())
    }


    return (
        <StyledModal open={open} onClose={closeModal} color={theme.palette.background.default} width='40vw'>
            <Box display='flex' justifyContent='space-between' alignItems='center' width={1}>
                <Typography variant='h5'>
                    {mode === 'add' ? 'Create Course' : 'Edit Course'}
                </Typography>
                <IconButton onClick={closeModal}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box m={1} gap={1}>
                <AddImage imageLink={imageFile} setImageLink={setImageFile} />
                <TextField
                    fullWidth
                    required
                    defaultValue={course.title || ''}
                    inputRef={titleRef}
                    sx={{ margin: '4px 0' }}
                    id="standard-basic"
                    label="Title"
                    variant="standard" />
                <TextField
                    fullWidth
                    required
                    defaultValue={course.url || ''}
                    inputRef={urlRef}
                    sx={{ margin: '4px 0' }}
                    id="standard-basic"
                    label="Url"
                    variant="standard" />
                <TextField
                    fullWidth
                    defaultValue={course.description || ''}
                    inputRef={descriptionRef}
                    sx={{ margin: '4px 0' }}
                    id="standard-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    variant="standard"
                />
                {status === 'error' && <Typography color='error' >Server is currently down.</Typography>}
            </Box>

            <Box display='flex' justifyContent='flex-end' alignItems='center' gap={1}>
                <Button variant="outlined" onClick={closeModal}>
                    Cancel
                </Button>
                <Button
                    variant="contined"
                    onClick={createCourseHandler}
                    disabled={status === 'loading'}
                    sx={{
                        color: 'white',
                        backgroundColor: theme.palette.primary.main,
                    }}>
                    {status === 'loading' ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Save'}
                </Button>
            </Box>
        </StyledModal>
    )
};

export default CourseModal;