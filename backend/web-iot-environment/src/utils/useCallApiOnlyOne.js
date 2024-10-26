import { useEffect } from "react";
import { getrashCan } from "../services/trashCanService";
import { useDispatch, useSelector } from "react-redux";
import { selectCallBack, setLoading, setMessageError, setSuccess, setTrashCans } from "../redux/trashCanSlice";
import { setError } from "../redux/mqttSilice";


const useCallApiOnlyOne = () => {
    const dispatch = useDispatch();
    const callBack = useSelector(selectCallBack);

    useEffect(() => {
        const getTrashCan = async () => {
            dispatch(setLoading(true))
            try {
                const data = await getrashCan();
                dispatch(setTrashCans(data))
                dispatch(setLoading(false))
                dispatch(setSuccess(true))
            } catch (error) {
                dispatch(setError(true))
                dispatch(setMessageError(error.message))
                dispatch(setLoading(false))
                dispatch(setSuccess(false))
            }
        }
        getTrashCan()
    }, [dispatch, callBack]);

}

export default useCallApiOnlyOne;