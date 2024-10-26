import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    trashCans: [],
    error: false,
    loading: false,
    success: false,
    callBack: false,
    message_error: '',
};

const trashCanSlice = createSlice({
    name: 'trashCan',
    initialState,
    reducers: {
        setTrashCans: (state, action) => {
            state.trashCans = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
        setMessageError: (state, action) => {
            state.message_error = action.payload;
        },
        setCallBack: (state, action) => {
            state.callBack = action.payload;
        },
    },
});

export const { setTrashCans, setError, setLoading, setSuccess, setMessageError,setCallBack } = trashCanSlice.actions;
export const selectTrashCans = (state) => state.trashCan.trashCans;
export const selectCallBack = (state) => state.trashCan.callBack;
export const selectError = (state) => state.trashCan.error;
export const selectLoading = (state) => state.trashCan.loading;
export const selectSuccess = (state) => state.trashCan.success;
export const selectMessageError = (state) => state.trashCan.message_error;
export default trashCanSlice.reducer;
