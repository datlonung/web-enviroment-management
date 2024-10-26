import classNames from 'classnames/bind';
import styles from './ButtonOfTrashcan.module.scss';

const cx = classNames.bind(styles);
function ButtonOfTrashcan({ title, className, onClick }) {
  return (
    <button className={cx("button-24", className)} onClick={onClick}>{title}</button>
  )
}

export default ButtonOfTrashcan