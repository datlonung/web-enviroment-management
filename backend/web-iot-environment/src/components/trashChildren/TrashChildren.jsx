import classNames from "classnames/bind";
import styles from "./TrashChildren.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);



function TrashChildren({ name, trashChildren }) {
    return (
        <div className={cx("card border-0", "wrapper")}>
            <div className={cx("card-body", "wrapper-child")}>
                <h5 className="card-title fw-semibold">{name}</h5>
                {trashChildren?.map(trash => (
                    trash.merged ? (
                        <div key={trash._id} className={cx("d-flex align-items-center", "wrapper-child_second")}>
                            <img alt='...' src={trash.image_trash_type} className={cx("rounded-circle", "image1")} />
                            <div className="d-flex flex-column " style={{ width: "100%" }}>
                                <div className="d-flex" style={{ width: "100%", height: "19px" }}>
                                    <p style={{ fontSize: "12px", fontWeight: "500" }}>{trash.type}</p>
                                </div>
                                <div className="d-flex" style={{ width: "100%" }}>
                                    <p style={{ fontSize: "10px", marginRight: "5px" }}>{trash.trash_level_present}% </p>
                                    <p style={{ fontSize: "9px" }}>{trash.level_gauges}cm</p>
                                </div>
                            </div>
                        </div>
                    ) :
                        (<div key={trash._id} className="d-flex flex-column">
                            <div className="d-flex align-items-center">
                                <div style={{ height: "22px" }}>
                                    <p>No found device</p>
                                </div>
                                <FontAwesomeIcon style={{ color: "#993300", fontSize: "13px", marginLeft: "3px" }} icon={faExclamation} />
                            </div>
                        </div>)
                ))}
                <btn className="btn btn-outline-success">Detail</btn>
            </div>
        </div >
    )
}

export default TrashChildren