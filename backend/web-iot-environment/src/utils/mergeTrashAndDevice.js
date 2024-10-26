import { setMerged } from "../redux/deviceSlice";
import { setTrashCans } from "../redux/trashCanSlice";
import produce from "immer";

const mergeTrashAndDevice = (trashCans, devices, dispatch) => {
    const id_mac_in_trash_child = []
    if (trashCans && devices) {
        const updatedTrashCans = produce(trashCans, draft => {
            draft?.forEach(trashCan => {
                trashCan?.trash_child?.forEach(trash => {
                    id_mac_in_trash_child.push(trash.id_mac_of_device)
                    const device = devices.find(device => trash.id_mac_of_device === device.mac_address);
                    if (device) {
                        trash.level_gauges = device.level_gauges === 0 ? trash.level_gauges : device.level_gauges;
                        trash.status = device.status === '' ? trash.status : device.status;
                        trash.trash_level_present = device.trash_level_present === 0 ? trash.trash_level_present : device.trash_level_present;
                        trash.merged = true;
                        dispatch(setMerged({ mac_address: device.mac_address, merged: true }));
                    }
                });
            });
        });
        dispatch(setTrashCans(updatedTrashCans));
        const deviceNoFoundInTrashChild = devices.filter(device => !id_mac_in_trash_child.includes(device.mac_address))
        deviceNoFoundInTrashChild.forEach(device => {
            dispatch(setMerged({ mac_address: device.mac_address, merged: false }));
        });

    }
};

export default mergeTrashAndDevice;
