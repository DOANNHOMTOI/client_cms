<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
            <router-link to="/product-category/list" class="btn btn-primary waves-effect waves-light">Back</router-link>
          </div>
          <h4 class="page-title">Edit Partner</h4>
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
          <div class="form-group mb-3">
            <label for="name">Position</label>
            <input v-model="position" type="number" class="form-control">
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
  name: "UserEdit",
  data() {
    return {
      name: "",
      position: 0,
      is_active: 0
    }
  },
  created() {
    this.getProductCategory(this.$route.params.id).then(r => {
      this.name = r.data.data.name
      this.position = r.data.data.position
      this.is_active = r.data.data.is_active
    })
  },
  methods: {
    ...mapActions(['getProductCategory', 'updateProductCategory']),
    editCategory() {
      this.updateProductCategory({
        id: parseInt(this.$route.params.id),
        name: this.name,
        position: this.position,
        is_active: parseInt(this.is_active)
      }).then(r => {
        if (r.data.success) {
          alert('Success !')
          this.$router.push('/product-category/list')
        } else {
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
