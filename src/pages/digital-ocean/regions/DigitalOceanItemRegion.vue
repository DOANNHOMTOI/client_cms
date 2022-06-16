<template>
  <tr>
    <td>{{ indexItem + 1 }}</td>
    <td>{{ region.name}}</td>
    <td>{{ region.slug}}</td>
    <td>{{ region.features.length ? region.features.join(',') : ''}}</td>
    <td>{{ region.sizes.length ? region.sizes.join(',') : ''}}</td>
    <td>
      <span class="badge" v-bind:class="isAvailable">
        {{ region.available}}
      </span>
    </td>
  </tr>
</template>

<script>
import {mapActions,mapGetters} from "vuex/dist/vuex.esm.browser";

export default {
  name: "DigitalOceanItemRegion",
  created() {
    this.getListRegionDO({});
  },
  props:{
    region : { type: Object, default: null},
    indexItem : { type: Number, default: 0},
  },
  computed:{
    ...mapGetters(['getterListRegionDO']),
    isAvailable: function () {
      return {
        'badge-success': this.region.available,
        'badge-danger': !this.region.available
      }
    }
  },
  methods:{
    ...mapActions(['getListRegionDO'])
  }
}
</script>

<style scoped>

</style>
