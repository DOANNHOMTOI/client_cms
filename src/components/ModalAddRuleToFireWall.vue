<template>
  <div v-if="isShow && firewallItem != null">
    <b-modal
      id="modal-add-rule"
      centered
      :title="getTitle"
      @show="showModal"
      @hidden="hideModal"
      hide-footer
      size="xl"
    >
      <div class="form-group">
        <label>Inbound Rules <span class="text-danger">*</span>
          <button @click="increInboundRule()" type="button" class="btn btn-info">
            <i class="fas fa-plus"></i>
          </button>
        </label>
        <div class="row col-12 mx-0" v-for="(rule,index) in inbound_rules">
          <div class="form-group col-3">
            <label>Protocol<span class="text-danger">*</span></label>
            <select class="form-control" v-model=" rule.protocol">
              <option :value="item" v-for="item in enumProtocol">{{ item }}</option>
            </select>
          </div>
          <div class="form-group col-1">
            <label>Port<span class="text-danger">*</span>
            </label>
            <input v-model="rule.ports" type="number" class="form-control" placeholder="Enter Port"
            >
          </div>
          <div class="form-group col-8">
            <label>Droplet<span class="text-danger">*</span>
            </label>
            <multiselect v-model="rule.sources.droplet_ids" :options="getterListDropLetDO" :multiple="true"
                         :close-on-select="false" :clear-on-select="false" :preserve-search="true"
                         placeholder="Select SSH key" label="name" track-by="id" :preselect-first="true">
              <template slot="selection" slot-scope="{ values, search, isOpen }">
              </template>
            </multiselect>
          </div>
        </div>
      </div>
      <button class="btn btn-primary" @click.prevent="submitAddRule()">Submit</button>
    </b-modal>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex/dist/vuex.esm.browser";
import Multiselect from 'vue-multiselect'

export default {
  name: "ModalAddRuleToFireWall",
  data() {
    return {
      tags: '',
      inbound_rules: [
        {protocol: '', ports: '', sources: {droplet_ids: []}}
      ],
      enumProtocol: ["tcp", "udp", "icmp"]
    }
  },
  components: {
    Multiselect
  },
  props: {
    isShow: {type: Boolean, default: false},
    firewallItem: {type: Object, default: false}
  },
  created() {
    // this.getListTagsDO({typeGet :'all'});
  },
  computed: {
    ...mapGetters(['getterListDropLetDO']),
    getTitle() {
      return 'Add Rules to: ' + this.firewallItem.name
    }
  },
  methods: {
    ...mapActions(['hideModalAddRuleToFireWall', 'handleAddRuleToFireWall']),
    showModal() {
      console.log('show modal')
    },
    hideModal() {
      this.hideModalAddRuleToFireWall();
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      // bvModalEvt.preventDefault()
      // console.log('handleOk', this.droplet_ids)
    },
    async submitAddRule() {
      let inbound_rules = this.execRules();
      console.log('inbounds', inbound_rules)
      await this.handleAddRuleToFireWall({firewallId:this.firewallItem.id,inbound_rules:inbound_rules})
    },
    execRules() {
      let arrRule = []
      this.inbound_rules.map((item) => {
        if (item.ports !== '' && item.protocol !== '') {
          item.sources.droplet_ids = item.sources.droplet_ids.map(function (obj) {
            return obj.id;
          });
          arrRule.push(item)
        }
      });
      return arrRule;
    },
    increInboundRule() {
      this.inbound_rules.push({protocol: '', ports: '', sources: {droplet_ids: []}})
    },
    execDroplet(dropletIds) {
      let arrDroplet = []
      dropletIds.map((item) => {
        arrDroplet.push(item.id)
      });
      return arrDroplet;
    },
  },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.modal-dialog {
  max-width: 900px !important;
}
</style>
