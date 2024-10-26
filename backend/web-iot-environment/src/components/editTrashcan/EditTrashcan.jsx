import { Container } from 'react-bootstrap';
import classNames from "classnames/bind";
import styles from "./EditTrashcan.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { selectDevices } from '../../redux/deviceSlice';
import { selectCallBack, selectTrashCans } from '../../redux/trashCanSlice';
import { selectMqttClient } from '../../redux/mqttSilice';
import { useEffect, useState } from 'react';
import images from "../../assets/images";
import { useNavigate, useParams } from 'react-router-dom';
import mergeTrashAndDevice from '../../utils/mergeTrashAndDevice';
import Modall from '../modall/Modall';
import mergeTrashAndDeviceDetail from '../../utils/mergeTrashAndDeviceDetail';
import GoongMap from '../Googmap/GoongMap';
import { updateTrashCan } from '../../services/trashCanService';
import { toast } from 'react-toastify';
import { selectToken } from '../../redux/userSlice';

const cx = classNames.bind(styles);

function EditTrashcan() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(selectToken);
    const devices = useSelector(selectDevices)
    const trashCans = useSelector(selectTrashCans);
    const mqttClient = useSelector(selectMqttClient);
    const callback = useSelector(selectCallBack);
    const [image_thumbnail, setImage_thumbnail] = useState(images.noImgae);
    const [image_area, setImage_area] = useState(images.noImgae);
    const [trashCan, setTrashCan] = useState({});
    const [previewTrashChildImages, setPreviewTrashChildImages] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [deletedTrashChildren, setDeletedTrashChildren] = useState([]);
    const [indexOfTrashChild, setIndexOfTrashChild] = useState(0);
    const [idMacOfDeviceStart, setIdMacOfDeviceStart] = useState([]);
    const [previewImages, setPreviewImages] = useState({
        image_area: null,
        image_thumbnail: null,
    });

    const [formData, setFormData] = useState({
        _id: trashCan?._id || '',
        name: trashCan?.name || '',
        address: trashCan?.address || '',
        lat: trashCan?.lat || '',
        lng: trashCan?.lng || '',
        count_trash_child: trashCan?.trash_child?.length || 1,
        id_location: trashCan?.location?._id || '',
        id_image: trashCan?.image?._id || '',
        trash_child: trashCan?.trash_child || [{
            stt: 1,
            height: '',
            width: '',
            type: '',
            image_trash_type: '',
            level_gauges: '',
            id_mac_of_device: ''
        }],
        district: trashCan?.location?.compound?.district || '',
        commune: trashCan?.location?.compound?.commune || '',
        province: trashCan?.location?.compound?.province || '',
    });

    useEffect(() => {
        const trashCan = trashCans?.find((trashCan) => trashCan._id === id);
        setTrashCan(trashCan);
        setImage_area(trashCan?.image?.image_area);
        setImage_thumbnail(trashCan?.image?.image_thumnail);
        setFormData(prevState => ({
            ...prevState,
            _id: trashCan?._id,
            name: trashCan?.name,
            address: trashCan?.address,
            lat: trashCan?.lat,
            lng: trashCan?.lng,
            id_location: trashCan?.location?._id,
            id_image: trashCan?.image?._id,
            count_trash_child: trashCan?.trash_child?.length,
            district: trashCan?.location?.compound?.district,
            commune: trashCan?.location?.compound?.commune,
            province: trashCan?.location?.compound?.province,
            trash_child: trashCan?.trash_child
        }));
    }, [trashCans, id]);

    useEffect(() => {
        if (trashCans.length > 0 && devices.length > 0) {
            mergeTrashAndDevice(trashCans, devices, dispatch);
            mergeTrashAndDeviceDetail(trashCan, devices, dispatch);
        }
        // eslint-disable-next-line
    }, [trashCans, trashCan, dispatch])


    // Hàm xử lý thay đổi hình ảnh của trash child
    const handleTrashChildImageChange = (index, imageFile) => {
        setFormData(prevState => {
            const updatedTrashChild = [...prevState.trash_child];
            updatedTrashChild[index] = {
                ...updatedTrashChild[index],
                image_trash_type: imageFile
            };
            return { ...prevState, trash_child: updatedTrashChild };
        });

        if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newPreviewTrashChildImages = [...previewTrashChildImages];
                newPreviewTrashChildImages[index] = reader.result;
                setPreviewTrashChildImages(newPreviewTrashChildImages);
            };
            reader.readAsDataURL(imageFile);
        }
    };

    // Hàm xử lý thay đổi hình ảnh cho image area và image thumbnail
    const handleImageChange = (fieldName, imageFile) => {
        setFormData(prevState => ({ ...prevState, [fieldName]: imageFile }));
        if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImages(prevState => ({
                    ...prevState,
                    [fieldName]: reader.result
                }));
            };
            reader.readAsDataURL(imageFile);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTrashChildChange = (index, event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            trash_child: prevState.trash_child.map((item, idx) =>
                idx === index ? { ...item, [name]: value } : item
            )
        }));
    };


    // Cập nhật id_mac_of_device cho trash child tại index



    const hanleSelectTrashChildChange = (index, event) => {
        const { value } = event.target;
        setFormData(prevState => {
            const updatedTrashChild = [...prevState.trash_child];

            // Lấy ra index của trash child có id_mac_of_device trùng với giá trị đang được chọn
            const targetIndex = updatedTrashChild.findIndex(item => item.id_mac_of_device === value);
            if (targetIndex !== -1) {

                // Đảo chỗ giữa trash child ở index và targetIndex
                const temp = updatedTrashChild[index];
                updatedTrashChild[index] = updatedTrashChild[targetIndex];
                updatedTrashChild[targetIndex] = temp;

            } else {
                updatedTrashChild[index] = { ...updatedTrashChild[index], id_mac_of_device: value };
                if (idMacOfDeviceStart.length === 0) {
                    setIdMacOfDeviceStart(formData.trash_child)
                }
            }

            return { ...prevState, trash_child: updatedTrashChild };
        });

    }


    const addTrashChild = (stt) => {
        setFormData(prevState => ({
            ...prevState,
            trash_child: [
                ...prevState.trash_child,
                {
                    stt: stt,
                    height: '',
                    width: '',
                    type: '',
                    image_trash_type: '',
                    name_image_of_trash_type: '',
                    level_gauges: '',
                    id_mac_of_device: ''
                }
            ]
        }));
    };


    const restoreTrashChild = () => {
        setFormData(prevState => {
            const updatedTrashChild = [...prevState.trash_child];
            const lastDeletedTrashChild = deletedTrashChildren.pop(); // Lấy ra phần tử cuối cùng của mảng deletedTrashChildren
            if (lastDeletedTrashChild) {
                const { index, data } = lastDeletedTrashChild;
                updatedTrashChild.splice(index, 0, data); // Chèn phần tử đã khôi phục vào vị trí đúng trong mảng updatedTrashChild
            }
            return { ...prevState, trash_child: updatedTrashChild };
        });
        setModalOpen(false);
    };



    const removeTrashChild = () => {
        setFormData(prevState => {
            const updatedTrashChild = [...prevState.trash_child];
            const removedTrashChild = updatedTrashChild.splice(indexOfTrashChild, 1)[0];
            setDeletedTrashChildren(prevDeletedTrashChildren => [
                ...prevDeletedTrashChildren,
                { index: indexOfTrashChild, data: removedTrashChild }
            ]);
            return { ...prevState, trash_child: updatedTrashChild };
        });
        setModalOpen(false);
    };

    // Hàm tạo FormData từ dữ liệu hiện tại
    const createFormData = () => {
        const formDataToSend = new FormData();

        // Thêm các trường dữ liệu không phải là hình ảnh vào FormData
        formDataToSend.append('_id', formData._id);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('lat', Number(formData.lat));
        formDataToSend.append('lng', Number(formData.lng));
        formDataToSend.append('count_trash_child', Number(formData.count_trash_child));
        formDataToSend.append('district', formData.district);
        formDataToSend.append('commune', formData.commune);
        formDataToSend.append('province', formData.province);
        formDataToSend.append('id_location', formData.id_location);
        formDataToSend.append('id_image', formData.id_image);

        // Thêm hình ảnh của image area và image thumbnail vào FormData
        formDataToSend.append('image_area', formData.image_area);
        formDataToSend.append('image_thumbnail', formData.image_thumbnail);

        // Thêm hình ảnh của trash child vào FormData
        formData.trash_child.forEach((trash, index) => {
            formDataToSend.append(`trash_child[${index}][stt]`, Number(index + 1));
            formDataToSend.append(`trash_child[${index}][height]`, Number(trash.height));
            formDataToSend.append(`trash_child[${index}][width]`, Number(trash.width));
            formDataToSend.append(`trash_child[${index}][type]`, trash.type);
            formDataToSend.append(`trash_child[${index}][level_gauges]`, Number(trash.level_gauges));
            formDataToSend.append(`trash_child[${index}][id_mac_of_device]`, trash.id_mac_of_device);
            if (trash.image_trash_type instanceof File === false) {
                formDataToSend.append(`trash_child[${index}][name_image_of_trash_type]`, trash.name_image_of_trash_type);
                formDataToSend.append(`trash_child[${index}][image_trash_type]`, trash.image_trash_type);
            }
            if (trash.image_trash_type instanceof File) {
                formDataToSend.append(`trash_child_images`, trash.image_trash_type);
            }
        });

        return formDataToSend;
    };

    const handleSubmit = async () => {

        if (formData.trash_child.length === 0) {
            toast.error('Trash child must be at least one');
            return;

        }
        // Kiểm tra các trường bắt buộc
        if (!formData.name || !formData.address || !formData.lat || !formData.lng || !formData.count_trash_child || !formData.district || !formData.commune || !formData.province) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Kiểm tra các trường con trong trash_child
        for (let i = 0; i < formData.trash_child.length; i++) {
            const trash = formData.trash_child[i];
            if (!trash.height || !trash.width || !trash.type || !trash.image_trash_type || !trash.level_gauges || !trash.id_mac_of_device) {
                toast.error('Please fill in all required fields in trash child');
                return;
            }
        }

        const dataToSend = createFormData();
        const id = formData._id;
        const idMacOfDeviceNoExist = formData.trash_child.filter(trash => devices.findIndex(device => device.mac_address === trash.id_mac_of_device) === -1).map(trash => trash.id_mac_of_device);
        if (idMacOfDeviceNoExist.length > 0) {
            toast.error(`Mac id of device ${idMacOfDeviceNoExist.join(', ')} not exist`);
            return;
        }
        try {
            const data = await updateTrashCan(id, dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }, callback, dispatch, navigate);
            if (data) {
                if (mqttClient && typeof mqttClient.publish === 'function') {
                    formData.trash_child.forEach((trash) => {
                        if (trash.id_mac_of_device !== '') {
                            mqttClient.publish('switch', JSON.stringify({ mac_a: trash.id_mac_of_device, "clientId": "react_client_01", "message": "height_of_trash", "value": String(trash.height) }));
                        }
                    });
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Error submitting form');
        }
    };


    const hanleClose = () => {
        setModalOpen(false);
    };

    const handleOpen = (index) => {
        setModalOpen(true);
        setIndexOfTrashChild(index);
    }

    return (
        <Container>
            <div className='row p-3'>
                <span className='fs-1 fw-bold'>Edit Trash Can</span>
                <div className='col mt-4'>
                    <div className={cx("card border-0 shadow p-3 mb-5 bg-body-tertiary rounded", "wrapper_form")}>
                        <div className="card-body">
                            <h5 className="card-title fs-2">Edit trash can detail</h5>
                            <h6 className="card-subtitle fs-4 mb-2 text-muted">Form detail</h6>
                            <div className={cx("wrapper_form row")}>
                                <div className='col-8'>
                                    <div className={cx("d-flex flex-column m-4")}>
                                        <label htmlFor="" className='fs-4 fw-medium mb-3'>Name</label>
                                        <div className={cx("wrapper_form_input_form")}>
                                            <input type="text" className={cx("input_form")} name="name" value={formData.name} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className={cx("d-flex flex-column m-4")}>
                                        <label htmlFor="" className='fs-4 fw-medium mb-3'>Address</label>
                                        <div className={cx("wrapper_form_input_form")}>
                                            <textarea type="text" className={cx("input_form")} name='address' value={formData.address} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className={cx("d-flex flex-column m-4")}>
                                        <label htmlFor="" className='fs-4 fw-medium mb-3'>District</label>
                                        <div className={cx("wrapper_form_input_form")}>
                                            <input type="text" className={cx("input_form")} name='district' value={formData.district} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className={cx("d-flex flex-column m-4")}>
                                        <label htmlFor="" className='fs-4 fw-medium mb-3'>Commune</label>
                                        <div className={cx("wrapper_form_input_form")}>
                                            <input type="text" className={cx("input_form")} name='commune' value={formData.commune} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className={cx("d-flex flex-column m-4")}>
                                        <label htmlFor="" className='fs-4 fw-medium mb-3'>Province</label>
                                        <div className={cx("wrapper_form_input_form")}>
                                            <input type="text" className={cx("input_form")} name='province' value={formData.province} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className={cx("d-flex flex-column mb-3")}>
                                        <label htmlFor="" className='fs-4 fw-medium mb-3'>Lat</label>
                                        <div className={cx("wrapper_form_input_form_height")}>
                                            <input type="number" className={cx("input_form")} name='lat' value={formData.lat} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className={cx("d-flex flex-column mb-3 ")}>
                                        <label htmlFor="" className='fs-4 fw-medium mb-3'>Long</label>
                                        <div className={cx("wrapper_form_input_form_width")}>
                                            <input type="number" className={cx("input_form")} name='lng' value={formData.lng} onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className={cx("d-flex flex-column mb-3 ")}>
                                        <label htmlFor="" className='fs-4 fw-medium mb-3'>Count of trash can child</label>
                                        <div className={cx("wrapper_form_input_form_width")}>
                                            <input type="number" className={cx("input_form_count_trash_child")} name='count_trash_child' disabled value={formData.count_trash_child} onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div style={{ height: "120px" }} className={cx("d-flex flex-column mb-3 ")}>
                                        <label htmlFor="" className='fs-4 fw-medium mb-3'>Image area</label>
                                        <div style={{ height: "80px" }} className='d-flex flex-column align-items-start justify-content-between'>
                                            <img className='img-thumbnail' src={previewImages.image_area || image_area} alt="..." style={{ height: "55px", width: "70px" }} />
                                            <input type="file" onChange={(e) => handleImageChange('image_area', e.target.files[0])} />
                                        </div>
                                    </div>

                                    <div style={{ height: "120px" }} className={cx("d-flex flex-column mb-3 ")}>
                                        <label htmlFor="" className='fs-4 fw-medium mb-3'>Image thumbnail</label>
                                        <div style={{ height: "80px" }} className='d-flex flex-column align-items-start justify-content-between'>
                                            <img className='img-thumbnail' src={previewImages.image_thumbnail || image_thumbnail} alt="..." style={{ height: "55px", width: "70px" }} />
                                            <input type="file" onChange={(e) => handleImageChange('image_thumbnail', e.target.files[0])} />
                                        </div>
                                    </div>

                                </div>
                                <div className='d-flex flex-wrap'>
                                    {formData.trash_child && formData.trash_child.map((trash, index) => (
                                        <div key={index} className="m-4">
                                            <label htmlFor={`trash_child_${index}`} className='fs-4 fw-medium mb-3'>Trash Child {index + 1}</label>
                                            <input type="number" className="form-control" style={{ margin: "8px" }} id={`stt_${index}`} name={`stt`} value={index + 1} disabled placeholder="STT" />
                                            <input type="number" className="form-control" style={{ margin: "8px" }} id={`height_${index}`} name={`height`} value={trash.height} onChange={(event) => handleTrashChildChange(index, event)} placeholder="Height" />
                                            <input type="number" className="form-control" style={{ margin: "8px" }} id={`width_${index}`} name={`width`} value={trash.width} onChange={(event) => handleTrashChildChange(index, event)} placeholder="Width" />
                                            <select className="form-select" style={{ margin: "8px" }} id={`type_${index}`} name={`type`} value={trash.type} onChange={(event) => handleTrashChildChange(index, event)}>
                                                <option value="none">Type of trash can</option>
                                                <option value="organic">Organic</option>
                                                <option value="inorganic">Inorganic</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <div className='d-flex align-items-center'>
                                                <img src={previewTrashChildImages[index] || trash.image_trash_type} alt="..." style={{ height: "25px", width: "25px" }} />
                                                <input type="file" onChange={(e) => handleTrashChildImageChange(index, e.target.files[0])} style={{ margin: "8px" }} />
                                            </div>
                                            <div className='d-flex flex-column align-items-start'>
                                                <label style={{ marginLeft: "9px" }} htmlFor={`trash_child_${index}`} className='fs-5 fw-light mb-3'>level_gauges:</label>
                                                <input type="number" className="form-control" style={{ margin: "8px" }} id={`level_gauges_${index}`} name={`level_gauges`} onChange={(event) => handleTrashChildChange(index, event)} value={trash.level_gauges} placeholder="Level Gauges" />
                                            </div>
                                            <div className={cx("d-flex flex-column mb-3")}>
                                                <select
                                                    style={{ margin: "8px" }}
                                                    className="form-select"
                                                    id={`id_mac_of_device_${index}`}
                                                    value={trash.id_mac_of_device}
                                                    name={`id_mac_of_device`}
                                                    onChange={(event) => hanleSelectTrashChildChange(index, event)}
                                                    aria-label="Default select example"
                                                >
                                                    <option value={trash.id_mac_of_device} >{trash.id_mac_of_device}</option>
                                                    {idMacOfDeviceStart.length > 0 && idMacOfDeviceStart.map(trashChild =>
                                                        <option key={trashChild.id_mac_of_device} value={trashChild.id_mac_of_device} >{trashChild.id_mac_of_device}</option>
                                                    )}
                                                    {devices.map((device, index) => (
                                                        (device?.merged) ?
                                                            <option key={index} disabled={!device.mergedChild} value={device.mac_address}>
                                                                {device.mac_address} merged
                                                            </option> :
                                                            <option key={index} value={device.mac_address}>
                                                                {device.mac_address}
                                                            </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div style={{ width: "70px" }}>
                                                <button className={cx("button-29")} onClick={() => handleOpen(index)}>remove</button>
                                            </div>
                                            <Modall modalOpen={modalOpen} hanleClose={hanleClose}>
                                                <div className={cx("modal_wrapper")}>
                                                    <div className={cx("modal_wrapper_top")}>
                                                        <p id="simple-modal-title">Confirm remove trash can</p>
                                                    </div>
                                                    <div className={cx("modal_wrapper_center")}>
                                                        <h3 id="simple-modal-title">Are you sure you want to remove?</h3>
                                                    </div>
                                                    <div className={cx("modal_wrapper_bottom")}>
                                                        <div style={{ width: "25%" }}>
                                                            <button className={cx("button-28")} onClick={hanleClose}>Cancel</button>
                                                        </div>
                                                        <div style={{ width: "25%", marginLeft: "14px" }}>
                                                            <button className={cx("button-29")} onClick={removeTrashChild}>Delete</button>
                                                        </div>
                                                    </div>
                                                    <div className={cx("border_wrapper")}></div>
                                                </div>
                                            </Modall>
                                        </div>
                                    ))}
                                </div>
                                <div className="m-4">
                                    <div style={{ width: "100px" }}>
                                        {deletedTrashChildren.length > 0 ? <button className={cx("button-28")} onClick={restoreTrashChild}>Restore</button> : <button className={cx("button-28")} onClick={() => addTrashChild(formData.trash_child.length + 1)}>Add trash child</button>}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('m-4', 'add')}>
                                <button className={cx("button-30")} onClick={handleSubmit}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='mt-4'>
                        <div className="card">
                            <div className={cx("card-body", "wrapper_googmap")}>
                                {trashCan?._id && <GoongMap trashCan={trashCan} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container >
    )
}

export default EditTrashcan