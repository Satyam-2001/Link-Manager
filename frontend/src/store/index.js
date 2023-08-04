import { configureStore } from '@reduxjs/toolkit';

import courseModal from './course_modal-slice';
import courseSlice from './course-slice';
import designSlice from './design-slice';

const store = configureStore({
    reducer: { course: courseSlice.reducer, course_modal: courseModal.reducer, design: designSlice.reducer },
});

export default store;