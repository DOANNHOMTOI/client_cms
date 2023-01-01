<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
            <router-link to="/user/add" class="btn btn-blue waves-effect waves-light">Create</router-link>
          </div>
          <h4 class="page-title"> Partner</h4>
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
                <th>Email</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in list">
                <th scope="row">{{ index + 1}}</th>
                <td>{{ item.email  }}</td>
                <td>{{ convertMoment(item.created_at) }}</td>
                <td>{{ convertMoment(item.updated_at) }}</td>
                <td>
                  <button @click="del(item.id)" class="btn btn-danger waves-effect waves-light">DELETE</button>
                  <router-link :to="'/user-permission/' + item.id" class="btn btn-warning waves-effect waves-light">Permissions</router-link>
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
  name: "UserList",
  data(){
    return {
      list:[],
      currPage : 1,
      totalPage: 1
    }
  },
  created() {
    this.getListPartner(this.currPage).then(r=>{
      this.list = r.data.data.data
      this.currPage = r.data.data.current_page
      this.totalPage = r.data.data.last_page
    }).catch(e=>{
      console.log(e)
    })
  },
  methods: {
    ...mapActions(['getListPartner','deletePartner']),
    changePage(page){
      this.currPage = page;
      this.getListPartner(this.currPage).then(r=>{
        this.list = r.data.data.data
      }).catch(e=>{
        console.log(e)
      })
    },
    del(id){
      if (!confirm('Are you sure !')){
        return false
      }
      this.deletePartner({
        id: id,
      }).then(r => {
        alert('Success !')
        window.location.reload();
      }).catch(e => {
        console.log('e', e)
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
