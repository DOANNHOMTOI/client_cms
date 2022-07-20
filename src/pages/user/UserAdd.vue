<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
            <router-link to="/user" class="btn btn-primary waves-effect waves-light">Back</router-link>
          </div>
          <h4 class="page-title">Create Partner</h4>
        </div>
      </div>
    </div>
    <!-- end page title -->

    <div class="row">
      <div class="col-lg-12">
        <form>
          <div class="form-group mb-3">
            <label for="name">Email</label>
            <input v-model="email" type="text" id="name" class="form-control">
          </div>
          <div class="form-group mb-3">
            <label for="name">Password</label>
            <input v-model="password" type="password" id="password" class="form-control">
          </div>
          <button type="button" @click="createPartner()" class="btn btn-primary waves-effect waves-light">Submit
          </button>
        </form>
      </div> <!-- end col -->
    </div>

  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "UserAdd",
  data() {
    return {
      email: "",
      password: "",
      position: 0
    }
  },
  methods: {
    ...mapActions(['createPartnerAPI']),
    createPartner() {
      this.createPartnerAPI({email: this.email,password: this.password}).then(r => {
        if (r.data.success){
          alert('Success !')
          this.$router.push('/user')
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
