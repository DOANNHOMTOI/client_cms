<template>
  <div v-if="isShow && firewallItem != null">
    <b-modal
        id="modal-add-tag"
        centered
        :title="getTitle"
        @show="showModal"
        @hidden="hideModal"
        hide-footer
    >
      <div class="form-group">
        <label>Choose Multiple Tag</label>

        <multiselect v-model="tags" :options="getterListTagDO" :multiple="true"
                     :close-on-select="false" :clear-on-select="false" :preserve-search="true"
                     placeholder="Select Tag" label="name" track-by="name" :preselect-first="true">
          <template slot="selection" slot-scope="{ values, search, isOpen }">
          </template>
        </multiselect>
      </div>
     <button class="btn btn-primary" @click.prevent="submitAddTag()">Submit</button>
    </b-modal>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex/dist/vuex.esm.browser";
import Multiselect from 'vue-multiselect'
export default {
  name: "ModalAddTagToFireWall",
  data(){
    return {
      tags:''
    }
  },
  props: {
    isShow: {type: Boolean, default: false},
    firewallItem: {type: Object, default: false}
  },
  created() {
    this.getListTagsDO({typeGet :'all'});
  },
  computed:{
    ...mapGetters(['getterListTagDO']),
    getTitle(){
      return 'Add Tag to: ' + this.firewallItem.name
    }
  },
  methods: {
    ...mapActions(['hideModalAddTagToFireWall','getListTagsDO','handleAddTagToFireWall']),
    showModal() {
      console.log('show modal')
    },
    hideModal() {
      this.hideModalAddTagToFireWall();
      console.log('hideModal')
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      // bvModalEvt.preventDefault()
      // console.log('handleOk', this.droplet_ids)
    },
   async submitAddTag(){
      let tags = this.execTags();
     console.log('tags', tags)
      await this.handleAddTagToFireWall({firewallId:this.firewallItem.id,tags:tags})
    },
    execTags() {
      let arrTagName = []
      this.tags.map((item) => {
        arrTagName.push(item.name)
      });
      return arrTagName;
    }
  },
  components:{
    Multiselect
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
