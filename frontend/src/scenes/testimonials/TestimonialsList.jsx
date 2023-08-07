import { Box } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import { orderDownCourse, orderUpCourse, removeCourse } from '../../store/course-slice'
import { courseModalActions } from "../../store/course_modal-slice";
import CustomCard from "../../utils/CustomCard";
import CustomSkeleton from "../../ui/CustomSkeleton";
import { ErrorOccured, NoCourseExist } from '../../ui/StaticMessage'
import { orderDownTestimonial, orderUpTestimonial, removeTestimonial } from "../../store/testimonial-slice";
import { testimonialModalActions } from '../../store/testimonial_modal-slice'

const TestimonialCard = ({ testimonial }) => {

    const dispatch = useDispatch()

    const removeTestimonialHandler = () => {
        dispatch(removeTestimonial(testimonial._id))
    }

    const openLinkHandler = () => {
        // let url = course.url
        // if (!course.url.startsWith('https:')) {
        //     url = 'https://' + url
        // }
        // window.open(url, '_blank');
    }

    const openEditModal = () => {
        dispatch(testimonialModalActions.editTestimonial(testimonial))
    }

    const orderUpHandler = () => {
        dispatch(orderUpTestimonial(testimonial._id))
    }

    const orderDownHandler = () => {
        dispatch(orderDownTestimonial(testimonial._id))
    }

    return <CustomCard
        title={testimonial.name}
        subtitle={testimonial.designation}
        description={testimonial.content}
        image={testimonial.image}
        editHandler={openEditModal}
        exploreHandler={openLinkHandler}
        orderDownHandler={orderDownHandler}
        orderUpHandler={orderUpHandler}
        removeHandler={removeTestimonialHandler}
    />
}

const TestimonialsList = () => {

    const { testimonials, status } = useSelector(state => state.testimonial)


    if (status === 'loading') {
        return <CustomSkeleton />
    }

    if (status === 'error') {
        return <ErrorOccured />
    }

    if (testimonials.length === 0) {
        return <NoCourseExist />
    }

    return (
        <Box px={2} overflow={'auto'}>
            {testimonials.map(testimonial => {
                return (
                    <TestimonialCard key={testimonial._id} testimonial={testimonial} />
                )
            })}
        </Box>
    )
};

export default TestimonialsList;