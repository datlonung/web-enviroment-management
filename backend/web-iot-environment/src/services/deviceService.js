import { toast } from 'react-toastify';
import * as requests from "../utils/httpRequets"
import { setDevices } from '../redux/deviceSlice';


export const addDevice = async (data, option) => {
    const pendingToastId = toast.info('submiting...', { autoClose: false });
    try {
        const res = await requests.post('devices', data, option)
        toast.update(pendingToastId, {
            render: res.message,
            autoClose: 3000,
            type: "success"
        });
        return res
    } catch (error) {
        console.log(error);
        toast.update(pendingToastId, {
            render: error?.response?.data?.message,
            autoClose: 3000,
            type: "error"
        });
    }

}




export const deleteDevice = async (id, option, dispatch, newDevices, navigate) => {
    const pendingToastId = toast.info('submiting...', { autoClose: false });
    try {
        const res = await requests.del(`devices/${id}`, option)
        toast.update(pendingToastId, {
            render: res.message,
            autoClose: 3000,
            type: "success"
        });
        dispatch(setDevices(newDevices))
        return res
    } catch (error) {
        console.log(error);
        toast.update(pendingToastId, {
            render: error?.response?.data?.message,
            autoClose: 3000,
            type: "error"
        });
        if (error?.response?.status === 401) {
            navigate(0)
        }
    }
}
export const deleteDeviceToReplaceDeviceFake = async (id, option, navigate) => {
    const pendingToastId = toast.info('submiting...', { autoClose: false });
    try {
        const res = await requests.del(`devices/${id}`, option)
        toast.update(pendingToastId, {
            render: `Device ${id} is not virtual now, so it will be deleted from the database if it is a real device.`,
            autoClose: 6000,
            type: "success"
        });
        return res
    } catch (error) {
        console.log(error);
        toast.update(pendingToastId, {
            render: error?.response?.data?.message,
            autoClose: 3000,
            type: "error"
        });
        if (error?.response?.status === 401) {
            navigate(0)
        }
    }
}
