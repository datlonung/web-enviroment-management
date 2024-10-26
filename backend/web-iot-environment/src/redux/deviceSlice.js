import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    mac_address_to_add_device: '',
    device: []
};

const findDeviceByMacAddress = (state) => {
    return state.device.find(device => device.mac_address === state.mac_address_to_add_device);
};

const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setMacAddressToAddDevice: (state, action) => {
            state.mac_address_to_add_device = action.payload;
        },
        setMacAddress: (state, action) => {
            const device = findDeviceByMacAddress(state);
            if (device) {
                device.mac_address = action.payload;
            } else {
                state.device.push({
                    mac_address: action.payload,
                    level_gauges: 0,
                    status: '',
                    device_connected: true,
                    trash_level_present: 0,
                    merged: false,
                    mergedChild: false,
                    virtual: false,
                })
            }
        },
        setLevelGauges: (state, action) => {
            const device = findDeviceByMacAddress(state);
            if (device) {
                device.level_gauges = action.payload;
            }
        },
        setTrashLevelPresent: (state, action) => {
            const device = findDeviceByMacAddress(state);
            if (device) {
                device.trash_level_present = action.payload;
            }
        },
        setStatus: (state, action) => {
            const device = findDeviceByMacAddress(state);
            if (device) {
                device.status = action.payload;
            }
        },
        setDeviceConnected: (state, action) => {
            const device = findDeviceByMacAddress(state);
            if (device) {
                device.device_connected = action.payload;
            }
        },
        setVirtual: (state, action) => {
            const device = findDeviceByMacAddress(state);
            if (device) {
                device.virtual = action.payload;
            }
        },
        setMerged: (state, action) => {
            const device = state.device.find(device => device.mac_address === action.payload.mac_address);
            if (device) {
                device.merged = action.payload.merged;
            }
        },
        setMergedChild: (state, action) => {
            const device = state.device.find(device => device.mac_address === action.payload.mac_address);
            if (device) {
                device.mergedChild = action.payload.mergedChild;
            }
        },
        setDevices: (state, action) => {
            state.device = action.payload;
        },
        setDeviceConnectedReload: (state, action) => {
            const device = state.device.find(device => device.mac_address === action.payload.mac_address);
            if (device) {
                device.device_connected = action.payload.device_connected;
            }
        }
    }
});


export const {
    setMacAddress,
    setLevelGauges,
    setTrashLevelPresent,
    setStatus,
    setDeviceConnected,
    setMacAddressToAddDevice,
    setMerged,
    setMergedChild,
    setVirtual,
    setDevices,
    setDeviceConnectedReload
} = deviceSlice.actions;


export const selectDevices = (state) => state.device.device;
export default deviceSlice.reducer;
