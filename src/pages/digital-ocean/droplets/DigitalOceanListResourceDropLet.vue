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
                  <thead v-if="getterListResourceSearch !== null">
                  <tr>
                    <th>Attributes</th>
                    <th>Name</th>
                  </tr>
                    <tr>
                      <th>Floating_ips</th>
                      <td>{{ this.execFloatingIps() }}</td>
                    </tr>
                    <tr>
                      <th>Snapshots</th>
                      <td>{{ this.execSnapShots() }}</td>
                    </tr>
                    <tr>
                      <th>Volumes</th>
                      <td>{{ this.execVolumes() }}</td>
                    </tr>
                    <tr>
                      <th>Volume_snapshots</th>
                      <td>{{ this.execVolumeSnapshots() }}</td>
                    </tr>
                  </thead>
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
  name: "DigitalOceanListResourceDropLet",
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
    ...mapGetters(['getterListDropLetDO','getterListResourceSearch']),
  },
  methods:{
    ...mapActions(['getListDropLetDO','getListResourceByDroplet']),
    handleSearchKernel() {
      this.getListResourceByDroplet(this.droplet_id);
    },
    execFloatingIps(){
      if (this.getterListResourceSearch.floating_ips == null){
        return [];
      }
      return this.getterListResourceSearch.floating_ips.map(item=>{
        return item.name;
      })
    },
    execSnapShots(){
      if (this.getterListResourceSearch.snapshots == null){
        return [];
      }
      return this.getterListResourceSearch.snapshots.map(item=>{
        return item.name;
      })
    },
    execVolumes(){
      if (this.getterListResourceSearch.volumes == null){
        return [];
      }
      return this.getterListResourceSearch.volumes.map(item=>{
        return item.name;
      })
    },
    execVolumeSnapshots(){
      if (this.getterListResourceSearch.volume_snapshots == null){
        return [];
      }
      return this.getterListResourceSearch.volume_snapshots.map(item=>{
        return item.name;
      })
    }
  }
}
</script>

<style scoped>

</style>
