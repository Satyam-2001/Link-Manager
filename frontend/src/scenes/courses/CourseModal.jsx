import { TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { addCourse, editCourse } from "../../store/course-slice";
import { useDispatch, useSelector } from "react-redux";
import { courseModalActions } from "../../store/course_modal-slice";
import AddImage from "../../utils/AddImage";
import CustomModal from "../../ui/CustomModal";

const CourseModal = () => {

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
        <CustomModal
            open={open}
            onClose={closeModal}
            title={mode === 'add' ? 'Create Course' : 'Edit Course'}
            status={status}
            onSave={createCourseHandler}  >
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
        </CustomModal>)
}

export default CourseModal;