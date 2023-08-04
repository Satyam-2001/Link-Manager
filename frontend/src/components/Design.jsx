import React, { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, IconButton, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { borderTop } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { designActions } from "../store/design-slice";
import Header from './Header'
import Footer from "./Footer";
import Theme from "./Theme";
import Application from "../root";


const Design = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const dispatch = useDispatch()
    const { tab } = useSelector(state => state.design)

    const buttonStyle = {
        color: theme.palette.action.active,
        backgroundColor: colors.primary[500]
    }

    const switchDesignScreenHandler = (value) => {
        dispatch(designActions.switchTab(value))
    }

    const designScreens = ['Header', 'Footer', 'Theme']

    return (
        <Box display="flex" flexDirection="column" sx={{ height: '100%' }} overflow={'auto'}>
            <Paper elevation={3}>
                <ToggleButtonGroup value={tab} variant="text" aria-label="text button group" fullWidth>
                    {designScreens.map((value) => {
                        return <ToggleButton key={value} sx={buttonStyle} value={value} onClick={() => switchDesignScreenHandler(value)}>{value}</ToggleButton >
                    })}
                </ToggleButtonGroup >
            </Paper >
            <Stack direction='row' flexGrow={1} overflow={'auto'}>
                <Box
                    display="flex" flexDirection="column"
                    width='40%'
                    // sx={{ backgroundColor: colors.primary[400] }}
                    overflow={'auto'}
                >
                    {tab === 'Header' && <Header />}
                    {tab === 'Footer' && <Footer />}
                    {tab === 'Theme' && <Theme />}
                </Box>
                <Box width='60%'>
                    <Application />
                </Box>
            </Stack>
            <Paper elevation={2}>
                <Stack direction='row' justifyContent='flex-end' gap={1} p={1}>
                    <Button variant="outlined">
                        Reset
                    </Button>
                    <Button
                        variant="contined"
                        sx={{
                            color: 'white',
                            backgroundColor: theme.palette.primary.main,
                        }}>
                        Save
                    </Button>
                </Stack>
            </Paper>
        </Box >
    );
}

export default Design;