<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div v-if="getPermissionUser.includes('createVoucher')" class="page-title-right">
            <router-link to="/voucher/add" class="btn btn-blue waves-effect waves-light">Create</router-link>
          </div>
          <h4 class="page-title">Voucher</h4>
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
                <th>Code</th>
                <th>Title</th>
                <th>Percent (%)</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Active</th>
                <th>Created At</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in list">
                <th scope="row">{{ index + 1}}</th>
                <td>{{ item.code  }}</td>
                <td>{{ item.title  }}</td>
                <td>{{ item.percent_value  }}</td>
                <td v-if="item.is_active">
                  <button class="btn btn-success waves-effect waves-light">TRUE</button>
                </td>
                <td v-if="!item.is_active">
                  <button class="btn btn-danger waves-effect waves-light">FALSE</button>
                </td>
                <td>{{ timeBW(item.start_time)  }}</td>
                <td>{{ timeBW(item.end_time)  }}</td>
                <td>{{ convertMoment(item.created_at) }}</td>
                <td>
                  <router-link v-if="getPermissionUser.includes('editVoucher')" :to="'/voucher/' + item.id" class="btn btn-warning waves-effect waves-light">Edit</router-link>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div> <!-- end card-box -->
      </div> <!-- end col -->
      <div class="col-12 m-auto text-center d-flex justify-content-center">
        <div class="dataTables_paginate paging_simple_numbers" id="datatable-buttons_paginate">
          <ul class="pagination pagination-rounded">
            <li v-for="(page,i) in totalPage" :key="i" class="paginate_button page-item" :class="{active : currPage === i + 1}">
              <a @click="changePage(page)" href="#"
                 aria-controls="datatable-buttons"
                 data-dt-idx="1"
                 tabindex="0"
                 class="page-link">
                {{ i + 1}}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import moment from "moment";
export default {
  name: "VoucherList",
  data(){
    return {
      list:[],
      currPage : 1,
      totalPage: 1
    }
  },
  computed:{
    ...mapGetters(['getPermissionUser']),
  },
  created() {
    this.getListVoucher(this.currPage).then(r=>{
      console.log('res getProductCategory', r)
      this.list = r.data.data.data
      this.currPage = r.data.data.current_page
      this.totalPage = r.data.data.last_page
    }).catch(e=>{
      console.log(e)
    })
  },
  methods: {
    ...mapActions(['getListVoucher']),
    changePage(page){
      this.currPage = page;

      this.getListVoucher(this.currPage).then(r=>{
        this.list = r.data.data.data
      }).catch(e=>{
        console.log(e)
      })
    },
    timeBW(timestamp){
      console.log('item.start_time', timestamp)
      var date = new Date(parseInt(timestamp));

      console.log('DATE,', date)
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      // return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
      if(month < 10) month = '0' + month
      if(day < 10) day = '0' + day
      return year + "-" + month + "-" + day
    },
    convertMoment(date){
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
  },
}
</script>

<style scoped>

</style>
