<template>
  <div v-if="isShow && firewallItem != null">
    <b-modal
        id="modal-center"
        centered
        :title="getTitle"
        @show="showModal"
        @hidden="hideModal"
        hide-footer
    >
      <div class="form-group">
        <label>Choose Multiple Droplet</label>

        <multiselect v-model="droplet_ids" :options="getterListDropLetDO" :multiple="true"
                     :close-on-select="false" :clear-on-select="false" :preserve-search="true"
                     placeholder="Select Droplet" label="name" track-by="id" :preselect-first="true">
          <template slot="selection" slot-scope="{ values, search, isOpen }">
          </template>
        </multiselect>
      </div>
     <button class="btn btn-primary" @click.prevent="submitAddDroplet()">Submit</button>
    </b-modal>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex/dist/vuex.esm.browser";
import Multiselect from 'vue-multiselect'
export default {
  name: "ModalAddDropletToFireWall",
  data(){
    return {
      droplet_ids:''
    }
  },
  props: {
    isShow: {type: Boolean, default: false},
    firewallItem: {type: Object, default: false}
  },
  created() {
    this.getListDropLetDO({typeGet :'all'});
  },
  computed:{
    ...mapGetters(['getterListDropLetDO']),
    getTitle(){
      return 'Add Droplet to: ' + this.firewallItem.name
    }
  },
  methods: {
    ...mapActions(['hideModalAddDropletToFireWall','getListDropLetDO','handleAddDropletToFireWall']),
    showModal() {
      console.log('show modal')
    },
    hideModal() {
      this.hideModalAddDropletToFireWall();
      console.log('hideModal')
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      // bvModalEvt.preventDefault()
      // console.log('handleOk', this.droplet_ids)
    },
   async submitAddDroplet(){
      let droplet_ids = this.execDropletIds();
      await this.handleAddDropletToFireWall({firewallId:this.firewallItem.id,droplet_ids : droplet_ids})
    },
    execDropletIds() {
      let arrDropletIds = []
      this.droplet_ids.map((item) => {
        arrDropletIds.push(item.id)
      });
      return arrDropletIds;
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
