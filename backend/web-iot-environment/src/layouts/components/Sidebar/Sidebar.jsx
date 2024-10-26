import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import Menu from "./Menu/Menu";
import config from "../../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuItem from "./Menu/MenuItem";
import { faBarsProgress, faEarthAmericas, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectTrashCans } from "../../../redux/trashCanSlice";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);

function Sidebar({ toggle }) {
  const trashCans = useSelector(selectTrashCans);
  const [trashCan, setTrashCan] = useState({});

  useEffect(() => {
    if (trashCans) {
      setTrashCan(trashCans[0]);
    }
  }, [trashCans]);

  return (
    <aside className={cx("wrapper", { "active": toggle })}>
      <div className={cx("container")}>
        <Menu>
          <MenuItem
            title="Home"
            to={config.routes.home}
            icon={<FontAwesomeIcon icon={faHouse} />}
            activeIcon={<FontAwesomeIcon icon={faHouse} />}
            toggle={toggle}
          />
          <MenuItem
            title="Map"
            to={config.routes.map}
            icon={<FontAwesomeIcon icon={faEarthAmericas} />}
            activeIcon={<FontAwesomeIcon icon={faEarthAmericas} />}
            toggle={toggle}
          />
          <MenuItem
            title="Manager Trash"
            children={[
              { title: "Add trash can", to: config.routes.addTrash },
              { title: "See detail trash can", to: `/managertrash/detailtrash/${trashCan?._id}` },
              { title: "Edit trash can", to: `/managertrash/editrash/${trashCan?._id}` },
            ]}
            to={config.routes.managerTrash}
            icon={<FontAwesomeIcon icon={faBarsProgress} />}
            activeIcon={<FontAwesomeIcon icon={faBarsProgress} />}
            toggle={toggle}
          />
        </Menu>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  globalOnOff: PropTypes.func,
  onOff: PropTypes.bool,
};

export default Sidebar;
