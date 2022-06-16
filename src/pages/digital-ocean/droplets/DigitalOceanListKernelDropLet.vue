<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>List Kernels by Droplet</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">DataTables</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>
<!--    Form Search-->
    <section class="form-search">
      <form @submit.prevent="handleSearchKernel" class="d-flex">
        <div class="card-body">
          <div class="form-group">
            <label>Droplet</label>
            <select v-model="droplet_id" class="form-control col-2">
              <option v-for="item in getterListDropLetDO" :value="item.id">{{ item.name}}</option>
            </select>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Search</button>
          </div>
        </div>
      </form>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <table id="example2" class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Version</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="getterListKernelSearch.length > 0">
                      <tr v-for="(item,index) in getterListKernelSearch">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.name}}</td>
                        <td>{{ item.version}}</td>
                      </tr>
                    </template>
                    <template v-else>
                     <tr>
                       <td>
                          <h6>Data Empty !</h6>
                       </td>
                     </tr>
                    </template>

                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex/dist/vuex.esm.browser";
export default {
  name: "DigitalOceanListKernelDropLet",
  data(){
    return {
      droplet_id : '',
    }
  },
  created() {
    this.getListDropLetDO( {typeGet : 'all'});
  },
  components:{

  },
  computed:{
    ...mapGetters(['getterListDropLetDO','getterListKernelSearch']),
  },
  methods:{
    ...mapActions(['getListDropLetDO','getListKernelByDroplet']),
    handleSearchKernel() {
      this.getListKernelByDroplet(this.droplet_id);
    },
  }
}
</script>

<style scoped>

</style>
