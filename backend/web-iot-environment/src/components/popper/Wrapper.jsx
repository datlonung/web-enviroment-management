import classNames from "classnames/bind";
import styles from "./Popper.module.scss";

const cx = classNames.bind(styles);
function Wrapper({ children, className }) {
  return (
    <div className={cx("wrapper", className)} style={{ zIndex: "9998" }}>{children}</div>
  )
}

export default Wrapper