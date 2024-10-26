import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../redux/userSlice";
import { checkToken } from "../services/userService";


const useCheckToken = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);

    useEffect(() => {
        const getTrashCan = async () => {
            await checkToken(dispatch, token);
        }
        getTrashCan()
    }, [dispatch, token]);

}

export default useCheckToken;