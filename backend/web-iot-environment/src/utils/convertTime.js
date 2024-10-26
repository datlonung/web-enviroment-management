import moment from 'moment';
const convertTime = (timeString) => {
    return moment(timeString).format('dddd, MMMM Do YYYY, h:mm:ss a');
};

export default convertTime;