import { setMergedChild } from "../redux/deviceSlice";

const mergeTrashAndDeviceDetail = (trash, device, dispatch) => {
    const id_mac_in_trash_child = []
    if (trash?.trash_child && device) {
        trash?.trash_child.forEach(trashChild => {
            id_mac_in_trash_child.push(trashChild.id_mac_of_device)
            const deviceDetail = device.find(device => trashChild.id_mac_of_device === device.mac_address);
            if (deviceDetail) {
                dispatch(setMergedChild({ mac_address: deviceDetail.mac_address, mergedChild: true }));
            }
        });
        const deviceNoFoundInTrashChild = device.filter(device => !id_mac_in_trash_child.includes(device.mac_address))
        deviceNoFoundInTrashChild.forEach(device => {
            dispatch(setMergedChild({ mac_address: device.mac_address, mergedChild: false }));
        });
    }

};

export default mergeTrashAndDeviceDetail;