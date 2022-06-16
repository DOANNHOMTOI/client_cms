

export default {
  listRegionsFromState: state => {
    return state.listRegions;
  },
  listPlansFromState: state => {
    return state.listPlans;
  },
  listOSFromState: state => {
    return state.listOS;
  },
  listIsoFromState: state => {
    return state.listIso;
  },
  listStartupScriptFromState: state => {
    return state.listStartupScript;
  },
  listSnapShotFromState: state => {
    return state.listSnapShot;
  },
  listApplicationFromState: state => {
    return state.listApplication;
  },
  listFireWallGroupFromState: state => {
    return state.listFireWallGroup;
  },
}
