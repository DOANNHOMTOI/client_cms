
import {axiosDigitalOceanService} from "../../../helpers/axiosInstance";
export default {
  async getListRegionDO({commit, state}, {typeGet}) {
    try {
      var result;
      if (typeGet === 'all' ){
        result = await axiosDigitalOceanService.get(`/regions`);
      }else{
        result = await axiosDigitalOceanService.get(`/regions?page=${state.currentPage}&per_page=${state.per_page}`);
      }
      if (result.status == 200){
        let data = result.data.regions.length > 0 ? result.data : [];
        commit('SET_LIST_REGIONS_DO', data);
        return result;
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
      await commit('SET_PAGE_REGION', {per_page,page})
      await dispatch('getListRegionDO',{}).then(function (){
        commit('SHOW_LOADING',false);
      });
    }catch (error) {
      console.log(error);
      commit('SHOW_LOADING',false);
      return false;
    }
  }
}
