<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
<!--            <router-link to="/voucher/add" class="btn btn-blue waves-effect waves-light">Create</router-link>-->
          </div>
          <h4 class="page-title">Rating</h4>
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
                <th>Product</th>
                <th>Guest</th>
                <th>Rate Star</th>
                <th>Comment</th>
                <th>Status</th>
                <th>Created At</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in list" :key="index">
                <th scope="row">{{ index + 1}}</th>
                <td>{{ item.product_name  }}</td>
                <td>{{ item.guest_name  }}</td>
                <td>{{ item.rate  }}</td>
                <td>{{ item.comment  }}</td>
                <td v-if="item.status">
                  <span style="padding: 7px" class="badge badge-success waves-effect waves-light">ĐÃ DUYỆT</span>
                </td>
                <td v-if="!item.status">
                  <span style="padding: 7px" class="badge badge-danger waves-effect waves-light">CHƯA DUYỆT</span>
                </td>
                <td>{{ convertMoment(item.created_at)  }}</td>
                <td>
                  <button @click="acceptRate(item.id)" v-if="getPermissionUser.includes('acceptRating') && !item.status" class="btn btn-primary waves-effect waves-light">DUYỆT ĐÁNH GIÁ</button>
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
import {mapActions, mapGetters} from "vuex";
import moment from "moment";
export default {
  name: "RatingList",
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
    this.getListRating(this.currPage).then(r=>{
      this.list = r.data.data.data
      this.currPage = r.data.data.current_page
      this.totalPage = r.data.data.last_page
    }).catch(e=>{
      console.log(e)
    })
  },
  methods: {
    ...mapActions(['getListRating','updateRating']),
    changePage(page){
      this.currPage = page;

      this.getListRating(this.currPage).then(r=>{
        this.list = r.data.data.data
      }).catch(e=>{
        console.log(e)
      })
    },
    acceptRate(id){
      if (!confirm('Duyệt đánh giá này !')){
        return false;
      }
      this.updateRating({id}).then(r => {
        if (r.data.success) {
          alert('Success !')
          window.location.reload();
        } else {
          alert('update Fail !')
        }
      }).catch(e => {
        console.log('e', e)
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
