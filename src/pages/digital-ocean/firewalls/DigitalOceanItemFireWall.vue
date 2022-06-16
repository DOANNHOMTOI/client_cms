<template>
  <tr>
    <td>{{ indexItem + 1 }}</td>
    <td>{{ fireWall.name}}</td>
    <td>{{ fireWall.status}}</td>
    <td>{{ fireWall.created_at }}</td>
    <td>
      <ActionMenuFireWallDO
        :firewallItem = "fireWall"
      />
    </td>
  </tr>
</template>

<script>
import {mapActions,mapGetters} from "vuex/dist/vuex.esm.browser";
import ActionMenuFireWallDO from "../../../components/ActionMenuFireWallDO";

export default {
  name: "DigitalOceanItemFireWall",
  created() {

  },
  components:{
    ActionMenuFireWallDO,
  },
  props:{
    fireWall : { type: Object, default: null},
    indexItem : { type: Number, default: 0},
  },
  computed:{
    ...mapGetters([]),
  },
  methods:{
    ...mapActions(['getListRegionDO'])
  }
}
</script>

<style scoped>

</style>
