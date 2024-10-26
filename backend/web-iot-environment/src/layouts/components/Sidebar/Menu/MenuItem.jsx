import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import "./Menu.module.scss";
import { faAngleUp, faPlus, faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function MenuItem({ title, children, to, icon, activeIcon, toggle }) {
  const [isActive, setIsActive] = useState(false);
  const [onOff, setOnOff] = useState(false || isActive);
  const location = useLocation();
  const iconMap = {
    "Add trash can": faPlus,
    "See detail trash can": faEye,
    "Edit trash can": faEdit
  };


  useEffect(() => {
    const detailPath = `${to}/detailtrash`;
    const editPath = `${to}/editrash`;
    // Kiểm tra xem đường dẫn của liên kết có trùng với đường dẫn hiện tại không
    setOnOff(location.pathname.startsWith(detailPath) || location.pathname === `${to}/addtrash` || location.pathname.startsWith(editPath));
    setIsActive(location.pathname === to || location.pathname.startsWith(editPath) || location.pathname.startsWith(detailPath) || location.pathname === `${to}/addtrash`);
  }, [location.pathname, to]);

  const handleOnOff = () => {
    setOnOff(!onOff);
  };


  return (
    <div className={cx("menu-item", { "active": isActive }, { "toogle": toggle })}>
      <Link to={to}>
        <div className={cx("wrapper_item", { "toggle": toggle })}>
          <span className={cx('icon')} >{icon}</span>
          <span className={cx('active-icon')}>{activeIcon}</span>
          {!toggle && <span className={cx("title")}>{title}</span>}
          {title === "Manager Trash" && (
            <FontAwesomeIcon icon={faAngleUp} className={cx("faAngleUp", { "active": onOff }, { "toogle": toggle })} onClick={handleOnOff} />
          )}
        </div>
      </Link>
      {
        (title === "Manager Trash" && onOff) && (

          children.map((item, index) => (
            <Link to={item.to} key={index} className={cx("children_item", { active: onOff }, { "toogle": toggle })}>
              <div className={cx("wrapper_text")}>
                {iconMap[item.title] ? <FontAwesomeIcon icon={iconMap[item.title]} style={{ color: "#fff" }} /> : null}
                {toggle ? null : <span className={cx("text")}>{item.title}</span>}
              </div>
            </Link>
          ))

        )
      }
    </div >
  );
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.array,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  activeIcon: PropTypes.node.isRequired,
};

export default MenuItem;
