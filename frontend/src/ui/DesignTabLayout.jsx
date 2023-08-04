import React, { useState } from 'react'
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const DesignTabLayout = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box p={2} sx={{ overflow: 'auto' }} >
            <Typography variant="h5" fontWeight={600} letterSpacing={'2px'} sx={{ textTransform: 'uppercase' }} >Customize {props.title}</Typography>
            <Stack mt={2}>
                {props.children}
            </Stack>
        </Box>
    )
}

export default DesignTabLayout