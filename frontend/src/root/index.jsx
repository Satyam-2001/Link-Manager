import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stack, Typography, CardActionArea, CardActions, Popover, useTheme } from "@mui/material";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Grid from '@mui/material/Grid';
import MarkdownIt from 'markdown-it';
import Fade from 'react-reveal/Fade';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ReactCardFlip from 'react-card-flip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { tokens } from "../theme";
import CircularProgress from '@mui/material/CircularProgress';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';



const mdParser = new MarkdownIt(/* Markdown-it options */);

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

const CustomCard = ({ course }) => {

    const [isFlipped, setIsFlipped] = useState(false)

    const openLinkHandler = () => {
        let url = course.url
        if (!course.url.startsWith('https:')) {
            url = 'https://' + url
        }
        window.open(url, '_blank');
    }

    return (
        <ReactCardFlip isFlipped={isFlipped}>
            <Card
                onClick={() => setIsFlipped(prop => !prop)}
                sx={{
                    backgroundColor: 'rgb(22,27,34)',
                    color: 'white',
                    borderRadius: '1rem',
                    height: '300px'
                }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="250"
                        image={course.image}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography variant="h5" component="div" fontFamily={'Poppins, sans-serif'}>
                            {course.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card
                onClick={() => setIsFlipped(prop => !prop)}
                sx={{
                    backgroundColor: 'rgb(22,27,34)',
                    color: 'white',
                    borderRadius: '1rem',
                    height: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '4px 4px 4px 4px',
                    overflow: 'auto'
                }}>
                <CardActionArea>
                    <CardContent >
                        <Typography gutterBottom variant="h3" component="div">
                            {course.title}
                        </Typography>
                        <Typography variant="h4" color="rgb(240, 240, 240)" fontSize={'1rem'} >
                            {course.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button color="primary" variant='contained' onClick={openLinkHandler}>
                        Explore More
                    </Button>
                </CardActions>
            </Card>
        </ReactCardFlip>
    )
}

const Layout = (props) => {
    let { background_color, text_color, footer_body, header_image, header_body } = useSelector(state => state.design.current_design)

    background_color = background_color === '' ? 'rgb(14, 14, 14)' : background_color;
    const [anchorEl, setAnchorEl] = useState(null);

    const openPopOver = Boolean(anchorEl)

    return (
        <Box minHeight={'100%'} display='flex' flexDirection='column' justifyContent='center' sx={{ backgroundColor: background_color, width: '100%' }} overflow='auto'>
            <Box width='100%' display='flex' justifyContent={'space-between'} color={text_color} sx={{ zIndex: 5, backgroundColor: background_color, top: 0, px: { xs: 4, md: 8 }, py: { xs: 4, md: 3 } }}>
                <img src={require('../assets/logo.png')} width='35px' height='35px' />
                <Box display='flex' justifyContent='center' flexDirection={'row'} alignItems='center'>
                    <a href='#courses'>
                        <Typography fontSize={'1.2rem'} fontFamily='Poppins,sans-serif' >Courses</Typography>
                    </a>
                    {/* <Button variant="text" endIcon={<ExpandMoreIcon />} onClick={handleClick} sx={{ color: text_color, textTransform: 'none' }}>
                        <Typography fontSize={'1.2rem'} fontFamily='Poppins,sans-serif' >More</Typography>
                    </Button> */}
                    <Popover
                        open={openPopOver}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(undefined)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{ color: 'rgb(22,27,34)' }}
                        PaperProps={{ sx: { backgroundColor: 'transparent' } }}
                    >
                        <Stack sx={{ backgroundColor: 'rgb(22,27,34)', borderRadius: '0.5rem' }} p={2} gap={1}>
                            <Stack direction={'row'} alignItems='center' gap={1}>
                                <img src={'https://www.jsmastery.pro/_next/static/media/YouTube-gradient.86b2223b.svg'} height={20} />
                                <Button
                                    variant='text'
                                    sx={{ textTransform: 'none', color: 'rgb(200, 200, 200)', fontSize: '0.9rem', letterSpacing: '0.01rem', display: 'flex', justifyContent: 'space-between' }}>
                                    Useful Youtube Videos
                                </Button>
                            </Stack>
                            <Stack direction={'row'} alignItems='center' gap={2}>
                                <img src={'https://www.jsmastery.pro/_next/static/media/guides.6def5cfb.svg'} height={25} />
                                <Button
                                    variant='text'
                                    sx={{ textTransform: 'none', color: 'rgb(200, 200, 200)', fontSize: '0.9rem', letterSpacing: '0.01rem', display: 'flex', justifyContent: 'space-between' }}>
                                    Free Resources and Guide
                                </Button>
                            </Stack>
                        </Stack>
                    </Popover>
                </Box>
            </Box>
            <Stack display='flex' justifyContent={'center'} alignItems={'center'} flexGrow={1} overflow='auto'>
                {props.children}
            </Stack>
        </Box >
    )
}

const CourseGrid = () => {
    const { courses } = useSelector(state => state.course)

    return (
        <Grid container justifyContent={'center'} spacing={8} p={8}>
            {courses.map((course, index) => {
                return (
                    <Grid item xs={12} md={6} justifyContent={'center'} >
                        <Fade left={(index & 1) === 0} right={index & 1}>
                            <CustomCard course={course} />
                        </Fade>
                    </Grid>
                )
            })}
        </Grid>)
}


const Application = (props) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { courses, status } = useSelector(state => state.course)
    const { background_color, text_color, footer_body, header_image, header_body } = useSelector(state => state.design.current_design)

    if (status === 'loading' || header_image === '') {
        return <Layout>
            <CircularProgress sx={{ color: 'rgb(200, 200, 200)' }} />
        </Layout>
    }

    if (!courses) {
        return <Layout><ErrorOccured /></Layout>
    }

    return (
        <Layout>
            <Stack overflow='auto'>
                <Box display={'flex'} width='100%' flexDirection='row' sx={{ px: { xs: 3, md: 8 } }} >
                    <Stack sx={{ width: { xs: '100%', md: '50%' } }} >
                        <Fade left>
                            <Stack>
                                <Typography variant='h1' color={text_color} fontWeight={700} fontSize={'5rem'} m={0}>
                                    <span class="text-gradient">KnowleXpanse</span>
                                </Typography>
                                <Typography color={text_color} fontSize={'1.2rem'} my={2}>
                                    Expand your knowledge with Comprehensive Course and Personalized Support.
                                </Typography>
                                <Button variant='contained' sx={{ width: 200, fontSize: '16px' }} >
                                    <a href='#courses'>
                                        Explore Courses
                                    </a>
                                </Button>
                            </Stack>
                        </Fade>
                    </Stack>
                    {/* </Fade> */}
                    <Stack flexGrow={1} height='80vh' sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Fade right>
                            <img src={header_image} height={'100%'} style={{ objectFit: 'contain' }} />
                        </Fade>
                    </Stack>
                </Box>

                <Fade bottom>
                    <Box color={text_color} py={2} sx={{ px: { xs: 3, md: 8 } }} fontSize={'1rem'}>
                        <ReactMarkdown>{header_body}</ReactMarkdown>
                    </Box>
                </Fade>
                <Box id='courses' display='flex' flexDirection={'column'} justifyContent={'center'} mt={4}>
                    <Fade bottom>
                        <Typography variant='h1' color={text_color} fontWeight={700} fontSize={'3rem'} textAlign='center'>
                            Comprehensice <span class="text-gradient">Courses</span><br />to Help You Become a <span class="text-gradient">Analog Engineer</span>
                        </Typography>
                    </Fade>
                    <CourseGrid />
                </Box>
                <Box color={text_color} px={2} py={1} fontSize={'1rem'} sx={{ backgroundColor: 'rgb(22,27,34)', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <ReactMarkdown>{footer_body}</ReactMarkdown>
                    <Box dispay='flex' flexDirection='row' justifyContent='flex-end' alignItems='center' >
                        Developed By <a href='https://www.linkedin.com/in/satyam-lohiya-536879229/' target={'_blank'} style={{ color: theme.palette.primary.main }}>Satyam Lohiya</a>
                    </Box>
                </Box>
            </Stack>
        </Layout>
    )
}

export default Application