import { createSlice } from '@reduxjs/toolkit';
import { callAPI } from '../services/callAPI';

const defaultDesign = {
    header_body: "",
    header_image: "",
    footer_body: "",
    background_color: "",
    text_color: "",
    card_color: "",
}

const initialState = {
    tab: 'Header',
    original_design: defaultDesign,
    current_design: defaultDesign,
}

const designSlice = createSlice({
    name: 'design',
    initialState,
    reducers: {
        setDesign(state, action) {
            state.original_design = action.payload
            state.current_design = action.payload
        },
        resetDesgin(state, action) {
            state.current_design = state.original_design
        },
        saveDesign(state, action) {
            state.original_design = state.current_design
        },
        updateDesign(state, action) {
            state.current_design = action.payload
        },
        switchTab(state, action) {
            state.tab = action.payload
        }
    },
});

export const designActions = designSlice.actions;

export const getDesign = () => {
    return async (dispatch) => {
        try {
            const design = await callAPI('get', 'design')
            dispatch(designActions.setDesign(design))
        } catch {
        }
    }
}

export const saveDesign = (design) => {
    return async (dispatch) => {
        try {
            await callAPI('post', 'design')
            dispatch(designActions.saveDesign(design))
        } catch {
        }
    }
}

export default designSlice;