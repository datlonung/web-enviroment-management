import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    user: {},
    login: false,
    token: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLogin: (state, action) => {
            state.login = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }
    },
});

export const { setUser, setToken, setLogin } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectLogin = (state) => state.user.login;
export const selectToken = (state) => state.user.token;

export default userSlice.reducer;
