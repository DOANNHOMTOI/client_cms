<template>
  <tr>
    <td>{{ indexItem + 1 }}</td>
    <td>{{ sshKey.name }}</td>
    <td>{{ sshKey.fingerprint }}</td>
    <td style="word-break : break-word">{{ sshKey.public_key }}</td>
  </tr>
</template>

<script>
import {mapActions,mapGetters} from "vuex/dist/vuex.esm.browser";

export default {
  name: "DigitalOceanItemSshKey",
  created() {

  },
  props:{
    sshKey : { type: Object, default: null},
    indexItem : { type: Number, default: 0},
  },
  computed:{
    ...mapGetters([]),
  },
  methods:{
    ...mapActions([])
  }
}
</script>

<style scoped>

</style>
