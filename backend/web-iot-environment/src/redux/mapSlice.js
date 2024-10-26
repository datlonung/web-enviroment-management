import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    map: {},
    goongjs: {},
    errorMap: false,
    errorMapMessage: '',
};

const mqttSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMapp: (state, action) => {
            state.map = action.payload
        },
        setGoongjs: (state, action) => {
            state.goongjs = action.payload
        },
        setErrorMap: (state, action) => {
            state.errorMap = action.payload
        },
        errorMapMessage: (state, action) => {
            state.errorMapMessage = action.payload
        }
    },
});

export const { setMapp, setGoongjs,setErrorMap, errorMapMessage } = mqttSlice.actions;
export const selectGoongjs = (state) => state.map.goongjs;
export const selectErrorMapMessage = (state) => state.map.errorMapMessage;
export const selectErrorMap = (state) => state.map.errorMap;
export const selectMap = (state) => state.map.map;
export default mqttSlice.reducer;
