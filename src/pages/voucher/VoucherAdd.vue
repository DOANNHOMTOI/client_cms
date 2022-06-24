<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
            <router-link to="/product-category/list" class="btn btn-primary waves-effect waves-light">Back</router-link>
          </div>
          <h4 class="page-title">Create Voucher</h4>
        </div>
      </div>
    </div>
    <!-- end page title -->

    <div class="row">
      <div class="col-lg-12">
        <form>
          <div v-if="errors.length">
            <div class="alert alert-danger">
              <p v-for="error in errors">- {{ error }}</p> <br>
            </div>
          </div>
          <div class="form-group mb-3">
            <label for="code">Code</label>
            <input v-model="code" type="text" id="code" class="form-control" min="6" max="6">
          </div>
          <div class="form-group mb-3">
            <label>Title</label>
            <input v-model="title" type="text" class="form-control">
          </div>
          <div class="form-group mb-3">
            <label>Percent (%)</label>
            <input v-model="percent_value" type="number" class="form-control">
          </div>
          <button type="button" @click="createVoucher()" class="btn btn-primary waves-effect waves-light">Submit
          </button>
        </form>
      </div> <!-- end col -->
    </div>

  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "VoucherAdd",
  data() {
    return {
      code: "",
      title: "",
      percent_value: "",
      errors: [],
    }
  },
  methods: {
    ...mapActions(['createVoucherAPI']),
    createVoucher() {
      this.errors = []
      if (!this.checkForm()) return false;

      this.createVoucherAPI({code: this.code,title: this.title,percent_value: this.percent_value}).then(r => {
        if (r.data.success){
          alert('Success !')
          this.$router.push('/voucher/list')
        }else{
          alert('Create Fail !')
        }
      }).catch(e => {
        console.log('e', e)
      })
    },
    checkForm(){
      let flag = true;
      if (this.code.length != 6) {
        this.errors.push('code is required 6 character !');
        flag = false;
      }
      if (!this.title) {
        this.errors.push('title required !');
        flag = false;
      }
      if (!this.percent_value) {
        this.errors.push('percent_value is required !');
        flag = false;
      }
      return flag;
    },
  }
}
</script>

<style scoped>

</style>
