<template>
  <div class="content-wrapper" style="min-height: 1345.31px;">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Create Droplet</h1>
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

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <!-- left column -->
          <div class="col-md-6">
            <!-- general form elements -->
            <div class="card card-primary">
              <!--              <div class="card-header">-->
              <!--                <h3 class="card-title">Quick Example</h3>-->
              <!--              </div>-->
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="submitFormCreateDropletDO">
                <div class="card-body">

                  <div class="form-group">
                    <label>Name <span class="text-danger">*</span></label>
                    <input v-model="$v.name.$model" type="text" class="form-control"
                           :class="{ 'form-control--error': $v.name.$error}"
                           placeholder="">
                    <div class="error-form-msg" v-if="$v.name.$error && !$v.name.required">Name is required</div>
                    <div class="error-form-msg" v-if="$v.name.$error && !$v.name.minLength">Name must have at least
                      {{ $v.name.$params.minLength.min }} letters.
                    </div>
                    <div class="error-form-msg" v-if="$v.name.$error && !$v.name.maxLength">Name must have max
                      {{ $v.name.$params.maxLength.max }} letters.
                    </div>

                  </div>

                  <div class="form-group">
                    <label>Size <span class="text-danger">*</span></label>
                    <select v-model="size" class="form-control">
                      <option v-for="(sizeItem,index) in getterListSizeDO" :value="sizeItem.slug" selected>
                        {{ sizeItem.slug }}
                      </option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>SSH keys</label>

                    <multiselect v-model="ssh_keys" :options="getterListSSHKeyDO" :multiple="true"
                                 :close-on-select="false" :clear-on-select="false" :preserve-search="true"
                                 placeholder="Select SSH key" label="name" track-by="id" :preselect-first="true">
                      <template slot="selection" slot-scope="{ values, search, isOpen }">
                      </template>
                    </multiselect>
                  </div>

                  <div class="form-group">
                    <label>User data <span class="text-danger">*</span></label>
                    <input v-model="user_data" type="text" class="form-control"
                           :class="{ 'form-control--error': $v.user_data.$error}"
                           placeholder="The user-supplied, base64 encoded user data to attach to this instance">
                    <div class="error-form-msg" v-if="$v.user_data.$error && !$v.user_data.required">User Data is
                      required
                    </div>
                  </div>

                  <div class="form-group">
                    <label>Vpc UUID <span class="text-danger">*</span></label>
                    <input v-model="vpc_uuid" type="text" class="form-control"
                           :class="{ 'form-control--error': $v.vpc_uuid.$error}"
                           placeholder="The user-supplied, base64 encoded user data to attach to this instance">
                    <div class="error-form-msg" v-if="$v.vpc_uuid.$error && !$v.vpc_uuid.required">VPC UUID is
                      required
                    </div>
                  </div>

                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
            <!-- /.card -->

          </div>
          <!--/.col (left) -->
          <!-- right column -->
          <div class="col-md-6">
            <!-- Form Element sizes -->
            <div class="card card-success">
              <!--              <div class="card-header">-->
              <!--                <h3 class="card-title">Different Height</h3>-->
              <!--              </div>-->
              <div class="card-body">
                <div class="form-group">
                  <label>Region <span class="text-danger">*</span></label>
                  <select v-model="region" class="form-control">
                    <option v-for="region in getterListRegionDO" :value="region.slug">
                      {{ region.name + ' -- ' + region.slug }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Image <span class="text-danger">*</span></label>
                  <select v-model="image" class="form-control">
                    <option v-for="imageItem in getterListImageDO" :value="imageItem.slug">{{ imageItem.slug }}</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>IP V6</label>
                  <label class="switch d-block">
                    <input v-model="ipv6" type="checkbox"/>
                    <div class="slider round"></div>
                  </label>
                </div>

                <div class="form-group">
                  <label>Monitoring</label>
                  <label class="switch d-block">
                    <input v-model="monitoring" type="checkbox"/>
                    <div class="slider round"></div>
                  </label>
                </div>

                <div class="form-group">
                  <label>Backups</label>
                  <label class="switch d-block">
                    <input v-model="backups" type="checkbox"/>
                    <div class="slider round"></div>
                  </label>
                </div>

                <div class="form-group">
                  <label>With Droplet Agent</label>
                  <label class="switch d-block">
                    <input v-model="with_droplet_agent" type="checkbox"/>
                    <div class="slider round"></div>
                  </label>
                </div>

              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!--/.col (right) -->
        </div>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex/dist/vuex.esm.browser";
import Multiselect from 'vue-multiselect'
import {validationMixin} from "vuelidate"

const {required, maxLength, minLength} = require("vuelidate/lib/validators")


export default {
  name: "DigitalOceanCreateDropLet",
  data() {
    return {
      name: '',
      region: '',
      size: '',
      image: '',
      ssh_keys: '',
      backups: true,
      ipv6: true,
      monitoring: false,
      user_data: '',
      vpc_uuid: '',
      with_droplet_agent: true,
    }
  },
  mixins: [validationMixin],
  validations: {
    name: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(20)
    },
    user_data: {
      required,
    },
    vpc_uuid: {
      required,
    }
  },
  components: {
    Multiselect
  },
  created() {
    // GET LIST REGION
    this.getListRegionDO({typeGet: 'all'}).then(payload => {
      // Set default value region
      console.log('PAYLOAD', payload)
      if (payload.data.meta.total > 0) {
        this.region = payload.data.regions[0].slug
      }
    }).catch(e => {
      console.log('error', e)
    });
    // GET LIST SIZE
    this.getListSizeDO({}).then(payload => {
      // Set default value size
      if (payload.data.meta.total > 0) {
        this.size = payload.data.sizes[0].slug
      }
    }).catch(e => {
      console.log('error', e)
    });
    // GET LIST IMAGE
    this.getListImageDO({}).then(payload => {
      // Set default value size
      if (payload.data.meta.total > 0) {
        this.image = payload.data.images[0].slug
      }
    }).catch(e => {
      console.log('error', e)
    });
    // GET LIST SSH KEY
    this.getListSSHKeyDO({});
  },
  computed: {
    ...mapGetters([
      'getterListRegionDO', 'getterListSizeDO', 'getterListImageDO', 'getterListSSHKeyDO'
    ]),
    ...mapState([
      // 'listRegions','listPlans','listOS'
    ])
  },
  methods: {
    ...mapActions([
      'getListRegionDO', 'getListSizeDO', 'getListImageDO', 'getListSSHKeyDO','handleCreateDropLetDO'
    ]),
    submitFormCreateDropletDO() {
      this.$v.$touch()

      if (this.$v.$invalid) { // False
        console.log('invalid Form');
        this.$notify({title: 'Error', type: 'error', text: 'Please input some field !'});
      } else {
        let dataForm = {
          name: this.name,
          region: this.region,
          size: this.size,
          image: this.image,
          ssh_keys: this.convertSshKeys(),
          backups: this.backups,
          ipv6: this.ipv6,
          monitoring: this.monitoring,
          user_data: this.user_data,
          vpc_uuid: this.vpc_uuid,
        }
        console.log(dataForm)
        this.handleCreateDropLetDO(dataForm);
      }
    },
    convertSshKeys() {
      let arrSshKey = [];
      for (let i = 0; i < this.ssh_keys.length; i++) {
        arrSshKey.push(this.ssh_keys[i].id);
      }
      return arrSshKey;
    },
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.form-control--error {
  border: 1px solid red;
}

div.error-form-msg {
  color: red
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: green;
}

input:focus + .slider {
  box-shadow: 0 0 1px #101010;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
