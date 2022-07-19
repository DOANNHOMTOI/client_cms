<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
            <router-link to="/banner" class="btn btn-primary waves-effect waves-light">Back</router-link>
          </div>
          <h4 class="page-title">Edit Banner</h4>
        </div>
      </div>
    </div>
    <!-- end page title -->

    <div class="row">
      <div class="col-lg-12">
        <form class="row col-12">
          <div v-if="errors.length">
            <div class="alert alert-danger">
              <p v-for="error in errors">- {{ error }}</p> <br>
            </div>
          </div>

          <div class="form-group mb-3 col-6 ">
            <label>Title</label>
            <input v-model="title" type="text" class="form-control">
          </div>
<!--          <div class="form-group mb-3 col-12">-->
<!--            <label>Avatar</label>-->
<!--            <input-->
<!--              class="form-control"-->
<!--              id="file"-->
<!--              type="file"-->
<!--              @change="onFileChange( $event)"-->
<!--            >-->
<!--          </div>-->
          <div class="form-group mb-3 col-12">
            <img style="width:200px" :src="getAvatar()" alt="">
          </div>
          <div class="form-group mb-3">
            <label>Active</label>
            <select v-model="is_active" class="form-control" id="example-select">
              <option value="1">True</option>
              <option value="0">False</option>
            </select>
          </div>
          <button type="button" @click="updateBanner()" class="btn btn-primary waves-effect waves-light">Submit
          </button>
        </form>
      </div> <!-- end col -->
    </div>

  </div>
</template>

<script>
import {mapActions} from "vuex";
import Selectize from 'vue2-selectize'
import {config} from "../../constants/config";

export default {
  name: "BannerEdit",
  components: {
    Selectize
  },
  data() {
    return {
      errors: [],
      name: "",
      qty: 0,
      title: '',
      sku: "",
      price: 0,
      price_sale: 0,
      excerpt: "",
      description: "",
      body: "",
      image: "",
      category_id: 0,
      images: "",
      sizes: [],
      colors: [],
      gallery: [],
      is_active: 1,
      listProductCategory: [],
      file: '',
      file1: '',
      file2: '',
      file3: '',
      editorConfig: {
        // The configuration of the editor.
      }
    }
  },
  created() {
    this.getBannerDetail(this.$route.params.id).then(r => {
      console.log('getBannerDetail', r)
      this.title = r.data.data.title
      this.image = r.data.data.image
      this.is_active = r.data.data.is_active
    })
  },
  methods: {
    ...mapActions(['updateBannerAPI', 'getListProductCategory','getBannerDetail']),
    onFileChange(event) {
      this.file = event.target.files[0]
    },
    onFileChange1(event) {
      this.file1 = event.target.files[0]
    },
    onFileChange2(event) {
      this.file2 = event.target.files[0]
    },
    onFileChange3(event) {
      this.file3 = event.target.files[0]
    },
    updateBanner() {
      this.errors = []
      if (!this.checkForm()) return false;

      let obj = {
        id: this.$route.params.id,
        title: this.title,
        image: this.image,
        is_active: parseInt(this.is_active),
        image_id: this.file,
      }
      console.log('obj updateBannerAPI', obj)
      this.updateBannerAPI(obj).then(r => {
        console.log('r updateBannerAPI', r)
      }).catch(e => {
        console.log('e', e)
      })
    },
    checkForm(){
      let flag = true;
      if (!this.title) {
        this.errors.push('title is required !');
        flag = false;
      }

      return flag;
    },
    addSize() {
      this.sizes.push({value: ''});
    },
    addColor() {
      this.colors.push({value: ''});
    },
    getAvatar(){
      return this.getPathFile(this.image)
    },
    getPathFile(path){
      return config.url_api_back_end_real + path
    }
  }
}
</script>

<style scoped>

</style>
