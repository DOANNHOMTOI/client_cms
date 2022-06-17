import {isEmptyObject} from "../../helpers";

export default {
  getStatusLogin: state => {
    let token = state.ACCESS_TOKEN;
    if(!isEmptyObject(token)) {
      return true;
    } else {
      return false;
    }
  }
}
