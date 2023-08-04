import { useEffect, useState } from "react";
// import MDEditor from '@uiw/react-md-editor';
// import rehypeSanitize from "rehype-sanitize";
import { Box, Button, IconButton, Paper, Typography, useTheme } from "@mui/material";
// import axios from "axios";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { tokens } from "../theme";

const mdParser = new MarkdownIt(/* Markdown-it options */);


const MDEditor = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [content, setContent] = useState('')

    // useEffect(() => {
    //     const getData = async () => {
    //         return await axios.get('/api/home')
    //     }
    //     getData().then((data) => {
    //         setContent(data.data);
    //     })
    // }, [])

    function handleEditorChange({ html, text }) {
        setContent(text)
    }

    return (
        <Box flex={1} overflow={'auto'} >
            <MdEditor
                style={{ height: '100%', minHeight: '250px' }}
                value={content}
                renderHTML={text => mdParser.render(text)}
                onChange={handleEditorChange}
                view={{ html: true, md: true }}
                canView={{ html: true }}
            />
        </Box>
    );
}

export default MDEditor;