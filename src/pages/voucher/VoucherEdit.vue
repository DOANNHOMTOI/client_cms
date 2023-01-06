<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
            <router-link to="/product-category/list" class="btn btn-primary waves-effect waves-light">Back</router-link>
          </div>
          <h4 class="page-title">Edit Voucher</h4>
        </div>
      </div>
    </div>
    <!-- end page title -->

    <div class="row">
      <div class="col-lg-12">
        <form>
          <div v-if="errors.length">
            <div class="alert alert-danger">
              <p v-for="(error,index) in errors" :key="index">- {{ error }}</p> <br>
            </div>
          </div>
          <div class="form-group mb-3">
            <label for="code">Code</label>
            <input disabled readonly v-model="code" type="text" id="code" class="form-control" min="6" max="6">
          </div>
          <div class="form-group mb-3">
            <label>Title</label>
            <input v-model="title" type="text" class="form-control">
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
          <div class="form-group mb-3">
            <label>qty</label>
            <input v-model="qty" type="number" class="form-control">
          </div>
          <div class="form-group mb-3">
            <label>Active</label>
            <select v-model="is_active" class="form-control" id="example-select">
              <option value="1">True</option>
              <option value="0">False</option>
            </select>
          </div>
          <button type="button" @click="editCategory()" class="btn btn-primary waves-effect waves-light">Submit
          </button>
        </form>
      </div> <!-- end col -->
    </div>

  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "VoucherEdit",
  data() {
    return {
      code: "",
      title: "",
      percent_value: "",
      errors: [],
      startTime: "",
      endTime: "",
      is_active: 0,
      qty: 1
    }
  },
  created() {
    this.getVoucherDetail(this.$route.params.id).then(r => {
      this.code = r.data.data.code
      this.title = r.data.data.title
      this.percent_value = r.data.data.percent_value
      this.startTime = this.timeBW(r.data.data.start_time)
      this.endTime = this.timeBW(r.data.data.end_time)
      this.is_active = r.data.data.is_active
      this.qty = r.data.data.qty
    })
  },
  methods: {
    ...mapActions(['getVoucherDetail', 'updateVoucher']),
    timeBW(timestamp) {
      var date = new Date(parseInt(timestamp));
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      // return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      return year + "-" + month + "-" + day
    },
    editCategory() {
      this.updateVoucher({
        id: parseInt(this.$route.params.id),
        title: this.title,
        percent_value: this.percent_value,
        is_active: parseInt(this.is_active),
        start_time: new Date(this.startTime).getTime(),
        end_time: new Date(this.endTime).getTime(),
        qty:this.qty
      }).then(r => {
        if (r.data.success) {
          alert('Success !')
          this.$router.push('/voucher/list')
        } else {
          alert('update Fail !')
        }
      }).catch(e => {
        console.log('e', e)
      })
    }
  }
}
</script>

<style scoped>
.form-control:disabled,
.form-control[readonly] {
  background-color: lightgrey;
}
</style>
