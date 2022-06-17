import {axiosDigitalOceanService, axiosInstance} from "../../../helpers/axiosInstance";
import Vue from "vue";
export default {
  async getListDropLetDO({commit, state}, {typeGet}) {
    try {
      if (typeGet === 'all' ){
        result = await axiosDigitalOceanService.get(`/droplets`);
      }else{
        var result = await axiosDigitalOceanService.get(`/droplets?page=${state.currentPage}&per_page=${state.per_page}`);
      }
      if (result.status == 200) {
        let data = result.data.droplets;
        commit('SET_LIST_DROP_LET_DO', data)
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async actionChangePage({dispatch, commit}, {per_page = 10, page}) {
    try {
      commit('SHOW_LOADING', true);
      await commit('SET_PAGE_DROP_LET', {per_page, page})
      await dispatch('getListDropLetDO', {per_page, page}).then(function () {
        commit('SHOW_LOADING', false);
      });
    } catch (error) {
      console.log(error);
      commit('SHOW_LOADING', false);
      return false;
    }
  },
  async getListSizeDO({commit, state}, {}) {
    try {
      var result = await axiosDigitalOceanService.get(`/sizes`);
      if (result.status == 200) {
        let data = result.data.sizes.length > 0 ? result.data : [];
        commit('SET_LIST_SIZE_DO', data)
        return result;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getListImageDO({commit, state}, {}) {
    try {
      var result = await axiosDigitalOceanService.get(`/images`);
      if (result.status == 200) {
        let data = result.data.images.length > 0 ? result.data : [];
        commit('SET_LIST_IMAGE_DO', data);
        return result;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getListSSHKeyDO({commit, state}, {}) {
    try {
      var result = await axiosDigitalOceanService.get(`/account/keys`);
      if (result.status == 200) {
        let data = result.data.ssh_keys.length > 0 ? result.data : [];
        commit('SET_LIST_SSH_KEY_DO', data)
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async handleCreateDropLetDO({commit, dispatch}, data) {
    try {
      commit('SHOW_LOADING', true);
      console.log('data create', JSON.stringify(data))
      await axiosDigitalOceanService.post(`/droplets`, data)
        .then(async function (response) {
          await axiosInstance.post(`digital-ocean/droplet/create`, response.data.droplet)
          dispatch('showNotification', {title: 'Success !', type: 'success', duration: 5000, text: 'Creat Droplet Success !'})
          commit('SHOW_LOADING', false);
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
  async getListTagsDO({commit, state}, {typeGet}) {
    try {
      if (typeGet === 'all' ){
        result = await axiosDigitalOceanService.get(`/tags`);
      }else{
        var result = await axiosDigitalOceanService.get(`/tags?page=${state.currentPage}&per_page=${state.per_page}`);
      }
      if (result.status == 200) {
        let data = result.data.tags;
        console.log(data)
        commit('SET_LIST_TAG_DO', data)
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getListBackUpByDroplet({commit, state}, data){
    try {
      commit('SHOW_LOADING', true);
      const result = await axiosDigitalOceanService.get(`/droplets/${data}/backups`);
      if (result.status === 200) {
        commit('SET_LIST_BACK_UP_SEARCH_DO', result)
        commit('SHOW_LOADING', false);
        return result;
      } else {
        commit('SHOW_LOADING', false);
        console.log('error getListBackUpByDroplet', result)
        return [];
      }
    } catch (error) {
      console.log('error catch getListBackUpByDroplet', error);
      commit('SHOW_LOADING', false);
      return [];
    }
  },
  async getListSnapShotByDroplet({commit, state}, data) {
    try {
      commit('SHOW_LOADING', true);
      const result = await axiosDigitalOceanService.get(`/droplets/${data}/snapshots`);
      if (result.status === 200) {
        commit('SET_LIST_SNAP_SHOT_SEARCH_DO', result)
        commit('SHOW_LOADING', false);
        return result;
      } else {
        commit('SHOW_LOADING', false);
        console.log('error getListSnapShotByDroplet', result)
        return [];
      }
    } catch (error) {
      console.log('error catch getListSnapShotByDroplet', error);
      commit('SHOW_LOADING', false);
      return [];
    }
  },
  async getListKernelByDroplet({commit, state}, data) {
    try {
      commit('SHOW_LOADING', true);
      const result = await axiosDigitalOceanService.get(`/droplets/${data}/kernels`);
      if (result.status === 200) {
        commit('SET_LIST_KERNEL_SEARCH_DO', result)
        commit('SHOW_LOADING', false);
        return result;
      } else {
        commit('SHOW_LOADING', false);
        console.log('error getListKernelByDroplet', result)
        return [];
      }
    } catch (error) {
      console.log('error catch getListKernelByDroplet', error);
      commit('SHOW_LOADING', false);
      return [];
    }
  },
  async getListFireWallByDroplet({commit, state}, data) {
    try {
      commit('SHOW_LOADING', true);
      const result = await axiosDigitalOceanService.get(`/droplets/${data}/firewalls`);
      if (result.status === 200) {
        commit('SET_LIST_FIREWALL_SEARCH_DO', result)
        commit('SHOW_LOADING', false);
        return result;
      } else {
        commit('SHOW_LOADING', false);
        console.log('error getListFireWallByDroplet', result)
        return [];
      }
    } catch (error) {
      console.log('error catch getListFireWallByDroplet', error);
      commit('SHOW_LOADING', false);
      return [];
    }
  },
  async getListNeighBorByDroplet({commit, state}, data) {
    try {
      commit('SHOW_LOADING', true);
      const result = await axiosDigitalOceanService.get(`/droplets/${data}/neighbors`);
      if (result.status === 200) {
        commit('SET_LIST_NEIGHBOR_SEARCH_DO', result)
        commit('SHOW_LOADING', false);
        return result;
      } else {
        commit('SHOW_LOADING', false);
        console.log('error getListNeighBorByDroplet', result)
        return [];
      }
    } catch (error) {
      console.log('error catch getListNeighBorByDroplet', error);
      commit('SHOW_LOADING', false);
      return [];
    }
  },
  async getListResourceByDroplet({commit, state}, data) {
    try {
      commit('SHOW_LOADING', true);
      const result = await axiosDigitalOceanService.get(`/droplets/${data}/destroy_with_associated_resources`);
      if (result.status === 200) {
        commit('SET_LIST_RESOURCE_SEARCH_DO', result)
        commit('SHOW_LOADING', false);
        return result;
      } else {
        commit('SHOW_LOADING', false);
        console.log('error getListResourceByDroplet', result)
        return [];
      }
    } catch (error) {
      console.log('error catch getListResourceByDroplet', error);
      commit('SHOW_LOADING', false);
      return [];
    }
  }
}
