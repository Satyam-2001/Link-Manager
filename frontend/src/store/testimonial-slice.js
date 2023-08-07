import { createSlice } from '@reduxjs/toolkit';
import { callAPI } from '../services/callAPI';
import { testimonialModalActions } from './testimonial_modal-slice';

const initialState = {
    status: 'loading',
    testimonials: []
}

const testimonialSlice = createSlice({
    name: 'testimonial',
    initialState,
    reducers: {
        setFields(state, action) {
            state.status = action.payload.status
            state.testimonials = action.payload.testimonials
            state.testimonials.sort((a, b) => a.index - b.index)
        },
        addTestimonial(state, action) {
            state.testimonials.push(action.payload)
        },
        editTestimonial(state, action) {
            const index = state.testimonials.findIndex((testimonial) => testimonial._id === action.payload._id)
            if (index === -1) {
                return
            }
            state.testimonials[index] = action.payload
        },
        removeTestimonial(state, action) {
            state.testimonials = state.testimonials.filter((testimonial) => testimonial._id !== action.payload)
        },
        orderUpTestimonial(state, action) {
            const index = state.testimonials.findIndex((testimonial) => testimonial._id === action.payload)
            if (index == 0) { return; }
            const temp = state.testimonials[index];
            state.testimonials[index] = state.testimonials[index - 1]
            state.testimonials[index - 1] = temp;
            state.testimonials[index].index = index
            state.testimonials[index - 1].index = index - 1
        },
        orderDownTestimonial(state, action) {
            const index = state.testimonials.findIndex((testimonial) => testimonial._id === action.payload)
            if (index == state.testimonials.length - 1) { return; }
            const temp = state.testimonials[index];
            state.testimonials[index] = state.testimonials[index + 1]
            state.testimonials[index + 1] = temp;
        }
    },
});

export const testimonialActions = testimonialSlice.actions;

export const getTestimonialData = () => {
    return async (dispatch) => {
        dispatch(testimonialActions.setFields(initialState))
        try {
            const testimonials = await callAPI('get', 'testimonial')
            dispatch(testimonialActions.setFields({ status: 'sucess', testimonials }))
        } catch {
            dispatch(testimonialActions.setFields({ status: 'error' }))
        }
    }
}

export const addTestimonial = (new_testimonial) => {
    return async (dispatch) => {
        try {
            dispatch(testimonialModalActions.setStatus('loading'))
            const testimonial = await callAPI('post', 'testimonial', new_testimonial)
            dispatch(testimonialActions.addTestimonial(testimonial))
            dispatch(testimonialModalActions.closeModal())
        } catch (e) {
            dispatch(testimonialModalActions.setStatus('error'))
        }
    }
}

export const removeTestimonial = (testimonial_id) => {
    return async (dispatch) => {
        try {
            dispatch(testimonialActions.removeTestimonial(testimonial_id))
            await callAPI('delete', `testimonial/${testimonial_id}`)
        } catch {

        }
    }
}

export const editTestimonial = (testimonial) => {
    return async (dispatch) => {
        try {
            dispatch(testimonialModalActions.setStatus('loading'))
            await callAPI('patch', 'testimonial', testimonial)
            dispatch(testimonialActions.editTestimonial(testimonial))
            dispatch(testimonialModalActions.closeModal())
        } catch {
            dispatch(testimonialModalActions.setStatus('error'))
        }
    }
}

export const orderUpTestimonial = (testimonialId) => {
    return async (dispatch) => {
        try {
            dispatch(testimonialActions.orderUpTestimonial(testimonialId))
            await callAPI('post', 'testimonial/orderup', { id: testimonialId })
        } catch (e) {

        }
    }
}

export const orderDownTestimonial = (testimonialId) => {
    return async (dispatch) => {
        try {
            dispatch(testimonialActions.orderDownTestimonial(testimonialId))
            await callAPI('post', 'testimonial/orderdown', { id: testimonialId })
        } catch (e) {

        }
    }
}

export default testimonialSlice;