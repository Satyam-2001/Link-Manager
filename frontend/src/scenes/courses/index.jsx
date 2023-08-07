import { Box, Button, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { tokens } from "../../theme";
import Topbar from "../global/Topbar";
import { Fragment, useState } from "react";
import CoursesList from "./CoursesList";
import { useDispatch, useSelector } from "react-redux";
import { courseModalActions } from "../../store/course_modal-slice";
import CourseModal from "./CourseModal";
import SearchBar from "../../utils/SearchBar";

const Courses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch()
  const { courses } = useSelector(state => state.course)

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
        <Topbar title="Courses" />

        <Box display="flex" width={1} p={1} my={1}>

          <SearchBar value={searchValue} onChange={handleChangeValue} placeholder="Search Course..." />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={addCourseMadalHandler}>
            Create Course
          </Button>

        </Box>

        <CoursesList courses={filteredCourses} />

      </Box>
    </Fragment>
  )
};

export default Courses;