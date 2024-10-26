import { toast } from "react-toastify"
import { setCallBack } from "../redux/trashCanSlice"
import * as requests from "../utils/httpRequets"

export const getrashCan = async (option) => {
    try {
        const res = await requests.get("trashcans", option)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const createTrashCan = async (data, option, callback, dispatch, navigate) => {
    const pendingToastId = toast.info('submiting...', { autoClose: false });
    try {
        const res = await requests.post("trashcans", data, option)
        dispatch(setCallBack(!callback))
        toast.update(pendingToastId, {
            render: res.message,
            autoClose: 4000,
            type: "success"
        });
        return res
    } catch (error) {
        console.log(error)
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

export const updateTrashCan = async (id, data, option, callback, dispatch, navigate) => {
    const pendingToastId = toast.info('submiting...', { autoClose: false });
    try {
        const res = await requests.put(`trashcans/${id}`, data, option)
        dispatch(setCallBack(!callback))
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
        if (error?.response?.status === 401) {
            navigate(0)
        }
    }
}

export const deleteTrashCan = async (id, option, callback, dispatch, navigate) => {
    const pendingToastId = toast.info('submiting...', { autoClose: false });
    try {
        const res = await requests.del(`trashcans/${id}`, option)
        dispatch(setCallBack(!callback))
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
        if (error?.response?.status === 401) {
            navigate(0)
        }
    }
}    
