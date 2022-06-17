import Vue from 'vue'
import Vuex from 'vuex'

import moduleUser from './moduleUser';
import moduleInstance from './moduleInstance'
import moduleDigitalOceanRegion from '././digital-ocean/moduleRegion'
import moduleDigitalOceanFireWall from '././digital-ocean/moduleFireWall'
import moduleDigitalOceanDropLet from '././digital-ocean/moduleDropLet'
import moduleDigitalOceanSshKey from '././digital-ocean/moduleSshKey'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoading : false
  },
  actions: {
    showNotification({commit, dispatch}, data) {
      Vue.notify({
        title: data.title,
        type: data.type,
        duration: data.duration,
        text: data.text
      })
    }
  },
  mutations: {
     SHOW_LOADING :(state, flag = false) => {
      state.isLoading = flag;
    }
  },
  modules: {
    moduleUser,moduleInstance, moduleDigitalOceanRegion,moduleDigitalOceanFireWall,moduleDigitalOceanDropLet,
   moduleDigitalOceanSshKey
  }
});

export default store;
