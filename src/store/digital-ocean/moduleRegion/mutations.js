import {config} from "../../../constants/config";

export default {
  SET_LIST_REGIONS_DO(state, payload) {
    state.listRegionsDO = payload.regions;
    state.totalRegionDO = payload.meta.total;
  },
  SET_PAGE_REGION(state, payload) {
    state.per_page = payload.per_page;
    state.currentPage = payload.page;
  },
}
