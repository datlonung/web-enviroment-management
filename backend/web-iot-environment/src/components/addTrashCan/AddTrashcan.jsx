import { Container } from 'react-bootstrap';
import classNames from "classnames/bind";
import styles from "./AddTrashcan.module.scss";
import { useEffect, useState } from 'react';
import { createTrashCan } from '../../services/trashCanService';
import { useDispatch, useSelector } from 'react-redux';
import { selectDevices } from '../../redux/deviceSlice'
import { selectCallBack, selectTrashCans } from '../../redux/trashCanSlice';
import mergeTrashAndDevice from '../../utils/mergeTrashAndDevice';
import { selectMqttClient } from '../../redux/mqttSilice';
import GoongMap from '../Googmap/GoongMap';
import images from '../../assets/images';
import { toast } from 'react-toastify';
import { selectToken } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AddTrashcan() {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const navigate = useNavigate();
    const devices = useSelector(selectDevices)
    const callBack = useSelector(selectCallBack)
    const trashCans = useSelector(selectTrashCans);
    const mqttClient = useSelector(selectMqttClient);
    const [previewTrashChildImages, setPreviewTrashChildImages] = useState([]);
    const [deletedTrashChildren, setDeletedTrashChildren] = useState([]);
    const [previewImages, setPreviewImages] = useState({
        image_area: null,
        image_thumbnail: null,
    });
    const [trashCanss, setTrashCanss] = useState([]);

    useEffect(() => {
        mergeTrashAndDevice(trashCans, devices, dispatch);
    }, [devices, trashCans, dispatch])

    useEffect(() => {
        setTrashCanss(trashCans);
    }, [trashCans])

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        lat: '',
        lng: '',
        count_trash_child: '',
        trash_child: [
            {
                stt: 1,
                height: '',
                width: '',
                type: '',
                image_trash_type: '',
                level_gauges: '',
                id_mac_of_device: ''
            }
        ],
        district: '',
        commune: '',
        province: ''
    });

    // Hàm xử lý thay đổi hình ảnh của trash child
    const handleTrashChildImageChange = (index, imageFile) => {
        setFormData(prevState => {
            const updatedTrashChild = [...prevState.trash_child];
            updatedTrashChild[index].image_trash_type = imageFile;
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
    };


    const removeTrashChild = (index) => {
        setFormData(prevState => {
            const updatedTrashChild = [...prevState.trash_child];
            const removedTrashChild = updatedTrashChild.splice(index, 1)[0];
            setDeletedTrashChildren(prevDeletedTrashChildren => [
                ...prevDeletedTrashChildren,
                { index: index, data: removedTrashChild }
            ]);
            return { ...prevState, trash_child: updatedTrashChild };
        });
    };
    // Hàm tạo FormData từ dữ liệu hiện tại
    const createFormData = () => {
        const formDataToSend = new FormData();

        // Thêm các trường dữ liệu không phải là hình ảnh vào FormData
        formDataToSend.append('name', formData.name);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('lat', formData.lat);
        formDataToSend.append('lng', formData.lng);
        formDataToSend.append('count_trash_child', formData.count_trash_child);
        formDataToSend.append('district', formData.district);
        formDataToSend.append('commune', formData.commune);
        formDataToSend.append('province', formData.province);

        // Thêm hình ảnh của image area và image thumbnail vào FormData
        formDataToSend.append('image_area', formData.image_area);
        formDataToSend.append('image_thumbnail', formData.image_thumbnail);

        // Thêm hình ảnh của trash child vào FormData
        formData.trash_child.forEach((trash, index) => {
            formDataToSend.append(`trash_child[${index}][stt]`, trash.stt);
            formDataToSend.append(`trash_child[${index}][height]`, trash.height);
            formDataToSend.append(`trash_child[${index}][width]`, trash.width);
            formDataToSend.append(`trash_child[${index}][type]`, trash.type);
            formDataToSend.append(`trash_child[${index}][level_gauges]`, trash.level_gauges);
            formDataToSend.append(`trash_child[${index}][id_mac_of_device]`, trash.id_mac_of_device);
            formDataToSend.append(`trash_child_images`, trash.image_trash_type);
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

        if (previewImages.image_area === null || previewImages.image_thumbnail === null) {
            toast.error('Please select image for image area and image thumbnail');
            return;

        }

        if (previewTrashChildImages.length !== formData.trash_child.length) {
            toast.error('Please select image for all trash child');
            return;
        }

        const dataToSend = createFormData();

        try {
            const data = await createTrashCan(dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }, callBack, dispatch,navigate);
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
            toast.error(error.message);
        }
    };


    return (
        <Container>
            <div className='row p-3'>
                <span className='fs-1 fw-bold'>Trash Can Details</span>
                <div className='col-lg-6 mt-4'>
                    <div className={cx("card border-0 shadow p-3 mb-5 bg-body-tertiary rounded", "wrapper_form")}>
                        <div className="card-body">
                            <h5 className="card-title fs-2">Add trash can detail</h5>
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
                                            <input type="number" className={cx("input_form")} name='count_trash_child' value={formData.count_trash_child} onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div style={{ height: "120px" }} className={cx("d-flex flex-column mb-3 ")}>
                                        <label htmlFor="" className='fs-4 fw-medium mb-3'>Image area</label>
                                        <div style={{ height: "80px" }} className='d-flex flex-column align-items-start justify-content-between'>
                                            <img className='img-thumbnail' src={previewImages.image_area || images.noImgae} alt="..." style={{ height: "55px", width: "70px" }} />
                                            <input type="file" onChange={(e) => handleImageChange('image_area', e.target.files[0])} />
                                        </div>
                                    </div>

                                    <div style={{ height: "120px" }} className={cx("d-flex flex-column mb-3 ")}>
                                        <label htmlFor="" className='fs-4 fw-medium mb-3'>Image thumbnail</label>
                                        <div style={{ height: "80px" }} className='d-flex flex-column align-items-start justify-content-between'>
                                            <img className='img-thumbnail' src={previewImages.image_thumbnail || images.noImgae} alt="..." style={{ height: "55px", width: "70px" }} />
                                            <input type="file" onChange={(e) => handleImageChange('image_thumbnail', e.target.files[0])} />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex flex-wrap'>
                                    {formData.trash_child.map((trash, index) => (
                                        <div key={index} className="m-4">
                                            <label htmlFor={`trash_child_${index}`} className='fs-4 fw-medium mb-3'>Trash Child {index + 1}</label>
                                            <input style={{ margin: "8px" }} type="number" className="form-control" id={`stt_${index}`} name={`stt`} value={index + 1} disabled placeholder="STT" />
                                            <input style={{ margin: "8px" }} type="number" className="form-control" id={`height_${index}`} name={`height`} value={trash.height} onChange={(event) => handleTrashChildChange(index, event)} placeholder="Height" />
                                            <input style={{ margin: "8px" }} type="number" className="form-control" id={`width_${index}`} name={`width`} value={trash.width} onChange={(event) => handleTrashChildChange(index, event)} placeholder="Width" />
                                            <select style={{ margin: "8px" }} className="form-select" id={`type_${index}`} name={`type`} value={trash.type} onChange={(event) => handleTrashChildChange(index, event)}>
                                                <option value="">Type of trash can</option>
                                                <option value="organic">Organic</option>
                                                <option value="inorganic">Inorganic</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <div className='d-flex align-items-center'>
                                                <img src={previewTrashChildImages[index] || images.noImgae} alt="..." style={{ height: "25px", width: "25px" }} />
                                                <input type="file" onChange={(e) => handleTrashChildImageChange(index, e.target.files[0])} style={{ margin: "8px" }} />
                                            </div>
                                            <input style={{ margin: "8px" }} type="number" className="form-control" id={`level_gauges_${index}`} name={`level_gauges`} value={trash.level_gauges} onChange={(event) => handleTrashChildChange(index, event)} placeholder="Level Gauges" />
                                            <div className={cx("d-flex flex-column mb-3")}>
                                                <select
                                                    style={{ margin: "8px" }}
                                                    className="form-select"
                                                    id={`id_mac_of_device_${index}`}
                                                    value={trash.id_mac_of_device}
                                                    name={`id_mac_of_device`}
                                                    onChange={(event) => handleTrashChildChange(index, event)}
                                                    aria-label="Default select example"
                                                >
                                                    <option value={"none"}>Select device</option>
                                                    {devices.map((device, index) => (
                                                        device?.merged ?
                                                            <option key={index} disabled value={device.mac_address}>
                                                                {device.mac_address} merged
                                                            </option> :
                                                            <option key={index} value={device.mac_address}>
                                                                {device.mac_address}
                                                            </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div style={{ width: "70px" }}>
                                                <button className={cx("button-29")} onClick={() => removeTrashChild(index)}>remove</button>
                                            </div>
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
                                <button className={cx("button-30")} onClick={handleSubmit}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='mt-4'>
                        <div className="card">
                            <div className={cx("card-body", "wrapper_googmap")}>
                                {trashCanss?.length > 0 && <GoongMap trashCans={trashCanss} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default AddTrashcan