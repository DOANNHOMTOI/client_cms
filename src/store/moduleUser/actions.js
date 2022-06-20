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

      let result = await axiosInstance.post('/api/login', obj);
      console.log('result', result)
      if (result.data.success) {
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
    console.log('check login')
    try {
      let userLocal = localStorage.getItem('i4sign_in');
      let userVps = localStorage.getItem('USER_INFO_VPS');
      let accessToken = localStorage.getItem('ACCESS_TOKEN');

      let data = {userLocal, userVps, accessToken}

      if (!isEmptyObject(userLocal)) {
        commit('SET_LOGIN_INFO', data);
        return true
      }
      return false;

    } catch (error) {
      return false;
    }
  },
  async getListProductCategory({commit, state}, currPage) {
    try {
      const headers = {Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')};
      commit('SHOW_LOADING', true);
      console.log('currPage', currPage)
      return await axiosInstance.get(`/api/product-category?page=${currPage}`,{headers : headers}).then(r => {
        commit('SHOW_LOADING', false);
        return r
      })
        .catch(e => {
          commit('SHOW_LOADING', false);
          console.log(e)
        });

    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async createProductCategory({commit, state}, data) {
    try {
      const headers = {Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')};
      commit('SHOW_LOADING', true);
      console.log('data', data)
      return await axiosInstance.post(`/api/product-category`,data,{headers: headers}).then(r => {
        commit('SHOW_LOADING', false);
        return r
      })
        .catch(e => {
          commit('SHOW_LOADING', false);
          console.log(e)
        });

    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async updateProductCategory({commit, state}, data) {
    try {
      const headers = {Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')};
      commit('SHOW_LOADING', true);
      console.log('data', data)
      return await axiosInstance.put(`/api/product-category/${data.id}`,data,{headers: headers}).then(r => {
        commit('SHOW_LOADING', false);
        return r
      })
        .catch(e => {
          commit('SHOW_LOADING', false);
          console.log(e)
        });

    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getProductCategory({commit, state}, id) {
    try {
      const headers = {Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')};
      commit('SHOW_LOADING', true);
      return await axiosInstance.get(`/api/product-category/${id}`,{headers: headers}).then(r => {
        commit('SHOW_LOADING', false);
        return r
      })
        .catch(e => {
          commit('SHOW_LOADING', false);
          console.log(e)
        });

    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getListProduct({commit, state}, currPage) {
    try {
      const headers = {Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')};
      commit('SHOW_LOADING', true);
      console.log('currPage', currPage)
      return await axiosInstance.get(`/api/product?page=${currPage}`,{headers : headers}).then(r => {
        commit('SHOW_LOADING', false);
        return r
      })
        .catch(e => {
          commit('SHOW_LOADING', false);
          console.log(e)
        });

    } catch (error) {
      console.log(error);
      return false;
    }
  },
}
