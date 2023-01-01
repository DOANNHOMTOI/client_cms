import {isEmptyObject} from "../../../helpers";

export default {
  getterListDropLetDO: state => {
    return state.listDropLetDO;
  },
  getterTotalDropLetDO: state => {
    return state.totalDropLetDO;
  },
  getterPageDropLetDO: state => {
    return {per_page : state.per_page , currentPage : state.currentPage  };
  },
  getterListSizeDO: state => {
    return state.listSizeDO;
  },
  getterListImageDO: state => {
    return state.listImageDO;
  },
  getterListSSHKeyDO: state => {
    return state.listSSHKeyDO;
  },
  getterListTagDO: (state) => {
    return state.listTagDO;
  },
  getterListBackupSearch: (state) => {
    return state.listBackupSearch;
  },
  getterListSnapShotSearch: (state) => {
    return state.listSnapShotSearch;
  },
  getterListKernelSearch: (state) => {
    return state.listKernelSearch;
  },
  getterListFireWallSearch: (state) => {
    return state.listFireWallSearch;
  },
  getterListNeighBorSearch: (state) => {
    return state.listNeighBorSearch;
  },
  getterListResourceSearch: (state) => {
    return state.listResourceSearch;
  },
}
