<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
            <router-link to="/user" class="btn btn-primary waves-effect waves-light">Back</router-link>
          </div>
          <h4 class="page-title">Permission by Partner</h4>
        </div>
      </div>
    </div>
    <!-- end page title -->

    <div class="row">
      <div class="col-lg-12">
        <div class="card" style="background-color: white;border: 1px solid lightgrey">
          <div class="card-body">
            <div class="row">

              <div class="col-12 row">
                <div class="mt-3 row">
                  <div style="padding: 20px;text-align: center" v-for="(item,i) in list" :key="i" class="col-3 custom-control custom-checkbox">
                    <input v-model="permissionsSelected" :value="item.id" type="checkbox" class="custom-control-input" :id="'customCheck'+ i">
                    <label class="custom-control-label" :for="'customCheck'+ i">{{ item.name }}</label>
                  </div>
                </div>
              </div> <!-- end col -->
            </div> <!-- end row -->
            <div class="row">
              <button class="btn btn-primary mx-auto mt-5" @click="updatePer()">Update</button>
            </div>

          </div> <!-- end card-body-->
        </div>
      </div> <!-- end col -->
    </div>

  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Permissions",
  data() {
    return {
      list:[],
      permissionsSelected: []
    }
  },
  created() {
    this.getListPermission(-1).then(r=>{
      console.log('res getListPermission', r)
      this.list = r.data.data.data
    }).catch(e=>{
      console.log(e)
    })
    this.getListPermissionByUser(this.$route.params.id).then(r=>{
      console.log('res getListPermissionByUser', r)
      this.permissionsSelected = r.data.data.id
    }).catch(e=>{
      console.log(e)
    })
  },
  methods: {
    ...mapActions(['updatePermissionUser','getListPermission','getListPermissionByUser']),
    updatePer() {
      this.updatePermissionUser({user: this.$route.params.id,permissions: this.permissionsSelected.join(',')}).then(r => {
        if (r.data.success){
          alert('Success !')
          this.$router.push('/user')
        }else{
          alert('Update Fail !')
        }
      }).catch(e => {
        console.log('e', e)
      })
    }
  }
}
</script>

<style scoped>
.custom-control-label::before {
  background-color: white;
}
</style>
