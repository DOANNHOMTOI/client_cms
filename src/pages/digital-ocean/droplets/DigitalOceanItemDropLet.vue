<template>
  <tr>
    <td>{{ indexItem + 1 }}</td>
    <td>{{ droplet.name}}</td>
    <td>
      Memory : {{  droplet.memory}} <br>
      Vcpus : {{  droplet.vcpus}} <br>
      Disk : {{  droplet.disk}} <br>
    </td>
    <td>{{ 'SIZE' }}</td>
    <td>{{ 'Image' }}</td>
    <td>{{ droplet.locked }}</td>
    <td v-html="this.getStatus(droplet.status)"></td>
    <td>{{ this.getDate(droplet.created_at) }}</td>
<!--    <td>-->
<!--      <ActionMenuDropletDO />-->
<!--    </td>-->
  </tr>
</template>

<script>
import {mapActions,mapGetters} from "vuex";
import {formatDate} from "../../../helpers";
// import ActionMenuDropletDO from "../../../components/ActionMenuDropletDO";
export default {
  name: "DigitalOceanItemDropLet",
  created() {
    this.getListDropLetDO({});
  },
  components:{
    // ActionMenuDropletDO,
  },
  props:{
    droplet : { type: Object, default: null},
    indexItem : { type: Number, default: 0},
  },
  computed:{
    ...mapGetters(['getterListDropLetDO']),
    isAvailable: function () {
      return {
        'badge-success': this.region.available,
        'badge-danger': !this.region.available
      }
    }
  },
  methods:{
    ...mapActions(['getListDropLetDO']),
    getDate(date){
      return formatDate(date);
    },
    getStatus(status){
      if (status){
        return `<span class="badge badge-success">Active</span>`
      }
      return `<span class="badge badge-danger">De Active</span>`
    }
  }
}
</script>

<style scoped>

</style>
