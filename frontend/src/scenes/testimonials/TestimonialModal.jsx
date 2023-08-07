import { TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { addCourse, editCourse } from "../../store/course-slice";
import { useDispatch, useSelector } from "react-redux";
import { courseModalActions } from "../../store/course_modal-slice";
import AddImage from "../../utils/AddImage";
import CustomModal from "../../ui/CustomModal";
import { testimonialModalActions } from "../../store/testimonial_modal-slice";
import { addTestimonial, editTestimonial } from "../../store/testimonial-slice";

const TestimonialModal = () => {

    const dispatch = useDispatch()
    const { mode, open, status, testimonial } = useSelector(state => state.testimonial_modal)

    const [imageFile, setImageFile] = useState(undefined)

    const nameRef = useRef()
    const designationRef = useRef()
    const contentRef = useRef()

    useEffect(() => {
        setImageFile(testimonial.image)
    }, [testimonial])

    const createTestimonialHandler = () => {
        const body = {
            name: nameRef.current.value,
            designation: designationRef.current.value,
            content: contentRef.current.value,
            image: imageFile,
        }
        if (mode === 'add') {
            dispatch(addTestimonial(body))
        }
        else {
            dispatch(editTestimonial({ _id: testimonial._id, ...body }))
        }
    }

    const closeModal = () => {
        dispatch(testimonialModalActions.closeModal())
    }

    return (
        <CustomModal
            open={open}
            onClose={closeModal}
            title={mode === 'add' ? 'Create Testimonial' : 'Edit Testimonial'}
            status={status}
            onSave={createTestimonialHandler}  >
            <AddImage imageLink={imageFile} setImageLink={setImageFile} />
            <TextField
                fullWidth
                required
                defaultValue={testimonial.name || ''}
                inputRef={nameRef}
                sx={{ margin: '4px 0' }}
                id="standard-basic"
                label="Name"
                variant="standard" />
            <TextField
                fullWidth
                defaultValue={testimonial.designation || ''}
                inputRef={designationRef}
                sx={{ margin: '4px 0' }}
                id="standard-basic"
                label="Designation"
                variant="standard" />
            <TextField
                fullWidth
                defaultValue={testimonial.content || ''}
                inputRef={contentRef}
                sx={{ margin: '4px 0' }}
                id="standard-multiline-static"
                label="Content"
                multiline
                rows={4}
                variant="standard"
            />
            {status === 'error' && <Typography color='error' >Server is currently down.</Typography>}
        </CustomModal>)
}

export default TestimonialModal;