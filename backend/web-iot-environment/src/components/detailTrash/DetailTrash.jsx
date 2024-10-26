import classNames from "classnames/bind";
import HeadlessTippy from "@tippyjs/react/headless";
import styles from "./DetailTrash.module.scss";
import GoongMap from "../Googmap/GoongMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { Wrapper as PopperWraper } from "../popper/index";
import { useEffect, useState } from "react";
import ButtonOfTrashcan from "../buttonOfTrashcan/ButtonOfTrashcan";
import Modall from "../modall/Modall";
import { useNavigate, useParams } from 'react-router-dom';
import { selectCallBack, selectTrashCans } from "../../redux/trashCanSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectDevices } from "../../redux/deviceSlice";
import mergeTrashAndDevice from "../../utils/mergeTrashAndDevice";
import convertTime from "../../utils/convertTime";
import images from "../../assets/images";
import { deleteTrashCan } from "../../services/trashCanService";
import { selectToken } from "../../redux/userSlice";

const cx = classNames.bind(styles);

function DetailTrash() {
    const { id } = useParams();
    const callBack = useSelector(selectCallBack);
    const token = useSelector(selectToken);
    const dispatch = useDispatch();
    const trashCans = useSelector(selectTrashCans);
    const [image_thumbnail, setImage_thumbnail] = useState(images.noImgae);
    const [image_area, setImage_area] = useState(images.noImgae);
    const devices = useSelector(selectDevices);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [trashCan, setTrashCan] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        mergeTrashAndDevice(trashCans, devices, dispatch);
    }, [devices, trashCans, dispatch])

    useEffect(() => {
        const trashCan = trashCans?.find((trashCan) => trashCan._id === id);
        setTrashCan(trashCan);
        setImage_area(trashCan?.image?.image_area);
        setImage_thumbnail(trashCan?.image?.image_thumnail);
    }, [trashCans, id]);


    const handleRemoveButtonClick = () => {
        setModalOpen(true);
    };

    const hanleClose = () => {
        setModalOpen(false);
    };

    const toggleTooltip = () => {
        setTooltipVisible(!tooltipVisible);
    };

    const handleEditButtonClick = (id) => {
        navigate(`/managertrash/editrash/${id}`);
    };

    const handleDeleteTrashCan = async () => {
        setModalOpen(false);
        const res = await deleteTrashCan(id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }, callBack, dispatch, navigate);
        if (res) {
            navigate("/managertrash");
        }
    }


    return (
        <div className={cx("wrapper")}>
            <div className={cx("wrapper__chidren")}>
                <div className={cx("child")}>
                    <div className={cx("top")}>
                        <div className={cx("top__top")}>
                            <div className={cx("top__top--top")}><img src={image_area} alt="..." /></div>
                            <div className={cx("top__infor")}>
                                <div className={cx("top__infor_item")}>
                                    <div>
                                        <p className={cx("top__infor_item--name")}>NAME: </p>
                                    </div>
                                    <div style={{ marginLeft: "7px" }}>
                                        <p className={cx("top__infor_item--value")}>{trashCan?.name}</p>
                                    </div>
                                </div>
                                <div className={cx("top__infor_item")}>
                                    <div>
                                        <p className={cx("top__infor_item--address")}>ADDRESS: </p>
                                    </div>
                                    <div>
                                        <p style={{ marginLeft: "7px" }} className={cx("top__infor_item--address--value")}>{trashCan?.address}</p>
                                    </div>
                                </div>
                                <div className={cx("top__infor_item")}>
                                    <div>
                                        <p className={cx("top__infor_item--chirden")}>TRASH CHIDREN: </p>
                                    </div>
                                    <div>
                                        <p style={{ marginLeft: "7px" }} className={cx("top__infor_item--chirden--value")}>{trashCan?.count_trash_child}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("top_border_top")}></div>
                        </div>
                        <div className={cx("top__center")}>
                            <img src={image_thumbnail} alt="..." />
                        </div>
                        <div className={cx("top_end")}>
                            <div className={cx("top_end-infor")}>
                                <div>
                                    <p className={cx("top_end-infor_item")}>LAT:</p>
                                </div>
                                <div style={{ height: "31px", display: "flex", alignItems: "end" }}>
                                    <p className={cx("top_end-infor_item_value")}>{trashCan?.lat}</p>
                                </div>
                            </div>
                            <div className={cx("top_end-infor")}>
                                <div>
                                    <p className={cx("top_end-infor_item")}>LONG:</p>
                                </div>
                                <div style={{ height: "31px", display: "flex", alignItems: "end" }}>
                                    <p className={cx("top_end-infor_item_value")}>{trashCan?.lng}</p>
                                </div>
                            </div>
                        </div>
                        <div className={cx("top_border_bt")}></div>
                    </div>
                    <div className={cx("bottom")}>
                        <div className={cx("bottom_left")}>
                            {trashCan?.trash_child?.map((item, index) => (
                                <div key={index} className={cx("bottom_box")}>
                                    <div className={cx("bottom_box_stt")}><p className={cx("bottom_box_type_text")}>{item.stt}</p> </div>
                                    <div className={cx("bottom_box_top")}>

                                        <div className={cx("bottom_box_top_top")}>
                                            <div className={cx("bottom_box_top_top_left")}>
                                                <img src={item.image_trash_type} alt="..." />
                                            </div>
                                            <div className={cx("bottom_box_top_top_right")}>
                                                <div><p className={cx("bottom_box_top_bottom_left_mac")}>{item.id_mac_of_device}</p></div>
                                                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", width: "34px", height: "19px" }} className={cx("bottom_box_top_bottom_left_status")}><p>{item.status}</p><FontAwesomeIcon style={{ color: "#993300", fontSize: "15px" }} icon={faExclamation} /></div>
                                            </div>
                                            <div className={cx("bottom_box_top_top_border_bt")}></div>
                                        </div>

                                        <div className={cx("bottom_box_top_bottom")} >
                                            <div className={cx("bottom_box_top_bottom_left")}>
                                                <div><p className={cx("bottom_box_top_bottom_left_width")}>Width:</p></div>
                                                <div style={{ height: "23px", marginLeft: "5px" }}><p className={cx("bottom_box_top_bottom_left_width_value")}>{item.width}</p></div>
                                            </div>
                                            <div className={cx("bottom_box_top_bottom_right")}>
                                                <div><p className={cx("bottom_box_top_bottom_left_width")}>Height:</p></div>
                                                <div style={{ height: "23px", marginLeft: "5px" }}><p className={cx("bottom_box_top_bottom_left_width_value")}>{item.height}</p></div>
                                            </div>
                                        </div>
                                        <div className={cx("bottom_box_top_border_bt")}></div>
                                    </div>

                                    <div className={cx("bottom_box_bottom")}>
                                        <div className={cx("bottom_box_bottom_item")}>
                                            <div><p className={cx("bottom_box_bottom_left_lg")}>Level Gauses: </p></div>
                                            <div style={{ marginLeft: "5px" }}><p className={cx("bottom_box_bottom_left_lg_value")}>{item.level_gauges} cm</p></div>
                                        </div>
                                        <div className={cx("bottom_box_bottom_item")}>
                                            <div><p className={cx("bottom_box_bottom_left_lg")}>Present: </p></div>
                                            <div style={{ marginLeft: "5px" }}><p className={cx("bottom_box_bottom_left_lg_value")}>{item.trash_level_present} %</p></div>
                                        </div>
                                    </div>
                                    <div className={cx("bottom_box_type")}> <p className={cx("bottom_box_type_text")}>{item.type}</p> </div>
                                </div>
                            ))}
                        </div>
                        <div className={cx("bottom_right")}>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", minHeight: "5%" }}>
                                <p className={cx("bottom_right_text")}>Created At:</p>
                                <p className={cx("bottom_right_text")} style={{ width: "75%", height: "100%" }}>{convertTime(trashCan?.createdAt)}</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", minHeight: "5%" }}>
                                <p className={cx("bottom_right_text")}>Updated At:</p>
                                <p className={cx("bottom_right_text")} style={{ width: "75%", height: "100%" }}>{convertTime(trashCan?.updatedAt)}</p>
                            </div>
                        </div>
                    </div>

                    <div className={cx("map")}>
                        <div className={cx("map_wrap")}>
                            {trashCan?._id && <GoongMap trashCan={trashCan} />}
                        </div>
                    </div>

                    <HeadlessTippy
                        interactive
                        visible={tooltipVisible}
                        render={(attrs) => (
                            <PopperWraper>
                                <div className={cx("arrow_infor")} tabIndex="-1" {...attrs}>
                                    <div className={cx("arrow_infor_top")}>
                                        <ButtonOfTrashcan title={"update"} className={"edit"} onClick={() => handleEditButtonClick(trashCan?._id)} />
                                    </div>
                                    <div className={cx("arrow_infor_bottom")}>
                                        <ButtonOfTrashcan title={"remove"} onClick={handleRemoveButtonClick} />
                                    </div>
                                    <div className={cx("border_infor")}></div>
                                </div>
                            </PopperWraper>
                        )}
                    >
                        <div className={cx("wrap_arrow")} onClick={toggleTooltip}>
                            <FontAwesomeIcon icon={faAngleUp} className={cx("arrow", { "active": tooltipVisible })} />
                        </div>
                    </HeadlessTippy>

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
                                    <button className={cx("button-28")} onClick={() => setModalOpen(false)}>Cancel</button>
                                </div>
                                <div style={{ width: "25%", marginLeft: "14px" }}>
                                    <button className={cx("button-29")} onClick={handleDeleteTrashCan}>Delete</button>
                                </div>
                            </div>
                            <div className={cx("border_wrapper")}></div>
                        </div>
                    </Modall>
                </div>
            </div>
        </div>
    )
}

export default DetailTrash