import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stack, Typography, CardActionArea, CardActions, Popover, useTheme } from "@mui/material";
import ReactMarkdown from 'react-markdown'
// import emarkGfm from 'emark-gfm'
import Grid from '@mui/material/Grid';
import Fade from 'react-reveal/Fade';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ReactCardFlip from 'react-card-flip';
import { tokens } from "../../theme";
import CircularProgress from '@mui/material/CircularProgress';
import { ErrorOccured } from '../../ui/StaticMessage';
import Coverflow from 'react-coverflow'


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
                    borderRadius: '1em',
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
                    borderRadius: '1em',
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
                        <Typography variant="h4" color="rgb(240, 240, 240)" fontSize={'1em'} >
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

const TestimonialCard = ({ testimonial }) => {
    const { name, designation, content, image } = testimonial
    return (
        <Card sx={{ backgroundColor: 'rgb(22,27,34)', color: 'white', minWidth: '160px', maxWidth: '200px' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"
                />
                <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        <span class="text-gradient">{name}</span>
                    </Typography>
                    <Typography gutterBottom variant="h6">
                        {designation}
                    </Typography>
                    <Typography variant="body2" fontSize={'0.65rem'} sx={{ color: "rgb(230, 230, 230)" }}>
                        {content}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

const TestimonialsSmallCardContainer = ({ testimonials }) => {
    return (
        <div
            className="cards-container"
        >
            {testimonials.map(testimonial => {
                return <div className="card" ><TestimonialCard key={testimonial._id} testimonial={testimonial} /></ div>
            })}
        </div>)
};


const TestimonialsLargeCardContainer = ({ testimonials }) => {
    return (
        <Coverflow
            width={'100%'}
            height={480}
            displayQuantityOfSide={2}
            navigation={false}
            enableHeading={false}
        >
            {testimonials.map(testimonial => {
                return <TestimonialCard key={testimonial._id} testimonial={testimonial} />
            })}
        </Coverflow>)
};

const Testimonials = () => {
    const { background_color, text_color, footer_body, header_image, header_body } = useSelector(state => state.design.current_design)
    const { testimonials } = useSelector(state => state.testimonial)

    return (<Box color={text_color} py={2} sx={{ px: { xs: 3, md: 8 } }} fontSize={'1em'} overflowX='auto'>
        <Typography variant='h1' color={text_color} fontWeight={700} fontSize={'4rem'} textAlign='center'>
            <span class="text-gradient">Testimonials</span>
        </Typography>
        <Box sx={{ mx: { xs: 3, md: 8 }, my: { xs: 2, md: 5 }, display: { xs: 'block', md: 'none' }, overflow: 'auto' }} >
            <TestimonialsSmallCardContainer testimonials={testimonials} />
        </Box>
        <Box sx={{ mx: { xs: 3, md: 8 }, my: { xs: 2, md: 5 }, display: { xs: 'none', md: 'block' }, overflow: 'auto' }} >
            <TestimonialsLargeCardContainer testimonials={testimonials} />
        </Box>
    </Box>)

    return (
        <Box overflow='auto' width='100%'>
            <Fade bottom>
                < Box color={text_color} py={2} sx={{ px: { xs: 3, md: 8 } }
                } fontSize={'1em'} overflow='auto' >
                    <Typography variant='h1' color={text_color} fontWeight={700} fontSize={'4rem'} textAlign='center'>
                        <span class="text-gradient">Testimonials</span>
                    </Typography>
                    <Box sx={{ mx: { xs: 3, md: 8 }, boxSizing: 'content-box', my: { xs: 2, md: 5 }, overflow: 'auto' }} >
                        <TestimonialsSmallCardContainer testimonials={testimonials} />
                    </Box>
                </Box >
            </Fade >
        </Box>
    )
}

const Layout = (props) => {
    let { background_color, text_color, footer_body, header_image, header_body } = useSelector(state => state.design.current_design)

    background_color = background_color === '' ? 'rgb(14, 14, 14)' : background_color;
    const [anchorEl, setAnchorEl] = useState(null);

    const openPopOver = Boolean(anchorEl)

    return (
        <Box minHeight={'100%'} display='flex' flexDirection='column' justifyContent='center' sx={{ backgroundColor: background_color, width: '100%', fontSize: { xs: '12px', sm: '14px', md: '16px' } }} overflow='auto'>
            <Box width='100%' display='flex' justifyContent={'space-between'} color={text_color} sx={{ zIndex: 5, backgroundColor: background_color, top: 0, px: { xs: 4, md: 8 }, py: { xs: 4, md: 3 } }}>
                <img src={require('../../assets/logo.png')} width='35px' height='35px' />
                <Box display='flex' justifyContent='center' flexDirection={'row'} alignItems='center'>
                    <a href='#courses'>
                        <Typography fontSize={'1.2em'} fontFamily='Poppins,sans-serif' >Courses</Typography>
                    </a>
                    {/* <Button variant="text" endIcon={<ExpandMoreIcon />} onClick={handleClick} sx={{ color: text_color, textTransform: 'none' }}>
                        <Typography fontSize={'1.2em'} fontFamily='Poppins,sans-serif' >More</Typography>
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
                        <Stack sx={{ backgroundColor: 'rgb(22,27,34)', borderRadius: '0.5em' }} p={2} gap={1}>
                            <Stack direction={'row'} alignItems='center' gap={1}>
                                <img src={'https://www.jsmastery.pro/_next/static/media/YouTube-gradient.86b2223b.svg'} height={20} />
                                <Button
                                    variant='text'
                                    sx={{ textTransform: 'none', color: 'rgb(200, 200, 200)', fontSize: '0.9em', letterSpacing: '0.01em', display: 'flex', justifyContent: 'space-between' }}>
                                    Useful Youtube Videos
                                </Button>
                            </Stack>
                            <Stack direction={'row'} alignItems='center' gap={2}>
                                <img src={'https://www.jsmastery.pro/_next/static/media/guides.6def5cfb.svg'} height={25} />
                                <Button
                                    variant='text'
                                    sx={{ textTransform: 'none', color: 'rgb(200, 200, 200)', fontSize: '0.9em', letterSpacing: '0.01em', display: 'flex', justifyContent: 'space-between' }}>
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
        <Grid container justifyContent={'center'} spacing={8} sx={{ p: { xs: 4, md: 8 } }}>
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
                                <Typography variant='h1' color={text_color} fontWeight={700} sx={{ fontSize: { xs: '3.5em', sm: '5em' } }} m={0}>
                                    <span class="text-gradient">KnowleXpanse</span>
                                </Typography>
                                <Typography color={text_color} fontSize={'1.2em'} my={2}>
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
                    <Box color={text_color} py={2} sx={{ px: { xs: 3, md: 8 } }} fontSize={'1em'}>
                        <ReactMarkdown>{header_body}</ReactMarkdown>
                    </Box>
                </Fade>
                <Box id='courses' display='flex' flexDirection={'column'} justifyContent={'center'} mt={4}>
                    <Fade bottom>
                        <Typography variant='h1' color={text_color} fontWeight={700} fontSize={'4rem'} textAlign='center'>
                            Comprehensive <span class="text-gradient">Course</span><br /> and  <span class="text-gradient">Personalized Guidance</span>
                        </Typography>
                    </Fade>
                    <CourseGrid />
                </Box>

                <Testimonials />

                <Box color={text_color} px={2} py={1} fontSize={'1em'} sx={{ backgroundColor: 'rgb(22,27,34)', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
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