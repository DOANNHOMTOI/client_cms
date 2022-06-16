<template>
  <div class="btn-group">
    <button type="button" class="btn btn-info">Action</button>
    <button type="button" class="btn btn-info dropdown-toggle dropdown-icon" data-toggle="dropdown" aria-expanded="false">
      <span class="sr-only">Toggle Dropdown</span>
    </button>
    <div class="dropdown-menu" role="menu" style="">
      <a  v-b-modal.modal-center @click="toggleShowModalAddDroplet()" class="dropdown-item">Add Droplet</a>
      <a  v-b-modal.modal-add-tag @click="toggleShowModalAddTag()" class="dropdown-item">Add Tag</a>
      <a  v-b-modal.modal-add-rule @click="toggleShowModalAddTag()" class="dropdown-item">Add Rule</a>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex/dist/vuex.esm.browser";
import ModalAddDropletToFireWall from "./ModalAddDropletToFireWall";
export default {
  name: "ActionMenuFireWallDO",
  data() {
    return {
      showModalAddDropletToFireWall: false
    }
  },
  components: {ModalAddDropletToFireWall},
  props:{
    firewallItem : { type : Object, default : null }
  },
  methods:{
    ...mapActions(['handleShowModalAddDropletToFireWall','handleShowModalAddTagToFireWall']),
    toggleShowModalAddDroplet(){
      this.handleShowModalAddDropletToFireWall(this.firewallItem);
    },
    toggleShowModalAddTag(){
      this.handleShowModalAddTagToFireWall(this.firewallItem);
    }
  }
}
</script>

<style scoped>

</style>
