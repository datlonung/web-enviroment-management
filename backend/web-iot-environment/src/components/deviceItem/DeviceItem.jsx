import classNames from "classnames/bind";
import styles from "./DeviceItem.module.scss";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { deleteDeviceToReplaceDeviceFake } from "../../services/deviceService";

const cx = classNames.bind(styles);

function DeviceItem({ navigate, token, device, index, handleDeleteDevice, handleReloadDevice }) {

    useEffect(() => {
        if (!device.device_connected) {
            toast.error(`Device ${device.mac_address} is disconnected`, { autoClose: 900 })
        } else {
            toast.success(`Device ${device.mac_address} is connected`, { autoClose: 900 })
        }
        // eslint-disable-next-line
    }, [device.device_connected])


    useEffect(() => {
        const deleteDevicee = async () => {
            try {
                await deleteDeviceToReplaceDeviceFake(device.mac_address, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }, navigate)
            } catch (error) {
                console.log(error);
            }
        }
        if (!device.virtual) {
            deleteDevicee()
        }
        // eslint-disable-next-line
    }, [device.virtual])

    return (
        <div className={cx("device", "card")} style={{ width: "210px", margin: "5px", borderRadius: "9px" }} key={index}>
            <div className={cx("device_info")}>
                <h2>{device.mac_address}</h2>
                <h3>{device.status}</h3>
                <h3>{device.level_gauges}</h3>
                <h3>{device.trash_level_present}</h3>
                <h3>{device.virtual && <>virtual</>}</h3>
                <h3>{device.device_connected ? <>connnected</> : <>disconnnected</>}</h3>
            </div>
            {device.virtual ? <button className="button-29" onClick={() => handleDeleteDevice(device.mac_address)}>remove</button> : <button className="button-30" onClick={() => handleReloadDevice(device.mac_address)} >check</button>}
        </div>
    )
}

export default DeviceItem