import {isEmptyObject} from "../../../helpers";

export default {
  getterListSshKeyDO: state => {
    return state.listSshKeyDO;
  },
  getterTotalSshKeyDO: state => {
    return state.totalSshKeyDO;
  },
  getterPageSshKeyDO: state => {
    return {per_page : state.per_page , currentPage : state.currentPage  };
  },
}
