import {isEmptyObject} from "../../../helpers";

export default {
  getterListRegionDO: state => {
    return state.listRegionsDO;
  },
  getterTotalRegionDO: state => {
    return state.totalRegionDO;
  },
  getterPageRegionDO: state => {
    return {per_page : state.per_page , currentPage : state.currentPage  };
  },
}
