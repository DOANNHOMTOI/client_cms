import {isEmptyObject} from "../../../helpers";

export default {
  getterListFireWallDO: state => {
    return state.listFireWallDO;
  },
  getterTotalFireWallDO: state => {
    return state.totalFireWallDO;
  },
  getterPageFireWallDO: state => {
    return {per_page : state.per_page , currentPage : state.currentPage  };
  },
  getterIsShowModalAddDropletToFireWall: state => {
    return state.showModalAddDroplet;
  },
  getterFireWallAddAttribute: state => {
    return state.firewallAddAttribute;
  },
  getterIsShowModalAddTagToFireWall: state => {
    return state.showModalAddTag;
  },
  getterIsShowModalAddRuleToFireWall: state => {
    return state.showModalAddRule;
  },
}
