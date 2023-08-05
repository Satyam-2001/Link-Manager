import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, IconButton, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import MDEditor from './MDEditor';
import { tokens } from "../theme";
import DesignTabLayout from '../ui/DesignTabLayout';
import CustomizeAccordion from '../ui/CustomizeAccordion';
import { useDispatch, useSelector } from "react-redux";
import { designActions } from '../store/design-slice';




const Footer = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const dispatch = useDispatch()

    const { footer_body } = useSelector(state => state.design.current_design)


    const setFooterBodyHandler = (value) => {
        dispatch(designActions.updateDesign({ footer_body: value }))
    }


    return (
        <DesignTabLayout title='Footer'>
            <MDEditor value={footer_body} setValue={setFooterBodyHandler} />
        </DesignTabLayout>
    )
}

export default Footer