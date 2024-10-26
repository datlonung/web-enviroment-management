import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./DefaultLayOut.module.scss";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import { useState } from "react";
import useCheckToken from "../../utils/useCheckToken";
import useMqttEffects from "../../utils/mqttEffects";
import useCallApiOnlyOne from "../../utils/useCallApiOnlyOne";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const [toggle, setToggle] = useState(false);
  useCheckToken();
  useMqttEffects();
  useCallApiOnlyOne();
  return (
    <div className={cx("wrapper")}>
      <Header handleToggle={setToggle} />
      <div className={cx("container")}>
        <Sidebar
          toggle={toggle}
        />
        <div className={cx("content", { "active": toggle })}>{children}</div>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;
