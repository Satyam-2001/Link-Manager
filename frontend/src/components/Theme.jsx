import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Divider, Box, Button, ButtonGroup, IconButton, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import MDEditor from './MDEditor';
import { tokens } from "../theme";
import DesignTabLayout from '../ui/DesignTabLayout';
import CustomizeAccordion from '../ui/CustomizeAccordion';
import { MuiColorInput } from 'mui-color-input'
import { useDispatch, useSelector } from "react-redux";
import designSlice, { designActions } from '../store/design-slice';



const Theme = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [fontColor, setFontColor] = useState('white')

    const dispatch = useDispatch()

    const { background_color, text_color } = useSelector(state => state.design.current_design)

    const setBackgoundColor = (value) => {
        dispatch(designActions.updateDesign({ background_color: value }))
    }

    const setTextColor = (value) => {
        dispatch(designActions.updateDesign({ text_color: value }))
    }


    return (
        <DesignTabLayout title='Theme'>
            <Stack direction='row' justifyContent='space-between' alignItems={'center'} mb={1}>
                <Typography variant='h5' fontWeight={500}>Background Color</Typography>
                <MuiColorInput value={background_color} onChange={setBackgoundColor} />
            </Stack>
            {/* <Divider /> */}
            <Stack direction='row' justifyContent='space-between' alignItems={'center'} my={1}>
                <Typography variant='h5' fontWeight={500}>Text Color</Typography>
                <MuiColorInput value={text_color} onChange={setTextColor} />
            </Stack>
        </DesignTabLayout>
    )
}

export default Theme