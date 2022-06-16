<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Create FireWall</h1>
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
              <form @submit.prevent="submitFormCreateFireWallDO">
                <div class="card-body">
                  <div class="form-group">
                    <label>Name <span class="text-danger">*</span></label>
                    <input v-model="name" type="text" class="form-control" placeholder="Enter Name SSH Key"
                           :class="{ 'form-control--error': $v.name.$error}"
                    >
                    <div class="error-form-msg" v-if="$v.name.$error && !$v.name.required">Name is required</div>
                  </div>
                  <div class="form-group">
                    <label>Inbound Rules <span class="text-danger">*</span>
                      <button @click="increInboundRule()" type="button" class="btn btn-info">
                        <i class="fas fa-plus"></i>
                      </button>
                    </label>
<!--                    <template v-for="i in numberInboundRule">-->
                      <div class="row mx-0" v-for="(rule,index) in inbound_rules">
                        <div class="form-group col-3 px-0 mr-3">
                          <label>Protocol<span class="text-danger">*</span></label>
                          <select class="form-control" v-model=" rule.protocol">
                            <option  :value="item" v-for="item in enumProtocol">{{ item}}</option>
                          </select>
                        </div>
                        <div class="form-group col-3 px-0">
                          <label>Port<span class="text-danger">*</span>
                          </label>
                          <input v-model="rule.ports" type="number" class="form-control" placeholder="Enter Port"
                          >
                        </div>
                      </div>
<!--                    </template>-->
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
  name: "DigitalOceanCreateFireWall",
  data(){
    return{
      name:'',
      public_key:'',
      inbound_rules:[
        {protocol:'',ports:'',sources: { }}
      ],
      enumProtocol : ["tcp","udp","icmp"]
    }
  },
  mixins: [validationMixin],
  validations: {
    name: {
      required,
    },
    inbound_rules:{required}
  },
  methods:{
    ...mapActions(['handleCreateFireWallDO','showNotification']),
    increInboundRule(){
      this.inbound_rules.push( {protocol:'',ports:'',sources: { }})
    },
   async submitFormCreateFireWallDO(){
      // console.log(this.$v)
     await this.$v.$touch();
      if (this.$v.$invalid) { // False
        await this.$notify({title: 'Error', type: 'error', text: 'Please input some field !'});
      } else {
        let dataForm = {
          name: this.name,
          inbound_rules: this.getInboundRules(this.inbound_rules),
        }
        if (dataForm.inbound_rules.length === 0){
          await this.$store.dispatch('showNotification', {title: 'Error', type: 'error', duration: 7000, text: 'Please input some field !'})
          return false;
        }
        await this.handleCreateFireWallDO(dataForm);
      }
    },
    getInboundRules(inbound_rules){
      let arrInboundRule = [];
      for (let i = 0; i < inbound_rules.length; i++) {
        if (inbound_rules[i].ports !== '' && inbound_rules[i].protocol !== ''){
          arrInboundRule.push(inbound_rules[i])
        }
      }
      return arrInboundRule;
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
