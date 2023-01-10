<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right" v-if="getPermissionUser.includes('createCategory')">
            <router-link to="/product-category/add" class="btn btn-blue waves-effect waves-light">Create</router-link>
          </div>
          <h4 class="page-title"> Category</h4>
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
                  <th>Position</th>
                  <th>Active</th>
                  <th>Created At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in list">
                  <th scope="row">{{ index + 1}}</th>
                  <td>{{ item.name }}</td>
                  <td>{{ item.position }}</td>
                  <td v-if="item.is_active">
                    <button class="btn btn-success waves-effect waves-light">TRUE</button>
                  </td>
                  <td v-if="!item.is_active">
                    <button class="btn btn-danger waves-effect waves-light">FALSE</button>
                  </td>
                  <td>{{ convertMoment(item.created_at) }}</td>
                  <td>
                    <router-link v-if="getPermissionUser.includes('editCategory')" :to="'/product-category/' + item.id"
                      class="btn btn-warning waves-effect waves-light">Sửa</router-link>
                    <button @click="deleteCategory(item.id)"
                      class="btn btn-danger waves-effect waves-light">Xoá</button>
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
            <li v-for="(page, i) in totalPage" :key="i" class="paginate_button page-item"
              :class="{ active: currPage === i + 1 }">
              <a @click="changePage(page)" href="#" aria-controls="datatable-buttons" data-dt-idx="1" tabindex="0"
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
import { mapActions, mapGetters } from "vuex";
import { axiosInstance } from "../../helpers/axiosInstance";

import moment from "moment";
export default {
  name: "ProductCategoryList",
  data() {
    return {
      list: [],
      currPage: 1,
      totalPage: 1
    }
  },
  created() {
    this.getListProductCategory(this.currPage).then(r => {
      this.list = r.data.data.data
      this.currPage = r.data.data.current_page
      this.totalPage = r.data.data.last_page
    }).catch(e => {
      console.log(e)
    })
  },
  computed: {
    ...mapGetters(['getPermissionUser']),
  },
  methods: {
    ...mapActions(['getListProductCategory']),
    changePage(page) {
      this.currPage = page;

      this.getListProductCategory(this.currPage).then(r => {
        this.list = r.data.data.data
      }).catch(e => {
        console.log(e)
      })
    },
    convertMoment(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    async deleteCategory(id) {
      this.$store.commit("SHOW_LOADING", true)
      return await axiosInstance.delete(`/api/product-category/` + id).then(r => {
        this.getListProductCategory(this.currPage).then(r => {
          this.list = r.data.data.data
          this.currPage = r.data.data.current_page
          this.totalPage = r.data.data.last_page
        }).catch(e => {
          console.log(e)
        }),
          this.$store.commit("SHOW_LOADING", false)
      })
        .catch(e => {
          console.log(e)
        })

    }
  },
}
</script>

<style scoped>

</style>
