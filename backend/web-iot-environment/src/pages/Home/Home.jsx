import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectDevices, setDeviceConnectedReload } from "../../redux/deviceSlice";
import GoongMap from "../../components/Googmap/GoongMap";
import { selectTrashCans } from "../../redux/trashCanSlice";
import { useEffect, useState } from "react";
import { selectToken, selectUser } from "../../redux/userSlice";
import AddDevice from "../../components/addDevice/AddDevice";
import { useNavigate } from 'react-router-dom';
import { deleteDevice } from "../../services/deviceService";
import DeviceItem from "../../components/deviceItem/DeviceItem";

// eslint-disable-next-line
const cx = classNames.bind(styles);
function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const trashCans = useSelector(selectTrashCans)
  const token = useSelector(selectToken)
  const [trashCanss, setTrashCanss] = useState([])
  const devices = useSelector(selectDevices)
  const user = useSelector(selectUser)

  useEffect(() => {
    setTrashCanss(trashCans)
  }, [trashCans])


  const handleDeleteDevice = async (macAddress) => {
    const newDevices = devices.filter(device => device.mac_address !== macAddress)
    await deleteDevice(macAddress, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }, dispatch, newDevices, navigate)
  }

  const handleReloadDevice = async (macAddress) => {
    dispatch(setDeviceConnectedReload({ mac_address: macAddress, device_connected: false }))
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <h1 className={cx("container_title")}>Welcome Admin {user?.user_name}</h1>
        <h4 className={cx("container_des")}> All systems are running smoothly! You have 3 unread alerts!</h4>

        <div className={cx("map")}>
          {trashCanss?.length > 0 && <GoongMap trashCans={trashCanss} />}
        </div>
        <div className="d-flex" style={{ flexWrap: "wrap", width: "100%" }}>
          {devices?.map((device, index) => (
            <DeviceItem navigate={navigate} token={token} device={device} key={index} index={index} handleDeleteDevice={handleDeleteDevice} handleReloadDevice={handleReloadDevice} />
          ))}
          <AddDevice />
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  //children: PropTypes.node.isRequired,
};

export default Home;


