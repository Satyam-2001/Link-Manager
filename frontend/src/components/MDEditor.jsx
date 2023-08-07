import { Box, useTheme } from "@mui/material";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { tokens } from "../theme";

const mdParser = new MarkdownIt(/* Markdown-it options */);


const MDEditor = ({ value, setValue }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    function handleEditorChange({ html, text }) {
        setValue(text)
    }

    return (
        <Box flex={1} overflow={'auto'} >
            <MdEditor
                style={{ height: '100%', minHeight: '250px' }}
                value={value}
                renderHTML={text => mdParser.render(text)}
                onChange={handleEditorChange}
                view={{ html: true, md: true }}
                canView={{ html: true }}
            />
        </Box>
    );
}

export default MDEditor;