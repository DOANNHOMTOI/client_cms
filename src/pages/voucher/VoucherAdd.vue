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
              <p v-for="error in errors" :key="error">- {{ error }}</p> <br>
            </div>
          </div>
          <div class="form-group mb-3">
            <label for="code">Code</label>
            <input style="background-color: lightgray" disabled readonly v-model="code" type="text" id="code"
              class="form-control" min="6" max="6">
          </div>
          <div class="form-group mb-3">
            <label>Title</label>
            <input v-model="title" type="text" class="form-control">
          </div>
          <div class="form-group mb-3">
            <label>Qty</label>
            <input v-model="qty" type="text" class="form-control">
          </div>
          <div class="form-group mb-3">
            <label>Percent (%)</label>
            <input v-model="percent_value" type="number" class="form-control">
          </div>
          <div class="form-group mb-3">
            <label>Start Time</label>
            <input v-model="startTime" type="date" class="form-control">
          </div>
          <div class="form-group mb-3">
            <label>End Time</label>
            <input v-model="endTime" type="date" class="form-control">
          </div>
          <button type="button" @click="createVoucher()" class="btn btn-primary waves-effect waves-light">Submit
          </button>
        </form>
      </div> <!-- end col -->
    </div>

  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "VoucherAdd",
  data() {
    return {
      code: this.makeid(6),
      title: "",
      percent_value: "",
      startTime: "",
      endTime: "",
      qty: 1,
      errors: [],
    }
  },
  computed: {

  },
  methods: {
    ...mapActions(['createVoucherAPI']),
    makeid(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
          charactersLength));
      }
      return result;
    },
    createVoucher() {
      this.errors = []
      if (!this.checkForm()) return false;

      this.createVoucherAPI({ qty: this.qty, code: this.code, title: this.title, percent_value: this.percent_value, start_time: new Date(this.startTime).getTime(), end_time: new Date(this.endTime).getTime() }).then(r => {
        if (r.data.success) {
          alert('Success !')
          this.$router.push('/voucher/list')
        } else {
          alert('Create Fail !')
        }
      }).catch(e => {
        console.log('e', e)
      })
    },
    checkForm() {
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
      if (!this.startTime) {
        this.errors.push('startTime is required !');
        flag = false;
      }
      if (!this.endTime) {
        this.errors.push('endTime is required !');
        flag = false;
      }
      return flag;
    },
  }
}
</script>

<style scoped>

</style>
