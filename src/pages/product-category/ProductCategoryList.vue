<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
            <router-link to="/product-category/add"  class="btn btn-blue waves-effect waves-light">Create</router-link>
          </div>
          <h4 class="page-title">Create Product Category</h4>
        </div>
      </div>
    </div>
    <!-- end page title -->

    <div class="row">
      <div class="col-12">
        <div class="card-box">

          <div class="table-responsive">
            <table class="table mb-0">
              <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div> <!-- end card-box -->
      </div> <!-- end col -->
    </div>

  </div>
</template>

<script>
export default {
  name: "ProductCategoryList"
}
</script>

<style scoped>

</style>
