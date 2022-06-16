<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Create SSH Key</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">General Form</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <!-- left column -->
          <div class="col-md-12">
            <div class="card card-primary">
              <form @submit.prevent="submitFormCreateSshKeyDO">
                <div class="card-body">
                  <div class="form-group">
                    <label>Name <span class="text-danger">*</span></label>
                    <input v-model="name" type="text" class="form-control" placeholder="Enter Name SSH Key"
                           :class="{ 'form-control--error': $v.name.$error}"
                    >
                    <div class="error-form-msg" v-if="$v.name.$error && !$v.name.required">Name is required</div>
                  </div>
                  <div class="form-group">
                    <label>Public Key <span class="text-danger">*</span></label>
                    <input v-model="public_key" type="text" class="form-control" placeholder="Enter Public Key"
                           :class="{ 'form-control--error': $v.name.$error}"
                    >
                    <div class="error-form-msg" v-if="$v.public_key.$error && !$v.public_key.required">Public key is required</div>
                  </div>
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
import {mapActions} from 'vuex/dist/vuex.esm.browser'
import {validationMixin} from "vuelidate"
const {required} = require("vuelidate/lib/validators")
export default {
  name: "DigitalOceanCreateSshKey",
  data(){
    return{
      name:'',
      public_key:''
    }
  },
  mixins: [validationMixin],
  validations: {
    name: {
      required,
    },
    public_key: {
      required,
    },
  },
  methods:{
    ...mapActions(['handleCreateSshKeyDO']),
    submitFormCreateSshKeyDO(){
      this.$v.$touch();
      if (this.$v.$invalid) { // False
        this.$notify({title: 'Error', type: 'error', text: 'Please input some field !'});
      } else {
        let dataForm = {
          name: this.name,
          public_key: this.public_key,
        }
        console.log('dataForm', dataForm)
        this.handleCreateSshKeyDO(dataForm);
      }
    }
  }
}
</script>

<style scoped>
.form-control--error {
  border: 1px solid red;
}

div.error-form-msg {
  color: red
}
</style>
