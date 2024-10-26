import { toast } from "react-toastify";
import { setLogin, setToken, setUser } from "../redux/userSlice";
import requests from "../utils/httpRequets";

export const login = async (email, password, dispatch) => {
    const pendingToastId = toast.info('submiting...', { autoClose: false });
    try {
        const res = await requests.post("users/login-admin", { email, password });
        dispatch(setUser(res.data.user));
        dispatch(setToken(res.data.token));
        dispatch(setLogin(true));
        toast.update(pendingToastId, {
            render: "Login success",
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
};

export const checkToken = async (dispatch, token) => {
    try {
        await requests.get("users/check-token", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(setLogin(true));
    } catch (error) {
        dispatch(setLogin(false));
        dispatch(setUser({}));
        dispatch(setToken(''));
        toast.error("Token expired, please login again");
    }
};