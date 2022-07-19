<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
            <router-link to="/banner/list" class="btn btn-primary waves-effect waves-light">Back</router-link>
          </div>
          <h4 class="page-title">Create Banner</h4>
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

          <div class="form-group mb-3 col-12 ">
            <label>Title</label>
            <input v-model="title" type="text" class="form-control">
          </div>
          <div class="form-group mb-3 col-12">
            <label>Image</label>
            <input
              class="form-control"
              id="file"
              type="file"
              @change="onFileChange( $event)"
            >
          </div>
          <button type="button" @click="createBanner()" class="btn btn-primary waves-effect waves-light">Submit
          </button>
        </form>
      </div> <!-- end col -->
    </div>

  </div>
</template>

<script>
import {mapActions} from "vuex";
import Selectize from 'vue2-selectize'

export default {
  name: "BannerAdd",
  components: {
    Selectize
  },
  data() {
    return {
      errors: [],
      title: "",
      name: "",
      qty: 0,
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
    this.getListProductCategory(-1).then(r => {
      this.listProductCategory = r.data.data.data
    }).catch(e => {
      console.log(e)
    })
  },
  methods: {
    ...mapActions(['createBannerAPI', 'getListProductCategory']),
    onFileChange(event) {
      this.file = event.target.files[0]
    },
    createBanner() {
      this.errors = []
      if (!this.checkForm()) return false;

      let obj = {
        title: this.title,
        image_id: this.file,
      }
      this.createBannerAPI(obj).then(r => {
        console.log('r createBannerAPI', r)
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
      if (!this.file) {
        this.errors.push('image is required !');
        flag = false;
      }
      return flag;
    },
    addSize() {
      this.sizes.push({value: ''});
    },
    addColor() {
      this.colors.push({value: ''});
    }
  }
}
</script>

<style scoped>

</style>
