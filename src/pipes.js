/**
 * Created by spring on 2018/1/19.
 */
import moment from "moment";
export default {
    formDate: _formDate
}
function _formDate(date, pattern) {
    if (!pattern) pattern = 'YYYY-MM-DD HH:mm:ss';
    return moment(date).format(pattern);
}