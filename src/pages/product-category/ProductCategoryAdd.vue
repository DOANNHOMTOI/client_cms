<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
            <router-link to="/"  class="btn btn-blue waves-effect waves-light">Create</router-link>
          </div>
          <h4 class="page-title">Create Product Category</h4>
        </div>
      </div>
    </div>
    <!-- end page title -->

    <div class="row">
      <div class="col-lg-12">
        <form>
          <div class="form-group mb-3">
            <label for="name">Name</label>
            <input type="text" id="name" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary waves-effect waves-light">Submit</button>
        </form>
      </div> <!-- end col -->
    </div>

  </div>
</template>

<script>
export default {
  name: "ProductCategoryAdd"
}
</script>

<style scoped>

</style>
