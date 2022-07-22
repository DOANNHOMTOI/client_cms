<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
          </div>
          <h4 class="page-title"> Orders</h4>
        </div>
      </div>
    </div>
    <!-- end page title -->
    <div class="row">
      <div data-v-482562f6="" class="form-group mb-3 col-2 ">
        <input v-model="sku" data-v-482562f6="" type="text" placeholder="Mã đơn hàng" class="form-control">
      </div>
      <div data-v-482562f6="" class="form-group mb-3 col-3">
        <input v-model="phone" style="" data-v-482562f6="" type="text" placeholder="Số điện thoại" class="form-control">
      </div>
      <div data-v-482562f6="" class="form-group mb-3 col-2">
        <button @click="searchOrder()" class="btn btn-blue waves-effect waves-light">Search</button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card-box">

          <div class="table-responsive">
            <table class="table mb-0">
              <thead>
              <tr>
                <th>#</th>
                <th>SKU</th>
                <th>Total Price</th>

                <th>Status</th>
                <th>Date Order</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in list">
                <th scope="row">{{ index + 1}}</th>
                <td>{{ item.sku  }}</td>
                <td>{{ convertCurrency(item.total_price)  }}</td>
                <td v-if="item.status == 1">
                  <button class="btn btn-primary waves-effect waves-light">NEW</button>
                </td>
                <td v-if="item.status == 2">
                  <button class="btn btn-info waves-effect waves-light">PROCESSING</button>
                </td>

                <td v-if="item.status == 3">
                  <button class="btn btn-success waves-effect waves-light">SUCCESS</button>
                </td>
                <td v-if="item.status == 4">
                  <button class="btn btn-danger waves-effect waves-light">CANCEL</button>
                </td>
                <td>{{ convertMoment(item.created_at) }}</td>
                <td>
                  <router-link v-if="getPermissionUser.includes('showVoucher')"  :to="'/order/' + item.id" class="btn btn-warning waves-effect waves-light">VIEW</router-link>
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
  name: "OrderList",
  data(){
    return {
      list:[],
      currPage : 1,
      totalPage: 1,
      sku:"",
      phone: ""
    }
  },
  computed:{
    ...mapGetters(['getPermissionUser']),
  },
  created() {
    this.getListOrder({currPage: this.currPage}).then(r=>{
      console.log('res getListOrder', r)
      this.list = r.data.data.data
      this.currPage = r.data.data.current_page
      this.totalPage = r.data.data.last_page
    }).catch(e=>{
      console.log(e)
    })
  },
  methods: {
    ...mapActions(['getListOrder']),
    convertCurrency(x){
      return x.toLocaleString('vi-VN') + ' đ'
    },
    searchOrder() {
      this.getListOrder({currPage: this.currPage, sku: this.sku, phone: this.phone}).then(r => {
        console.log('res getListOrder filter', r)
        this.list = r.data.data.data
        this.currPage = r.data.data.current_page
        this.totalPage = r.data.data.last_page
      }).catch(e => {
        console.log(e)
      })
    },
    changePage(page){
      this.currPage = page;

      this.getListOrder({currPage: this.currPage}).then(r=>{
        this.list = r.data.data.data
      }).catch(e=>{
        console.log(e)
      })
    },
    convertMoment(date){
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
  },
}
</script>

<style scoped>

</style>
