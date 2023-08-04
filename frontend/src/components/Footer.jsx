import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, IconButton, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import MDEditor from './MDEditor';
import { tokens } from "../theme";
import DesignTabLayout from '../ui/DesignTabLayout';
import CustomizeAccordion from '../ui/CustomizeAccordion';




const Footer = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <DesignTabLayout title='Footer'>
            <MDEditor />
        </DesignTabLayout>
    )
}

export default Footer