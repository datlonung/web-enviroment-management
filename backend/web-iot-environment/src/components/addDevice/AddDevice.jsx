import { useEffect, useState } from "react";
import { selectTrashCans } from "../../redux/trashCanSlice";
import { selectDevices } from "../../redux/deviceSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addDevice } from "../../services/deviceService";
import { selectToken } from "../../redux/userSlice";

function AddDevice() {
    const [macAddress, setMacAddress] = useState('');
    const trashCans = useSelector(selectTrashCans)
    const [macAddressToCompareDevices, setMacAddressToCompareDevices] = useState([])
    const [macAddressToCompareTrashCans, setMacAddressToCompareTrashCans] = useState([])
    const devices = useSelector(selectDevices)
    const token = useSelector(selectToken);

    useEffect(() => {
        if (devices) {
            setMacAddressToCompareDevices(devices?.map(device => device.mac_address))
        }
        if (trashCans) {
            setMacAddressToCompareTrashCans(trashCans?.map(trashCan => trashCan?.trash_child?.map(trash => trash?.id_mac_of_device)).flat())
        }
    }, [trashCans, devices])


    const handleInputChange = (event) => {
        setMacAddress(event.target.value);
    };


    const handleSubmit = async () => {
        try {
            if (!macAddress.trim()) {
                toast.error('Please enter mac address')
                return;
            }

            const similarMacAddress = macAddressToCompareDevices.some(mac => mac === macAddress.trim())
            const similarMacAddressTrashCan = macAddressToCompareTrashCans.some(mac => mac === macAddress.trim())
            if (similarMacAddress || similarMacAddressTrashCan) {
                toast.error('Mac address already exists or is used by trash can')
                return;
            }

            const macAddressPattern = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
            if (!macAddressPattern.test(macAddress.trim())) {
                toast.error('Invalid mac address')
                return;
            }
            const data = {
                mac_a: macAddress.trim(),
                virtual: true
            }
            const option = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            await addDevice(data, option)
        } catch (error) {
            console.log(error);
        }


    };


    return (
        <div className="mb-3 d-flex align-items-end">
            <div style={{ marginRight: "5px", width: "215px" }}>
                <input
                    type="text"
                    className="form-control"
                    value={macAddress}
                    onChange={handleInputChange}
                    placeholder="Add virtual device, please enter mac address"
                />
            </div>
            <div style={{ width: "90px" }}>
                <button className="button-28" onClick={handleSubmit}>Add device</button>
            </div>
        </div>
    )
}

export default AddDevice