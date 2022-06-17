
import {axiosDigitalOceanService,axiosInstance} from "../../../helpers/axiosInstance";
export default {
  async getListSshKeyDO({commit, state}, {}) {
    try {
      var result = await axiosDigitalOceanService.get(`/account/keys?page=${state.currentPage}&per_page=${state.per_page}`);
      if (result.status == 200){
        console.log('result.data',result.data)
        let data = result.data.ssh_keys.length > 0 ? result.data : [];
        commit('SET_LIST_SSH_KEY_DO', data)
      }else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async actionChangePage({ dispatch, commit },{per_page = 10 ,page}){
    try {
      commit('SHOW_LOADING',true);
      await commit('SET_PAGE_SSH_KEY', {per_page,page})
      await dispatch('getListSshKeyDO',{per_page, page}).then(function (){
        commit('SHOW_LOADING',false);
      });
    }catch (error) {
      console.log(error);
      commit('SHOW_LOADING',false);
      return false;
    }
  },
  async handleCreateSshKeyDO({commit, dispatch}, data) {
    try {
      commit('SHOW_LOADING', true);
      await axiosDigitalOceanService.post(`/account/keys`, data)
        .then(async function (response) {
          console.log('response create droplet', response)
          await axiosInstance.post(`digital-ocean/ssh-key/create`, response.data.ssh_key)
          dispatch('showNotification', {title: 'Success !', type: 'success', duration: 5000, text: 'Creat SSH Key Success !'})
          // await this.$router.push({name: 'digital-ocean-list-ssh-key'})
          await commit('SHOW_LOADING', false);
        })
        .catch(function (error) {
          commit('SHOW_LOADING', false);
          if (error.response) {
            // Request made and server responded
            console.log('error.response.data', error.response.data);
            console.log('error.response.status', error.response.status);
            console.log('error.response.headers', error.response.headers);
            // Show notify
            dispatch('showNotification', {
              title: 'Error',
              type: 'error',
              duration: 7000,
              text: error.response.data.message
            })
            // this.showNotification('Error','error',5000,error.response.data.message)
          } else if (error.request) {
            console.log('error.request', error.request);
          } else {
            console.log('Error', error.message);
            dispatch('showNotification', {title: 'Error', type: 'error', duration: 7000, text: 'Please try again !'})
          }
        });
    } catch (error) {
      console.log('error', error.message);
      commit('SHOW_LOADING', false);
      dispatch('showNotification', {title: 'Error', type: 'error', duration: 7000, text: 'Please try again !'})
      return false;
    }
  },
}
