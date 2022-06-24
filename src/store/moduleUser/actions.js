import {isEmptyObject} from "../../helpers";
import {axiosInstance} from "../../helpers/axiosInstance";
import store from "../index";
import router from "../../router";
async function uploadFile(data) {
  console.log('data', data)
  let image_id = null
  let file1 = null
  let file2 = null
  let file3 = null
  const headers = {Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')};
  const formData = new FormData()
  formData.append('file', data.image_id)
  // eslint-disable-next-line camelcase

  if (data.image_id !== '') {
    const formData = new FormData()
    formData.append('file', data.image_id)
    image_id = await axiosInstance.post('/api/upload', formData, { headers })
  }
  if (data.image_1 !== '') {
    const formData2 = new FormData()
    formData2.append('file', data.image_1)
    file1 = await axiosInstance.post('/api/upload', formData2, { headers })
  }
  if (data.image_2 !== '') {
    const formData3 = new FormData()
    formData3.append('file', data.image_2)
    file2 = await axiosInstance.post('/api/upload', formData3, { headers })
  }
  if (data.image_3 !== '') {
    const formData4 = new FormData()
    formData4.append('file', data.image_3)
    file3 = await axiosInstance.post('/api/upload', formData4, { headers })
  }
  return {
    image_id,
    file1,
    file2,
    file3
  }
}

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
  async createProductAPI({commit, state}, data) {
    commit('SHOW_LOADING', true)
    try {
      const headers = {Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')};
      await uploadFile(data).then(async res => {
        const arrImages = []
        if (res.file1 != null) arrImages.push(res.file1.data.data)
        if (res.file2 != null) arrImages.push(res.file2.data.data)
        if (res.file3 != null) arrImages.push(res.file3.data.data)
        data.image = res.image_id.data.data
        data.images = arrImages.join(',')
        console.log(JSON.stringify(data))
        await axiosInstance.post('/api/product', data, { headers })
          // eslint-disable-next-line consistent-return
          .then(async response => {
            // If request is good...
            console.log('response create product', response)
            await commit('SHOW_LOADING', false)
            if (response.data.success){
              alert('create success')
              await router.push('/product/list');
            }else{
              alert(response.data.message)
            }
          })
          .catch(error => {
            console.log(error)
            alert('Create Fail !')
            commit('SHOW_LOADING', false)
            return false
          })
      }).catch(e => {
        console.log('e', e)
        alert('Upload File Fail !')
      })
    } catch (error) {
      console.log(error)
      commit('SHOW_LOADING', false)
      return false
    }
  },
  async getProductDetail({commit, state}, id) {
    try {
      const headers = {Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')};
      commit('SHOW_LOADING', true);
      return await axiosInstance.get(`/api/product/${id}`,{headers: headers}).then(r => {
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
  async updateProductAPI({commit, state}, data) {
    commit('SHOW_LOADING', true)
    try {
      const headers = {Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')};
      await uploadFile(data).then(async res => {
        const arrImages = []
        if (res.file1 != null) arrImages.push(res.file1.data.data)
        if (res.file2 != null) arrImages.push(res.file2.data.data)
        if (res.file3 != null) arrImages.push(res.file3.data.data)
        if (res.image_id != null){
          data.image = res.image_id.data.data
        }
        data.images = arrImages.join(',')
        // console.log(JSON.stringify(data))
        console.log(data)
        await axiosInstance.put(`/api/product/${data.id}`, data, { headers })
          // eslint-disable-next-line consistent-return
          .then(async response => {
            // If request is good...
            console.log('response update product', response)
            await commit('SHOW_LOADING', false)
            if (response.data.success){
              alert('update success')
              await router.push('/product/list');
            }else{
              alert(response.data.message)
            }
          })
          .catch(error => {
            console.log(error)
            alert('update Fail !')
            commit('SHOW_LOADING', false)
            return false
          })
      }).catch(e => {
        console.log('e', e)
        alert('Upload File Fail !')
      })
    } catch (error) {
      console.log(error)
      commit('SHOW_LOADING', false)
      return false
    }
  },
  async getListVoucher({commit, state}, currPage) {
    try {
      const headers = {Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')};
      commit('SHOW_LOADING', true);
      console.log('currPage', currPage)
      return await axiosInstance.get(`/api/voucher?page=${currPage}`,{headers : headers}).then(r => {
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
  async createVoucherAPI({commit, state}, data) {
    try {
      const headers = {Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')};
      commit('SHOW_LOADING', true);
      console.log('data', data)
      return await axiosInstance.post(`/api/voucher`,data,{headers: headers}).then(r => {
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
  async getVoucherDetail({commit, state}, id) {
    try {
      const headers = {Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')};
      commit('SHOW_LOADING', true);
      return await axiosInstance.get(`/api/voucher/${id}`,{headers: headers}).then(r => {
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
  async updateVoucher({commit, state}, data) {
    try {
      const headers = {Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')};
      commit('SHOW_LOADING', true);
      console.log('data', data)
      return await axiosInstance.put(`/api/voucher/${data.id}`,data,{headers: headers}).then(r => {
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
