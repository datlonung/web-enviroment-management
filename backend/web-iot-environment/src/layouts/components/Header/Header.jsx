// eslint-disable-next-line
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setLogin, setToken, setUser } from "../../../redux/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ButtonOfTrashcan from "../../../components/buttonOfTrashcan/ButtonOfTrashcan";
import HeadlessTippy from "@tippyjs/react/headless";
import PopperWraper from "../../../components/popper/Wrapper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const cx = classNames.bind(styles);

function Header({ handleToggle }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const handleLogout = () => {
    dispatch(setUser({}))
    dispatch(setToken(''))
    dispatch(setLogin(false))
    navigate('/login')
    toast.success("Logout successfully")
  }
  return (
    <header className={cx("wrapper")}>
      <div className={cx("brand")}>
        <img src={images.logoBrand} alt="" />
        <h1>ENVIR</h1>
      </div>
      <div className={cx("menu")}>
        <button className={cx("toggle")}>
          <FontAwesomeIcon icon={faBars} onClick={() => handleToggle((prev) => !prev)} />
        </button>
        {/* <div className={cx("search")}>
          <FontAwesomeIcon icon={faSearch} style={{ height: 16 }} />
          <input type="text" placeholder="Search" />
        </div> */}
        <div className={cx("right")}>
          <div className={cx("user")}>
            <h4 style={{ marginRight: "3px" }}>Welcome admin {user?.user_name}</h4>
            <HeadlessTippy
              interactive
              trigger="click"
              render={(attrs) => (
                <PopperWraper>
                  <div style={{ padding: "20px" }} className={cx("arrow_infor", "d-flex", "")} tabIndex="-1" {...attrs}>
                    <div className={cx("arrow_infor_bottom")}>
                      <ButtonOfTrashcan title={"Log out"} onClick={handleLogout} />
                    </div>
                    <div className={cx("border_infor")}></div>
                  </div>
                </PopperWraper>
              )}
            >
              <div className={cx("wrap_arrow")}>
                <img style={{ cursor: "pointer" }} src={"https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg" || images.account || images.noImgae} alt="" />
              </div>
            </HeadlessTippy>
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  // children: PropTypes.node.isRequired,
};

export default Header;
