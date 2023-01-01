<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
<!--            <router-link to="/voucher/add" class="btn btn-blue waves-effect waves-light">Create</router-link>-->
          </div>
          <h4 class="page-title">Guest</h4>
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
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Status</th>
                <th>Created At</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in list">
                <th scope="row">{{ index + 1}}</th>
                <td>{{ item.name  }}</td>
                <td>{{ item.phone  }}</td>
                <td>{{ item.email  }}</td>
                <td>{{ item.address  }}</td>
                <td v-if="item.status">
                  <button class="btn btn-success waves-effect waves-light">TRUE</button>
                </td>
                <td v-if="!item.status">
                  <button class="btn btn-danger waves-effect waves-light">FALSE</button>
                </td>
                <td>{{ convertMoment(item.created_at)  }}</td>
                <td>
<!--                  <router-link :to="'/voucher/' + item.id" class="btn btn-warning waves-effect waves-light">Edit</router-link>-->
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
import {mapActions} from "vuex";
import moment from "moment";
export default {
  name: "GuestList",
  data(){
    return {
      list:[],
      currPage : 1,
      totalPage: 1
    }
  },
  created() {
    this.getListGuest(this.currPage).then(r=>{
      this.list = r.data.data.data
      this.currPage = r.data.data.current_page
      this.totalPage = r.data.data.last_page
    }).catch(e=>{
      console.log(e)
    })
  },
  methods: {
    ...mapActions(['getListGuest']),
    changePage(page){
      this.currPage = page;

      this.getListGuest(this.currPage).then(r=>{
        this.list = r.data.data.data
      }).catch(e=>{
        console.log(e)
      })
    },
    timeBW(timestamp){
      var date = new Date(parseInt(timestamp));
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
