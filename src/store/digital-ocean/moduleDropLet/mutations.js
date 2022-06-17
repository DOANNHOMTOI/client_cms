import {config} from "../../../constants/config";
import {isEmptyObject} from "../../../helpers";

export default {
  SET_LIST_DROP_LET_DO(state, payload) {
    state.listDropLetDO =  payload .length > 0 ? payload : [];
    state.totalDropLetDO =  payload .length > 0 || payload.meta.total > 0 ? payload.meta.total : 0;
  },
  SET_PAGE_DROP_LET(state, payload) {
    state.per_page = payload.per_page;
    state.currentPage = payload.page;
  },
  SET_LIST_SIZE_DO(state, payload) {
    state.listSizeDO = payload.sizes;
  },
  SET_LIST_IMAGE_DO(state, payload) {
    state.listImageDO = payload.images;
  },
  SET_LIST_SSH_KEY_DO(state, payload) {
    state.listSSHKeyDO = payload.ssh_keys;
  },
  SET_LIST_TAG_DO(state, payload) {
    state.listTagDO =  payload .length > 0  ? payload : [];
    state.totalTagDO =  payload .length > 0 || payload.meta.total > 0 ? payload.meta.total : 0;
  },
  SET_LIST_BACK_UP_SEARCH_DO(state, payload) {
    state.listBackupSearch = payload.data.backups;
  },
  SET_LIST_SNAP_SHOT_SEARCH_DO(state, payload) {
    state.listSnapShotSearch = payload.data.snapshots;
  },
  SET_LIST_KERNEL_SEARCH_DO(state, payload) {
    state.listSnapShotSearch = payload.data.kernels;
  },
  SET_LIST_FIREWALL_SEARCH_DO(state, payload) {
    state.listFireWallSearch = payload.data.firewalls;
  },
  SET_LIST_NEIGHBOR_SEARCH_DO(state, payload) {
    state.listNeighBorSearch = payload.data.droplets;
  },
  SET_LIST_RESOURCE_SEARCH_DO(state, payload) {
    state.listResourceSearch = payload.data;
  },
}
