<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>List Region</h1>
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
                      <th>Slug</th>
                      <th>Features</th>
                      <th>Sizes</th>
                      <th>Available</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="getterListRegionDO.length > 0">
                      <DigitalOceanItemRegion
                        v-for="(item,i) in getterListRegionDO"
                        :key="i"
                        :indexItem="i"
                        :region="item" />
                    </template>
                    <template v-else>
                     <tr>
                       <td>
                         <div class="spinner-border" role="status">
                           <span class="sr-only">Loading...</span>
                         </div>
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
        <div class="row" v-if="getterListRegionDO.length > 0">
          <div class="col-sm-12 col-md-5">
            <div class="dataTables_info" id="example2_info" role="status" aria-live="polite">Showing 1 to 10 of {{ getterTotalRegionDO}}
              entries
            </div>
          </div>
          <div class="col-sm-12 col-md-7">
            <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
              <ul class="pagination">
                <li class="paginate_button page-item previous" v-bind:class="{disabled : getterPageRegionDO.currentPage === 1}" id="example2_previous">
                  <a href="javascript:void(0)"
                           @click="changePage(getterPageRegionDO.currentPage - 1)"
                          aria-controls="example2"
                          data-dt-idx="0"
                          tabindex="0"
                          class="page-link">Previous</a>
                </li>
                <li v-for="page in calculatePage" class="paginate_button page-item" v-bind:class="{ active : getterPageRegionDO.currentPage === page}">
                  <a @click="changePage(page)" href="javascript:void(0)" aria-controls="example2"
                     data-dt-idx="1"
                      tabindex="0" class="page-link">{{ page }}
                  </a>
                </li>
                <li class="paginate_button page-item next" v-bind:class="{disabled : getterPageRegionDO.currentPage === calculatePage}" id="example2_next">
                  <a  @click="changePage(getterPageRegionDO.currentPage + 1)" href="javascript:void(0)" aria-controls="example2"
                     data-dt-idx="7" tabindex="0"
                     class="page-link">Next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import {mapActions,mapGetters,mapState} from "vuex/dist/vuex.esm.browser";
import DigitalOceanItemRegion from "./DigitalOceanItemRegion";
export default {
  name: "DigitalOceanListRegion",
  created() {
    this.getListRegionDO( {});
  },
  components:{
    DigitalOceanItemRegion
  },
  computed:{
    ...mapGetters(['getterListRegionDO','getterTotalRegionDO','getterPageRegionDO']),
    calculatePage(){
      return Math.ceil(this.getterTotalRegionDO / this.getterPageRegionDO.per_page)
    }
  },
  methods:{
    ...mapActions(['getListRegionDO','actionChangePage']),
    changePage(page){
      this.$router.push({ path: '', query: { page: page }})
      this.actionChangePage({per_page : 10 ,page})
    }
  }
}
</script>

<style scoped>

</style>
