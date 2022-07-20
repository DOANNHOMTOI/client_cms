<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
            <router-link to="/permission" class="btn btn-primary waves-effect waves-light">Back</router-link>
          </div>
          <h4 class="page-title">Create Permission</h4>
        </div>
      </div>
    </div>
    <!-- end page title -->

    <div class="row">
      <div class="col-lg-12">
        <form>
          <div class="form-group mb-3">
            <label for="name">Name</label>
            <input v-model="name" type="text" id="name" class="form-control">
          </div>
          <button type="button" @click="createPermission()" class="btn btn-primary waves-effect waves-light">Submit
          </button>
        </form>
      </div> <!-- end col -->
    </div>

  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "PermissionAdd",
  data() {
    return {
      name: "",
      position: 0
    }
  },
  methods: {
    ...mapActions(['createPermissionAPI']),
    createPermission() {
      this.createPermissionAPI({name: this.name}).then(r => {
        if (r.data.success){
          alert('Success !')
          this.$router.push('/permission')
        }else{
          alert('Create Fail !')
        }
      }).catch(e => {
        console.log('e', e)
      })
    }
  }
}
</script>

<style scoped>

</style>
