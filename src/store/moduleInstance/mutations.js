import {config} from "../../constants/config";

export default {
  SET_LIST_REGIONS(state, payload) {
    state.listRegions = payload;
  },
  SET_LIST_PLANS(state, payload) {
    state.listPlans = payload;
  },
  SET_LIST_OS(state, payload) {
    state.listOS = payload;
  },
  SET_LIST_ISO(state, payload) {
    state.listIso = payload;
  },
  SET_LIST_START_UP_SCRIPT(state, payload) {
    state.listStartupScript = payload;
  },
  SET_LIST_SNAP_SHOT(state, payload) {
    state.listSnapShot = payload;
  },
  SET_LIST_APPLICATION(state, payload) {
    state.listApplication = payload;
  },
  SET_LIST_FIRE_WALL_GROUP(state, payload) {
    state.listFireWallGroup = payload;
  },
}
