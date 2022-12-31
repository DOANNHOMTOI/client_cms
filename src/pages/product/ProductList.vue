<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div v-if="getPermissionUser.includes('createProduct')" class="page-title-right">
            <router-link to="/product/add" class="btn btn-blue waves-effect waves-light">Create</router-link>
          </div>
          <h4 class="page-title">Product</h4>
        </div>
      </div>
    </div>
    <!-- end page title -->
    <div class="row">
      <div data-v-482562f6="" class="form-group mb-3 col-2 ">
        <input v-model="sku" data-v-482562f6="" type="text" placeholder="Mã sản phẩm" class="form-control">
      </div>
      <div data-v-482562f6="" class="form-group mb-3 col-3">
        <input v-model="name" style="" data-v-482562f6="" type="text" placeholder="Tên sản phẩm" class="form-control">
      </div>
      <div data-v-482562f6="" class="form-group mb-3 col-2">
        <button @click="searchProduct()" class="btn btn-blue waves-effect waves-light">Search</button>
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
                <th>Name</th>
                <th>Category</th>
                <th>Price/Sale Price</th>
                <th>Active</th>
                <th>Created At</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in list">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ item.sku }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.category.name }}</td>
                <td>
                  - Price : <b>{{ convertCurrency(parseInt(item.price)) }}</b> đ <br>
                  - Sale Price : <b>{{ convertCurrency(parseInt(item.price_sale)) }}</b> đ <br>
                </td>
                <td v-if="item.is_active">
                  <button class="btn btn-success waves-effect waves-light">TRUE</button>
                </td>
                <td v-if="!item.is_active">
                  <button class="btn btn-danger waves-effect waves-light">FALSE</button>
                </td>
                <td>{{ convertMoment(item.created_at) }}</td>
                <td>
<!--                  <button class="btn btn-danger waves-effect waves-light">Delete</button>-->
                  <router-link v-if="getPermissionUser.includes('editProduct')" :to="'/product/' + item.id" class="btn btn-warning waves-effect waves-light">
                    Edit
                  </router-link>
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
            <li v-for="(page,i) in totalPage" :key="i" class="paginate_button page-item"
                :class="{active : currPage === i + 1}">
              <a @click="changePage(page)" href="#"
                 aria-controls="datatable-buttons"
                 data-dt-idx="1"
                 tabindex="0"
                 class="page-link">
                {{ i + 1 }}
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
  name: "ProductList",
  data() {
    return {
      list: [],
      sku: "",
      name: "",
      currPage: 1,
      totalPage: 1
    }
  },
  computed:{
    ...mapGetters(['getPermissionUser']),
  },
  created() {
    this.getListProduct({currPage:this.currPage}).then(r => {
      this.list = r.data.data.data
      this.currPage = r.data.data.current_page
      this.totalPage = r.data.data.last_page
    }).catch(e => {
      console.log(e)
    })
  },
  methods: {
    ...mapActions(['getListProduct']),
    searchProduct(){
      this.getListProduct({currPage:this.currPage,sku: this.sku,name: this.name}).then(r => {
        this.list = r.data.data.data
        this.currPage = r.data.data.current_page
        this.totalPage = r.data.data.last_page
      }).catch(e => {
        console.log(e)
      })
    },
    changePage(page) {
      this.currPage = page;
      this.getListProduct({currPage: this.currPage}).then(r => {
        this.list = r.data.data.data
      }).catch(e => {
        console.log(e)
      })
    },
    convertMoment(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    convertCurrency(x) {
      return x.toLocaleString('vi-VN')
    },
  },
}
</script>

<style scoped>

</style>
