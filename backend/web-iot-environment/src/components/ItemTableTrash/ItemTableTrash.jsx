import { faCheck, faExclamation, faFlask } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as IconMaker } from '../../assets/images/iconMaker.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import styles from "./ItemTableTrash.module.scss";
import convertTime from '../../utils/convertTime';
import ReactDOMServer from 'react-dom/server';
import TrashChildren from '../trashChildren/TrashChildren';
import { useSelector } from 'react-redux';
import { selectMap } from '../../redux/mapSlice';
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react';
const cx = classNames.bind(styles);

function ItemTableTrash({ trash, tableNumber }) {
    const naviage = useNavigate();
    const map = useSelector(selectMap)
    const rowRef = useRef(null);


    // Hàm xử lý sự kiện click trên bản đồ
    const handleClick = (trashCan, tableNumber) => {
        if (tableNumber === 2) {
            const goongjs = require('@goongmaps/goong-js');
            const htmlString = ReactDOMServer.renderToString(
                <TrashChildren name={trashCan.name} trashChildren={trashCan.trash_child} />
            );
            if (trashCan) {
                if (rowRef.current) {
                    rowRef.current.style.borderBottom = "1px solid #67B758";
                }
                const coordinates = [trashCan.lng, trashCan.lat];
                const description = htmlString

                // Tạo và hiển thị popup
                const popupp = new goongjs.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);

                // Lắng nghe sự kiện close của popup
                popupp.on('close', function () {
                    if (rowRef.current) {
                        rowRef.current.style.border = "inherit";
                    }
                });
            } else {
                return;
            }
        } else {
            if (trashCan) {
                naviage(`/managertrash/detailtrash/${trashCan._id}`)
            }
        }
    };

    return (
        <tr id={tableNumber === 2 ? `row-${trash._id}` : "row"} ref={rowRef} className={cx("wrapper")} onClick={() => handleClick(trash, tableNumber)}>
            <th>
                <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "60px", minWidth: "200px" }}>
                    <div className='border rounded' style={{ width: "70px", minHeight: "60px" }}>
                        <IconMaker />
                    </div>
                    <div className='w-50'>
                        <span style={{ color: "#3874ff" }}>{trash.name}</span>
                    </div>
                </div>
            </th>
            <th>
                <div className='d-flex align-items-center justify-content-center' style={{ minHeight: "60px", minWidth: "150px" }}>
                    <span style={{ color: "#FF9966" }}>{trash.count_trash_child}</span>
                </div>
            </th>
            <th>
                <div className='d-flex flex-column justify-content-center align-items-center' style={{ minHeight: "60px", minWidth: "200px" }}>
                    <div className='d-flex justify-content-between' style={{ minWidth: "140px" }}>
                        <span className='fs-5 text'>Lat :</span><p className="fw-light fs-5 text" style={{ color: "blue" }}>{trash.lat}</p>
                    </div>
                    <div className='d-flex justify-content-between' style={{ minWidth: "140px" }}>
                        <span className='fs-5 text'>Long: </span>
                        <p className="fw-light fs-5 text" style={{ color: "blue" }}>{trash.lng}</p>
                    </div>
                </div>
            </th>
            <th>
                <div className='d-flex align-items-center justify-content-center' style={{ minHeight: "60px", minWidth: "300px" }}>
                    <span className='fw-normal fs-5 text'>{trash.address}</span>
                </div>
            </th>
            <th>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{ minHeight: "60px" }}>
                    {trash?.trash_child?.map((item, index) => (
                        item.merged ? (
                            <div key={item._id} className='d-flex align-items-center justify-content-between' style={{ minWidth: "140px", height: "40px" }}>
                                <div>
                                    <img style={{ width: "30px", height: "30px" }} src={item.image_trash_type} alt="..." />
                                </div>
                                <div>
                                    {item.status === "low" && (
                                        <div className='rounded d-flex justify-content-center align-items-center' style={{ minWidth: "100px", minHeight: "22px", background: "#FF3333", border: "1px solid #ffcc85" }}>
                                            <span style={{ color: "#fff", width: "70%" }}>{item.level_gauges} cm</span>
                                            <FontAwesomeIcon style={{ color: "#993300", fontSize: "13px" }} icon={faExclamation} />
                                        </div>
                                    )}
                                    {item.status === "center" && (
                                        <div className='rounded d-flex justify-content-center align-items-center' style={{ minWidth: "90px", minHeight: "22px", background: "#ffefca", border: "1px solid #ffcc85" }}>
                                            <span style={{ color: "#bc3803", width: "70%" }}>{item.level_gauges} cm</span>
                                            <FontAwesomeIcon style={{ color: "#bc3803", fontSize: "13px" }} icon={faFlask} />
                                        </div>

                                    )}
                                    {item.status === "high" && (
                                        <div key={item._id} className='rounded d-flex justify-content-center align-items-center' style={{ minWidth: "100px", minHeight: "22px", background: "#bee8b4", border: "1px solid cadetblue" }}>
                                            <span style={{ color: "#1c6c09", width: "70%" }}>{item.level_gauges} cm</span>
                                            <FontAwesomeIcon style={{ color: "#1c6c09", fontSize: "13px" }} icon={faCheck} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div key={item._id} className='d-flex justify-content-end' style={{ width: "135px" }} >
                                <div style={{ height: "22px" }}>
                                    <p>No found device</p>
                                </div>
                                <FontAwesomeIcon style={{ color: "#993300", fontSize: "13px", marginLeft: "3px" }} icon={faExclamation} />
                            </div>
                        )
                    ))}
                </div>
            </th>
            <th>
                <div className='d-flex align-items-center justify-content-center' style={{ minHeight: "60px", minWidth: "200px" }}>
                    <span className='fw-normal fs-5 text'>{convertTime(trash.createdAt)}</span>
                </div>
            </th>
            <th>
                <div className='d-flex align-items-center justify-content-center' style={{ minHeight: "60px", minWidth: "200px" }}>
                    <span className='fw-normal fs-5 text'>{convertTime(trash.updatedAt)}</span>
                </div>
            </th>
        </tr >
    )
}

export default ItemTableTrash