import { Box, Button, Container, IconButton, InputAdornment, styled, TextField, Typography, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import { tokens } from "../../theme";
import Topbar from "../global/Topbar";
import { Fragment, useEffect, useState } from "react";
import CoursesList from "./CoursesList";
import { callAPI } from "../../services/callAPI";
import { useDispatch, useSelector } from "react-redux";
import { courseModalActions } from "../../store/course_modal-slice";
import CourseModal from "./CourseModal";

const CssTextField = styled(TextField)({
  // '& label.Mui-focused': {
  //   color: 'green',
  // },
  // '& .MuiInput-underline:after': {
  //   borderBottomColor: 'green',
  // },
  '& .MuiOutlinedInput-root': {
    // '& fieldset': {
    //   borderColor: 'red',
    // },
    // '&:hover fieldset': {
    //   borderColor: 'yellow',
    // },
    '&.Mui-focused fieldset': {
      borderWidth: '1px',
    },
  },
});

const Courses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch()
  const { courses } = useSelector(state => state.course)

  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [filteredCourses, setFilteredCourses] = useState([])

  const handleChangeValue = (event) => {
    setSearchValue(event.target.value)
    setFilteredCourses(courses.filter((course => course.title.includes(event.target.value))))
  }

  const addCourseMadalHandler = () => {
    dispatch(courseModalActions.addCourse())
  }

  return (
    <Fragment>
      <CourseModal />
      <Box display='flex' flexDirection='column' sx={{ height: '100vh' }}>
        <Topbar title="COURSES" />

        <Box display="flex" width={1} p={1} my={1}>

          {/* 'SEARCH BAR' */}
          <Box flexGrow={1} px={1}>
            <CssTextField
              fullWidth
              type="search"
              // label="Search"
              value={searchValue}
              onChange={handleChangeValue}
              autoComplete="false"
              placeholder="Search Course..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={addCourseMadalHandler}>
            Create Course
          </Button>

        </Box>

        <CoursesList courses={filteredCourses} isLoading={isLoading} />

      </Box>
    </Fragment>
  )
};

export default Courses;