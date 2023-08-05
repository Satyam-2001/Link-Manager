import { createSlice } from '@reduxjs/toolkit';
import { callAPI } from '../services/callAPI';
import { courseModalActions } from './course_modal-slice';

const initialState = {
    status: 'loading',
    courses: []
}

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setFields(state, action) {
            state.status = action.payload.status
            state.courses = action.payload.courses
            state.courses.sort((a, b) => a.index - b.index)
        },
        addCourse(state, action) {
            state.courses.push(action.payload)
            state.courses.sort((a, b) => a.index - b.index)
        },
        editCourse(state, action) {
            const index = state.courses.findIndex((course) => course._id === action.payload._id)
            if (index === -1) {
                return
            }
            state.courses[index] = action.payload
        },
        removeCourse(state, action) {
            state.courses = state.courses.filter((course) => course._id !== action.payload)
        },
        orderUpCourse(state, action) {
            const index = state.courses.findIndex((course) => course._id === action.payload)
            if (index == 0) { return; }
            const temp = state.courses[index];
            state.courses[index] = state.courses[index - 1]
            state.courses[index - 1] = temp;
            state.courses[index].index = index
            state.courses[index - 1].index = index - 1
        },
        orderDownCourse(state, action) {
            const index = state.courses.findIndex((course) => course._id === action.payload)
            if (index == state.courses.length - 1) { return; }
            const temp = state.courses[index];
            state.courses[index] = state.courses[index + 1]
            state.courses[index + 1] = temp;
        }
    },
});

export const courseActions = courseSlice.actions;

export const getCourseData = () => {
    return async (dispatch) => {
        dispatch(courseActions.setFields(initialState))
        try {
            const courses = await callAPI('get', 'course', undefined)
            dispatch(courseActions.setFields({ status: 'sucess', courses }))
        } catch {
            dispatch(courseActions.setFields({ status: 'error' }))
        }
    }
}

export const addCourse = (new_course) => {
    return async (dispatch) => {
        try {
            dispatch(courseModalActions.setStatus('loading'))
            const course = await callAPI('post', 'course', new_course)
            dispatch(courseActions.addCourse(course))
            dispatch(courseModalActions.closeModal())
        } catch {
            dispatch(courseModalActions.setStatus('error'))
        }
    }
}

export const removeCourse = (course_id) => {
    return async (dispatch) => {
        try {
            dispatch(courseActions.removeCourse(course_id))
            await callAPI('delete', `course/${course_id}`)
        } catch {

        }
    }
}

export const editCourse = (course) => {
    return async (dispatch) => {
        try {
            dispatch(courseModalActions.setStatus('loading'))
            await callAPI('patch', 'course', course)
            dispatch(courseActions.editCourse(course))
            dispatch(courseModalActions.closeModal())
        } catch {
            dispatch(courseModalActions.setStatus('error'))
        }
    }
}

export const orderUpCourse = (courseId) => {
    return async (dispatch) => {
        try {
            dispatch(courseActions.orderUpCourse(courseId))
            await callAPI('post', 'orderup', { id: courseId })
        } catch (e) {

        }
    }
}

export const orderDownCourse = (courseId) => {
    return async (dispatch) => {
        try {
            dispatch(courseActions.orderDownCourse(courseId))
            await callAPI('post', 'orderdown', { id: courseId })
        } catch (e) {

        }
    }
}

export default courseSlice;