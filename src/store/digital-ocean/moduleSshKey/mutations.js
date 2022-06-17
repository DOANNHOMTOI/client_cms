

export default {
  SET_LIST_SSH_KEY_DO(state, payload) {
    console.log('payload.ssh_keys', payload)
    state.listSshKeyDO = payload.length > 0 || payload.meta.total > 0 ?  payload.ssh_keys : [];
    state.totalSshKeylDO = payload.length > 0 ? payload.meta.total : 0;
  },
  SET_PAGE_SSH_KEY(state, payload) {
    state.per_page = payload.per_page;
    state.currentPage = payload.page;
  },
}
