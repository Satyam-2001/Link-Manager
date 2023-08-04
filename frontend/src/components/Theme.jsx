import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Divider,Box, Button, ButtonGroup, IconButton, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import MDEditor from './MDEditor';
import { tokens } from "../theme";
import DesignTabLayout from '../ui/DesignTabLayout';
import CustomizeAccordion from '../ui/CustomizeAccordion';
import { MuiColorInput } from 'mui-color-input'


const Theme = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [backgoundColor, setBackgoundColor] = useState('white')
    const [fontColor, setFontColor] = useState('white')


    return (
        <DesignTabLayout title='Theme'>
            <Stack direction='row' justifyContent='space-between' alignItems={'center'} mb={1}>
                <Typography variant='h5' fontWeight={500}>Background Color</Typography>
                <MuiColorInput value={backgoundColor} onChange={setBackgoundColor} />
            </Stack>
            {/* <Divider /> */}
            <Stack direction='row' justifyContent='space-between' alignItems={'center'} my={1}>
                <Typography variant='h5' fontWeight={500}>Text Color</Typography>
                <MuiColorInput value={fontColor} onChange={setFontColor} />
            </Stack>
        </DesignTabLayout>
    )
}

export default Theme