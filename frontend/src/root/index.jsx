import React, { Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";


const Application = (props) => {

    const { courses, status } = useSelector(state => state.course)

    return (
        <Box minHeight={'100%'} sx={{backgroundColor: 'rgba(10, 10, 10, 0.4)'}}>
            <img src='https://wallpapershome.com/images/wallpapers/love-image-7680x4320-8k-21486.jpg' width='100%' />
        </Box>
    )
}

export default Application