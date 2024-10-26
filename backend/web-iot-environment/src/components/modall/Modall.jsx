import { Modal } from '@mui/material';
import classNames from "classnames/bind";
import styles from "./Modall.module.scss";

const cx = classNames.bind(styles);


function Modall({ modalOpen, children, hanleClose, classNames }) {
    return (
        <Modal open={modalOpen} onClose={hanleClose} className={classNames} style={{ zIndex: "9999" }}>
            <div className={cx("wrapper", classNames)}>
                {children}
            </div>
        </Modal>
    )
}
export default Modall