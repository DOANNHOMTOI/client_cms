export default {
  SET_LIST_FIREWALL_DO(state, payload) {
    console.log('payload', payload)
    state.listFireWallDO = payload .length > 0 || payload.meta.total > 0 ?  payload.firewalls : [];
    state.totalFireWallDO = payload .length > 0 || payload.meta.total > 0 ? payload.meta.total : 0;
  },
  SET_PAGE_FIREWALL(state, payload) {
    state.per_page = payload.per_page;
    state.currentPage = payload.page;
  },
  SHOW_MODAL_ADD_DROPLET_TO_FIREWALL(state,payload){
    state.showModalAddDroplet = true;
    state.firewallAddAttribute = payload;
  },
  HIDE_MODAL_ADD_DROPLET_TO_FIREWALL(state,payload){
    state.showModalAddDroplet = false;
    state.firewallAddAttribute = null;
  },
  SHOW_MODAL_ADD_TAG_TO_FIREWALL(state,payload){
    state.showModalAddTag = true;
    state.firewallAddAttribute = payload;
  },
  HIDE_MODAL_ADD_TAG_TO_FIREWALL(state,payload){
    state.showModalAddTag = false;
    state.firewallAddAttribute = null;
  },
  SHOW_MODAL_ADD_RULE_TO_FIREWALL(state,payload){
    state.showModalAddRule = true;
    state.firewallAddAttribute = payload;
  },
  HIDE_MODAL_ADD_RULE_TO_FIREWALL(state,payload){
    state.showModalAddRule = false;
    state.firewallAddAttribute = null;
  }
}
