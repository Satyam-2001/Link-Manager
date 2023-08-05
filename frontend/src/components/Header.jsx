import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, IconButton, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import MDEditor from './MDEditor';
import { tokens } from "../theme";
import DesignTabLayout from '../ui/DesignTabLayout';
import CustomizeAccordion from '../ui/CustomizeAccordion';
import AddImage from '../utils/AddImage';
import { useDispatch, useSelector } from "react-redux";
import { designActions } from '../store/design-slice';


const Header = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const dispatch = useDispatch()

    const { header_body, header_image } = useSelector(state => state.design.current_design)


    const setHeaderBodyHandler = (value) => {
        dispatch(designActions.updateDesign({ header_body: value }))
    }

    const setHeaderImageHandler = (value) => {
        dispatch(designActions.updateDesign({ header_image: value }))
    }


    return (
        <DesignTabLayout title='Header'>
            <CustomizeAccordion title='Headar Body'>
                <AccordionDetails>
                    <MDEditor value={header_body} setValue={setHeaderBodyHandler} />
                </AccordionDetails>
            </CustomizeAccordion>
            <CustomizeAccordion title='Headar Image'>
                <AccordionDetails>
                    <AddImage imageLink={header_image} setImageLink={setHeaderImageHandler} />
                </AccordionDetails>
            </CustomizeAccordion>
        </DesignTabLayout>
    )
}

export default Header