<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-6">
        <div class="card-box">
          <h4 class="header-title">Table head options</h4>
          <p class="sub-header">
            Use one of two modifier classes to make <code>&lt;thead&gt;</code>s appear light or dark gray.
          </p>

          <div class="table-responsive">
            <table class="table mb-0">
              <thead class="thead-light">
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
          </div> <!-- end table-responsive-->

        </div> <!-- end card-box -->
      </div> <!-- end col -->

      <div class="col-lg-6">
        <div class="card-box">
          <h4 class="header-title">Striped rows</h4>
          <p class="sub-header">
            Use <code>.table-striped</code> to add zebra-striping to any table row
            within the <code>&lt;tbody&gt;</code>.
          </p>

          <div class="table-responsive">
            <table class="table table-striped mb-0">
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
          </div> <!-- end table-responsive-->

        </div> <!-- end card-box -->
      </div> <!-- end col -->
    </div>
  </div> <!-- container -->
</template>

<script>
export default {
  name: "Table"
}
</script>

<style scoped>

</style>
