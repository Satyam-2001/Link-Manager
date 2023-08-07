import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import MDEditor from "../../components/MDEditor";
import Topbar from "../global/Topbar";
import Design from "../../components/Design";

const Description = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" flexDirection="column" sx={{ height: '100vh' }}>
      <Topbar title="Design"/>
      <Box flex={1} overflow={'auto'}>
        <Design />
      </Box>
    </Box>
  )
};

export default Description;
