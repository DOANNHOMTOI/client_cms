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
              <p v-for="error in errors">- {{ error }}</p> <br>
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
import {mapActions} from "vuex";

export default {
  name: "VoucherEdit",
  data() {
    return {
      code: "",
      title: "",
      percent_value: "",
      errors: [],
      is_active: 0
    }
  },
  created() {
    this.getVoucherDetail(this.$route.params.id).then(r => {
      console.log('getVoucherDetail', r)
      this.code = r.data.data.code
      this.title = r.data.data.title
      this.percent_value = r.data.data.percent_value
      this.is_active = r.data.data.is_active
    })
  },
  methods: {
    ...mapActions(['getVoucherDetail', 'updateVoucher']),
    editCategory() {
      this.updateVoucher({
        id: parseInt(this.$route.params.id),
        title: this.title,
        percent_value: this.percent_value,
        is_active: parseInt(this.is_active)
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
.form-control:disabled, .form-control[readonly]{
  background-color: lightgrey;
}
</style>
