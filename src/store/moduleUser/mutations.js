import {config} from "../../constants/config";

export default {
  SET_TOKEN_LOCAL_STORAGE(state, payload) {
    localStorage.setItem('ACCESS_TOKEN', payload.result.data.data.token);
    localStorage.setItem('USER_INFO_VPS', JSON.stringify(payload.result.data.data.profile));
    localStorage.setItem('i4sign_in', JSON.stringify(payload.obj));
    state.ACCESS_TOKEN = payload.result.data.data.token;
    state.currentUser = payload.result.data.data.profile
  },
  SET_LOGIN_INFO(state, payload) {
    localStorage.setItem('ACCESS_TOKEN', payload.accessToken);
    localStorage.setItem('USER_INFO_VPS', payload.userVps);
    localStorage.setItem('i4sign_in', payload.userLocal);
    state.ACCESS_TOKEN = payload.accessToken;
    state.currentUser = payload.userVps
  },
}
