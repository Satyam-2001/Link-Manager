import { Box, useTheme, Stack, Skeleton, IconButton } from "@mui/material";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { tokens } from "../../theme";
import { Fragment, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useSelector, useDispatch } from 'react-redux'
import { orderDownCourse, orderUpCourse, removeCourse } from '../../store/course-slice'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ImageIcon from '@mui/icons-material/Image';
import { courseModalActions } from "../../store/course_modal-slice";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Message = ({ message, icon }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box
            display='flex'
            flexDirection='column'
            flexGrow={1}
            alignItems='center'
            justifyContent='center'
            sx={{ opacity: 0.3 }}>
            {icon({ fontSize: "large", sx: { color: colors.grey[500], fontSize: '100px' } })}
            <Typography variant='h2' fontWeight={500} color={colors.grey[500]} >
                {message}
            </Typography>
        </Box>
    )
}

const ErrorOccured = () => {
    return <Message message={'Unknown Error Occured!'} icon={(prop) => <ErrorOutlineIcon {...prop} />} />
}

const NoCourseExist = () => {
    return <Message message={'No Course Exist!'} icon={(prop) => <SearchOffIcon {...prop} />} />
}

const DummyImage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return <ImageIcon
        sx={{
            height: '100%',
            width: '100%',
            color: 'rgba(0, 0, 0, 0.3)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '3px'
        }} />
}

const CourseCard = ({ course }) => {

    const dispatch = useDispatch()

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [expanded, setExpanded] = useState(false)

    const removeCourseHandler = () => {
        dispatch(removeCourse(course._id))
    }

    const openLinkHandler = () => {
        let url = course.url
        if (!course.url.startsWith('https:')) {
            url = 'https://' + url
        }
        window.open(url, '_blank');
    }

    const openEditModal = () => {
        dispatch(courseModalActions.editCourse(course))
    }

    const orderUpHandler = () => {
        dispatch(orderUpCourse(course._id))
    }

    const orderDownHandler = () => {
        dispatch(orderDownCourse(course._id))
    }

    return (
        <Fragment>
            <Accordion
                expanded={expanded}
                // onChange={() => setExpanded(prop => !prop)}
                sx={{ backgroundColor: colors.primary[500], margin: '0 0 6px 0' }}>
                <AccordionSummary
                    expandIcon={<IconButton onClick={() => setExpanded(prop => !prop)}><ExpandMoreIcon /></IconButton>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header">
                    <Stack
                        direction='row'
                        gap={1}
                        flexGrow={1}>
                        <Box width={'70px'} height={'55px'} display={'flex'} alignItems={'center'} justifyContent={'center'} >
                            {course.image ? <img src={course.image} style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: '3px' }} /> : <DummyImage />}
                        </Box>
                        <Stack direction={'row'} justifyContent={'space-between'} flexGrow={1}>
                            <Stack px={3} flexGrow={1}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {course.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {course.url}
                                </Typography>
                            </Stack>
                            <Stack direction={'row'} justifyContent={'flex-end'} px={2} gap={1}>
                                <IconButton onClick={orderUpHandler} >
                                    <ArrowUpwardIcon sx={{ color: theme.palette.primary.main }} />
                                </IconButton>
                                <IconButton onClick={orderDownHandler} >
                                    <ArrowDownwardIcon sx={{ color: theme.palette.primary.main }} />
                                </IconButton>
                                <IconButton onClick={openLinkHandler} >
                                    <OpenInNewIcon sx={{ color: theme.palette.primary.main }} />
                                </IconButton>
                                <IconButton onClick={openEditModal} >
                                    <EditOutlinedIcon sx={{ color: theme.palette.primary.main }} />
                                </IconButton>
                                <IconButton onClick={removeCourseHandler} >
                                    <DeleteOutlinedIcon sx={{ color: theme.palette.primary.main }} />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Stack >
                </AccordionSummary>

                <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                        Description
                    </Typography>
                    <Typography>
                        {course.description || 'No description to show'}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Fragment>
    )
}

const CourseSkeleton = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box px={2} overflow={'auto'} gap={1}>
            {
                Array.from({ length: 3 }, (v, i) => {
                    return (
                        <Stack key={i} direction='row' height='70px' p={1} flexGrow={1} gap={1} sx={{ backgroundColor: colors.primary[500], margin: '0 0 6px 0' }}>
                            <Skeleton key={i} variant="rectangular" width='60px' height='50px' />
                            <Stack justifyContent='space-around' >
                                <Skeleton variant="rectangular" width='140px' height='14px' sx={{ borderRadius: '4px' }} />
                                <Skeleton variant="rectangular" width='90px' height='14px' sx={{ borderRadius: '4px' }} />
                            </Stack>
                            <Stack direction='row' flexGrow={1} gap={1} alignItems='center' justifyContent='flex-end'>
                                <Skeleton variant="circular" width='30px' height='30px' />
                                <Skeleton variant="circular" width='30px' height='30px' />
                                <Skeleton variant="circular" width='30px' height='30px' />
                            </Stack>
                        </Stack>)
                })
            }
        </Box>
    )
}

const CoursesList = () => {

    const { courses, status } = useSelector(state => state.course)

    // return <CourseSkeleton />
    // return <ErrorOccured />


    if (status === 'loading') {
        return <CourseSkeleton />
    }

    if (status === 'error') {
        return <ErrorOccured />
    }

    if (courses.length === 0) {
        return <NoCourseExist />
    }

    return (
        <Box px={2} overflow={'auto'}>
            {courses.map(course => {
                return (
                    <CourseCard key={course._id} course={course} />
                )
            })}
        </Box>
    )
};

export default CoursesList;