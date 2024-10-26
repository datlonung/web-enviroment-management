import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mqttClient: {},
    connecting: false,
    connected: false,
    disconnected: false,
    reconnecting: false,
    message: {},
    error: false,
    subscribed: {},
};

const mqttSlice = createSlice({
    name: 'mqtt',
    initialState,
    reducers: {
        setConnecting: (state, action) => {
            state.connecting = action.payload;
        },
        setConnected: (state, action) => {
            state.connected = action.payload
        },
        setDisconnected: (state, action) => {
            state.disconnected = action.payload
        },
        setReconnecting: (state, action) => {
            state.reconnecting = action.payload
        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setSubscribed: (state, action) => {
            state.subscribed = action.payload
        },
        setMqttClient: (state, action) => {
            state.mqttClient = action.payload
        }
    },
});

export const { setConnecting, setConnected, setDisconnected, setReconnecting, setMessage, setError, setSubscribed, setMqttClient } = mqttSlice.actions;
export const selectConnecting = (state) => state.mqtt.connecting;
export const selectConnected = (state) => state.mqtt.connected;
export const selectDisconnected = (state) => state.mqtt.disconnected;
export const selectMqttClient = (state) => state.mqtt.mqttClient;
export default mqttSlice.reducer;
