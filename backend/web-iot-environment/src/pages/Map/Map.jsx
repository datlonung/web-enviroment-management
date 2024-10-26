import GoongMap from "../../components/Googmap/GoongMap";
import classNames from "classnames/bind";
import styles from "./Map.module.scss";
import { useSelector } from "react-redux";
import { selectTrashCans } from "../../redux/trashCanSlice";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function Map() {
    const trashCans = useSelector(selectTrashCans);
    const [trashCanss, setTrashCanss] = useState([]);

    useEffect(() => {
        setTrashCanss(trashCans);
    }, [trashCans]);

    return (
        <div className={cx("wrapper")}>
            {trashCanss?.length > 0 && <GoongMap trashCans={trashCanss} />}
        </div>
    )
};

export default Map;
