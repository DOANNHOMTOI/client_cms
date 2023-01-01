
import {axiosDigitalOceanService, axiosInstance} from "../../../helpers/axiosInstance";
export default {
  async getListFireWallDO({commit, state}, {}) {
    try {
      var result = await axiosDigitalOceanService.get(`/firewalls?page=${state.currentPage}&per_page=${state.per_page}`);
      console.log('result', result)
      if (result.status == 200){
        let data = result.data.firewalls.length > 0 ? result.data : [];
        commit('SET_LIST_FIREWALL_DO', data)
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
      await commit('SET_PAGE_FIREWALL', {per_page,page})
      await dispatch('getListFireWallDO',{per_page, page}).then(function (){
        commit('SHOW_LOADING',false);
      });
    }catch (error) {
      console.log(error);
      commit('SHOW_LOADING',false);
      return false;
    }
  },
  async handleCreateFireWallDO({commit, dispatch}, data) {
    try {
      commit('SHOW_LOADING', true);
      await axiosDigitalOceanService.post(`/firewalls`, data)
        .then(async function (response) {

          ('response create droplet', response)
          await axiosInstance.post(`digital-ocean/firewall/create`, response.data.firewall)

          dispatch('showNotification', {title: 'Success !', type: 'success', duration: 5000, text: 'Creat FireWall Success !'})
          commit('SHOW_LOADING', false);
          //this.$router.push({name: 'digital-ocean-list-firewall'})
        })
        .catch(function (error) {
          commit('SHOW_LOADING', false);
          if (error.response) {
            // Request made and server responded
            console.log('error.response.data', error.response.data);
            console.log('error.response.status', error.response.status);
            console.log('error.response.headers', error.response.headers);
            // Show notify
            dispatch('showNotification', {title: 'Error',type: 'error',duration: 7000,text: error.response.data.message})
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

  async handleShowModalAddDropletToFireWall({commit, dispatch}, data){
    commit('SHOW_MODAL_ADD_DROPLET_TO_FIREWALL', data);
  },
  async hideModalAddDropletToFireWall({commit, dispatch}, data){
    commit('HIDE_MODAL_ADD_DROPLET_TO_FIREWALL', data);
  },
  async handleAddDropletToFireWall({commit, dispatch}, data){
    try {
      commit('SHOW_LOADING', true);
      await axiosDigitalOceanService.post(`/firewalls/${data.firewallId}/droplets`, data)
        .then(function (response) {
          commit('SHOW_LOADING', false);
          dispatch('showNotification', {title: 'Success !', type: 'success', duration: 5000, text: 'Add Droplet Success !'})
          // this.$router.push({name: 'digital-ocean-list-firewall'})
          // Ẩn modal
          dispatch('hideModalAddDropletToFireWall');
        })
        .catch(function (error) {
          commit('SHOW_LOADING', false);
          if (error.response) {
            // Request made and server responded
            console.log('error.response.data', error.response.data);
            console.log('error.response.status', error.response.status);
            console.log('error.response.headers', error.response.headers);
            // Show notify
            dispatch('showNotification', {title: 'Error',type: 'error',duration: 7000,text: error.response.data.message})
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
  async handleShowModalAddTagToFireWall({commit, dispatch}, data){
    commit('SHOW_MODAL_ADD_TAG_TO_FIREWALL', data);
  },
  async hideModalAddTagToFireWall({commit, dispatch}, data){
    commit('HIDE_MODAL_ADD_TAG_TO_FIREWALL', data);
  },
  async handleAddTagToFireWall({commit, dispatch}, data){
    try {
      commit('SHOW_LOADING', true);
      let obj = {
        tags: data.tags
      }
      await axiosDigitalOceanService.post(`/firewalls/${data.firewallId}/tags`,obj)
        .then(function (response) {
          commit('SHOW_LOADING', false);
          dispatch('showNotification', {title: 'Success !', type: 'success', duration: 5000, text: 'Add Tag Success !'})
          // this.$router.push({name: 'digital-ocean-list-firewall'})
          // Ẩn modal
          dispatch('hideModalAddTagToFireWall');
        })
        .catch(function (error) {
          commit('SHOW_LOADING', false);
          if (error.response) {
            // Request made and server responded
            console.log('error.response.data', error.response.data);
            console.log('error.response.status', error.response.status);
            console.log('error.response.headers', error.response.headers);
            // Show notify
            dispatch('showNotification', {title: 'Error',type: 'error',duration: 7000,text: error.response.data.message})
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
  async handleShowModalAddRuleToFireWall({commit, dispatch}, data){
    commit('SHOW_MODAL_ADD_TAG_TO_FIREWALL', data);
  },
  async hideModalAddRuleToFireWall({commit, dispatch}, data){
    commit('HIDE_MODAL_ADD_TAG_TO_FIREWALL', data);
  },
  async handleAddRuleToFireWall({commit, dispatch}, data){
    try {
      commit('SHOW_LOADING', true);
      let obj = {
        inbound_rules: data.inbound_rules
      }
      await axiosDigitalOceanService.post(`/firewalls/${data.firewallId}/rules`,obj)
        .then(function (response) {
          commit('SHOW_LOADING', false);
          dispatch('showNotification', {title: 'Success !', type: 'success', duration: 5000, text: 'Add Rule Success !'})
          // this.$router.push({name: 'digital-ocean-list-firewall'})
          // Ẩn modal
          dispatch('hideModalAddRuleToFireWall');
        })
        .catch(function (error) {
          commit('SHOW_LOADING', false);
          if (error.response) {
            // Request made and server responded
            console.log('error.response.data', error.response.data);
            console.log('error.response.status', error.response.status);
            console.log('error.response.headers', error.response.headers);
            // Show notify
            dispatch('showNotification', {title: 'Error',type: 'error',duration: 7000,text: error.response.data.message})
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
