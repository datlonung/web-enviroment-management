import { useEffect, useState } from 'react'
import classNames from "classnames/bind";
import styles from "./ManagerTrash.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { selectDevices } from '../../redux/deviceSlice';
import mergeTrashAndDevice from '../../utils/mergeTrashAndDevice';
import { selectTrashCans } from '../../redux/trashCanSlice';
import GoongMap from '../../components/Googmap/GoongMap';
import TrashList from '../../components/trashList/TrashList';

const cx = classNames.bind(styles);

function ManagerTrash() {
    const dispatch = useDispatch();
    const devices = useSelector(selectDevices);
    const trashCans = useSelector(selectTrashCans);
    const [trashCanss, setTrashCanss] = useState([]);

    useEffect(() => {
        mergeTrashAndDevice(trashCans, devices, dispatch);
    }, [devices, trashCans, dispatch])

    useEffect(() => {
        setTrashCanss(trashCans);
    }, [trashCans])


    return (
        <div className='p-4' style={{ width: "1400px" }}>
            <TrashList trashCans={trashCanss} stt={1} />

            <div className='d-md-flex' style={{ marginTop: "50px", width: "100%" }}>
                <TrashList trashCans={trashCanss} stt={2} />
                <div className={cx("wrapper-googmap", "flex-1 w-100 card")}>
                    {trashCanss?.length > 0 && <GoongMap trashCans={trashCanss} />}
                </div>
            </div>
        </div >
    )
}

export default ManagerTrash