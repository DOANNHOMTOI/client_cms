import {config} from "../../constants/config";

export default {
  ACCESS_TOKEN: localStorage.getItem('ACCESS_TOKEN'),
  permissionUser: localStorage.getItem('permissions'),
  currentUser: null,
}
