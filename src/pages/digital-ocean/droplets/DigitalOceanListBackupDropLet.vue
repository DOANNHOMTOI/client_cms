<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>List Backups by Droplet</h1>
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
      <form @submit.prevent="handleSearchDroplet" class="d-flex">
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
                      <th>Distribution</th>
                      <th>Public</th>
                      <th>Min_disk_size</th>
                      <th>Size_gigabytes</th>
                      <th>Type</th>
                      <th>Created_at</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="getterListBackupSearch.length > 0">
                      <tr v-for="(item,index) in getterListBackupSearch">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.name}}</td>
                        <td>{{ item.distribution}}</td>
                        <td>{{ item.public}}</td>
                        <td>{{ item.min_disk_size}}</td>
                        <td>{{ item.size_gigabytes}}</td>
                        <td>{{ item.type}}</td>
                        <td>{{ item.created_at}}</td>
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
import DigitalOceanItemDropLet from "./DigitalOceanItemDropLet";
export default {
  name: "DigitalOceanSearchDropLet",
  data(){
    return {
      droplet_id : '',
    }
  },
  created() {
    this.getListDropLetDO( {typeGet : 'all'});
  },
  components:{
    DigitalOceanItemDropLet,
  },
  computed:{
    ...mapGetters(['getterListDropLetDO','getterPageDropLetDO','getterListBackupSearch']),
  },
  methods:{
    ...mapActions(['getListDropLetDO','getListBackUpByDroplet']),
    handleSearchDroplet() {
      this.getListBackUpByDroplet(this.droplet_id);
    },
  }
}
</script>

<style scoped>

</style>
