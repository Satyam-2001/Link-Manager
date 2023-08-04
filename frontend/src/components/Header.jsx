import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, IconButton, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import MDEditor from './MDEditor';
import { tokens } from "../theme";
import DesignTabLayout from '../ui/DesignTabLayout';
import CustomizeAccordion from '../ui/CustomizeAccordion';
import AddImage from '../utils/AddImage';




const Header = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [imageLink, setImageLink] = useState()


    return (
        <DesignTabLayout title='Header'>
            <CustomizeAccordion title='Headar Body'>
                <AccordionDetails>
                    <MDEditor />
                </AccordionDetails>
            </CustomizeAccordion>
            <CustomizeAccordion title='Headar Image'>
                <AccordionDetails>
                    <AddImage imageLink={imageLink} setImageLink={setImageLink} />
                </AccordionDetails>
            </CustomizeAccordion>
        </DesignTabLayout>
    )
}

export default Header