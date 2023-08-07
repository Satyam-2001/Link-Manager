import { Box, Button, CircularProgress, IconButton, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { StyledModal } from "./StyledModal";


const CustomModal = ({ open, title, onClose, status, onSave, children }) => {

    const theme = useTheme();

    return (
        <StyledModal open={open} onClose={onClose} color={theme.palette.background.default} width='40vw'>
            <Box display='flex' justifyContent='space-between' alignItems='center' width={1}>
                <Typography variant='h5'>
                    {title}
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box m={1} gap={1}>
                {children}
            </Box>

            <Box display='flex' justifyContent='flex-end' alignItems='center' gap={1}>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contined"
                    onClick={onSave}
                    disabled={status === 'loading'}
                    sx={{
                        color: 'white',
                        backgroundColor: theme.palette.primary.main,
                    }}
                >
                    {status === 'loading' ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Save'}
                </Button>
            </Box>
        </StyledModal>
    )
};

export default CustomModal;