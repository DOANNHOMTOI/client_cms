<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
            <router-link to="/product/list" class="btn btn-primary waves-effect waves-light">Back</router-link>
          </div>
          <h4 class="page-title">Edit Product</h4>
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
            <label>SKU</label>
            <input v-model="sku" type="text" class="form-control">
          </div>
          <div class="form-group mb-3 col-6">
            <label>Name</label>
            <input v-model="name" type="text" class="form-control">
          </div>
          <div class="form-group mb-3 col-6">
            <label>Category</label>
            <select v-model="category_id" class="form-control">
              <option v-for="(cate,index) in listProductCategory" :value="cate.id">{{ cate.name }}</option>
            </select>
          </div>
          <div class="form-group mb-3 col-6">
            <label>Quantity</label>
            <input v-model="qty" type="number" class="form-control">
          </div>

          <div class="form-group mb-3 col-6">
            <label>Price</label>
            <input v-model="price" type="number" class="form-control">
          </div>
          <div class="form-group mb-3 col-6">
            <label>Sale Price</label>
            <input v-model="price_sale" type="number" class="form-control">
          </div>
          <div class="form-group mb-3 col-6">
            <label>Excerpt</label>
            <input v-model="excerpt" type="text" class="form-control">
          </div>
          <div class="form-group mb-3 col-6">
            <label>Description</label>
            <input v-model="description" type="text" class="form-control">
          </div>
          <div class="form-group mb-3 col-12">
            <label>Avatar</label>
            <input
              class="form-control"
              id="file"
              type="file"
              @change="onFileChange( $event)"
            >
          </div>
          <div class="form-group mb-3 col-12">
            <img style="width:200px" :src="getAvatar()" alt="">
          </div>
          <div class="form-group mb-3">
            <label>Colors
              <button type="button" class="btn btn-primary ml-2" @click="addColor"><i class="mdi mdi-plus pr-1"></i> ADD</button>
            </label>
            <div class="row col-12">
              <input v-for="(color,i) in colors" v-model="color.value" :key="i" type="text" class="form-control col-2 p-2" placeholder="Color">
            </div>
          </div>
          <div class="form-group mb-3">
            <label>Sizes
              <button type="button" class="btn btn-primary ml-2" @click="addSize"><i class="mdi mdi-plus pr-1"></i> ADD</button>
            </label>
            <div class="row col-12">
              <input v-for="(size,i) in sizes" v-model="size.value" :key="i" type="number"
                     class="form-control col-2 p-2" placeholder="Size">
            </div>
          </div>
          <div class="form-group mb-3">
            <label>Images Gallery</label>
            <div class="col-12 row">
              <div class="form-group mb-3 col-4">
                <input
                  class="form-control"
                  type="file"
                  @change="onFileChange1( $event)"
                >
                <img v-if="gallery[0] !== undefined" style="width:200px" :src="getPathFile(gallery[0])" alt="">
              </div>
              <div class="form-group mb-3 col-4">
                <input
                  class="form-control"
                  type="file"
                  @change="onFileChange2( $event)"
                >
                <img v-if="gallery[1] !== undefined" style="width:200px" :src="getPathFile(gallery[1])" alt="">
              </div>
              <div class="form-group mb-3 col-4">
                <input
                  class="form-control"
                  type="file"
                  @change="onFileChange3( $event)"
                >
                <img v-if="gallery[2] !== undefined" style="width:200px" :src="getPathFile(gallery[2])" alt="">
              </div>
            </div>
          </div>
          <div class="form-group mb-3 col-12">
            <label>Content</label>
            <ckeditor v-model="body" :config="editorConfig"></ckeditor>
          </div>
          <button type="button" @click="updateProduct()" class="btn btn-primary waves-effect waves-light">Submit
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
  name: "ProductAdd",
  components: {
    Selectize
  },
  data() {
    return {
      errors: [],
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
    this.getProductDetail(this.$route.params.id).then(r => {
      console.log('getProductDetail', r)
      this.name = r.data.data.infor.name
      this.sku = r.data.data.infor.sku
      this.price = r.data.data.infor.price
      this.price_sale = r.data.data.infor.price_sale
      this.excerpt = r.data.data.infor.excerpt
      this.description = r.data.data.infor.description
      this.qty = r.data.data.infor.qty
      this.category_id = r.data.data.infor.category_id
      this.body = r.data.data.infor.body
      this.image = r.data.data.infor.image

      for (let i = 0; i < r.data.data.colors.length; i++) {
        this.colors.push({value: r.data.data.colors[i].color})
      }

      for (let i = 0; i < r.data.data.sizes.length; i++) {
        this.sizes.push({value: r.data.data.sizes[i].size})
      }

      for (let i = 0; i < r.data.data.images.length; i++) {
        this.gallery.push(r.data.data.images[i].image)
      }
      console.log(this.gallery)

    })
    this.getListProductCategory(-1).then(r => {
      this.listProductCategory = r.data.data.data
    }).catch(e => {
      console.log(e)
    })
  },
  methods: {
    ...mapActions(['updateProductAPI', 'getListProductCategory','getProductDetail']),
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
    updateProduct() {
      this.errors = []
      if (!this.checkForm()) return false;

      let arrSize = []
      this.sizes.map(item => {
        if (item.value !== ''){
          arrSize.push(item.value)
        }
      })

      let arrColor = []
      this.colors.map(item => {
        if (item.value !== ''){
          arrColor.push(item.value)
        }
      })
      let obj = {
        id: this.$route.params.id,
        name: this.name,
        qty: parseInt(this.qty),
        sku: this.sku,
        excerpt: this.excerpt,
        description: this.description,
        body: this.body,
        category_id: this.category_id,
        colors: arrColor.join(','),
        sizes: arrSize.join(','),
        is_active: 1,
        price: parseInt(this.price),
        price_sale: parseInt(this.price_sale),
        image_id: this.file,
        image_1: this.file1,
        image_2: this.file2,
        image_3: this.file3,
      }
      console.log('obj', obj)
      this.updateProductAPI(obj).then(r => {
        console.log('r updateProductAPI', r)
      }).catch(e => {
        console.log('e', e)
      })
    },
    checkForm(){
      let flag = true;
      if (!this.name) {
        this.errors.push('name is required !');
        flag = false;
      }
      if (!this.sku) {
        this.errors.push('sku is required !');
        flag = false;
      }
      if (!this.price) {
        this.errors.push('price is required !');
        flag = false;
      }
      // if (!this.file) {
      //   this.errors.push('image is required !');
      //   flag = false;
      // }
      if (this.sizes.length === 0) {
        this.errors.push('sizes is required !');
        flag = false;
      }
      if (this.colors.length === 0) {
        this.errors.push('colors is required !');
        flag = false;
      }
      if (!this.category_id) {
        this.errors.push('category is required !');
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
