import {isEmptyObject} from "../../helpers";
import {axiosInstance} from "../../helpers/axiosInstance";
import store from "../index";

export default {
  async login({commit, state}, data) {
    try {
      let obj = {
        email: data.email,
        password: data.password
      }

      let result = await axiosInstance.post('/login', obj);
      if (result.status == 200 && result.data.success) {
        // commit('SET_USER_INFO', result.data.user);
        commit('SET_TOKEN_LOCAL_STORAGE', {result, obj});
        return result;
      } else {
        console.log('Login fail !', result)
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async checkLogin({commit, dispatch}) {
    try {
      let userLocal = localStorage.getItem('i4sign_in');
      let userVps = localStorage.getItem('USER_INFO_VPS');
      let accessToken = localStorage.getItem('ACCESS_TOKEN');

      let data = {userLocal,userVps,accessToken}

      if(!isEmptyObject(userLocal)) {
        commit('SET_LOGIN_INFO', data);
        return true
      }
      return false;

    } catch (error) {
      return false;
    }
  },
}
