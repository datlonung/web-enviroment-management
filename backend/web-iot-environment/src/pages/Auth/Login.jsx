import Login from "../../components/auth/Login"
import classNames from "classnames/bind";
import styles from "./Login.module.scss";

const cx = classNames.bind(styles);

function LoginPage() {
    return (
        <div className={cx("wrapper")}>
            <Login />
        </div>
    )
};

export default LoginPage;
