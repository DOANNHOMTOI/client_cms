<template>
  <div class="content-wrapper" style="min-height: 1345.31px;">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Create Instance</h1>
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
              <form>
                <div class="card-body">
                  <div class="form-group">
                    <label>Region <span class="text-danger">*</span></label>
                    <select v-model="region" class="form-control">
                      <option v-for="region in listRegionsFromState" :value="region.id">{{ region.city}}</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>OS <span class="text-danger">*</span></label>
                    <select v-model="os_id" class="form-control">
                      <option v-for="os in listOSFromState" :value="os.id">{{ os.name}}</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>ISO</label>
                    <select v-model="iso_id" class="form-control">
                      <option v-for="iso in listIsoFromState" :value="iso.id">{{ iso.filename}}</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>Snapshots</label>
                    <select v-model="snapshot_id" class="form-control">
                      <option v-for="snapshot in listSnapShotFromState" :value="snapshot.id">{{ snapshot.description}}</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>Private Networks</label>
                    <input v-model="attach_private_network" type="text" class="form-control"
                           placeholder="">
                  </div>

                  <div class="form-group">
                    <label>SSH Key</label>
                    <input v-model="sshkey_id" type="text" class="form-control"
                           placeholder="">
                  </div>

                  <div class="form-group">
                    <label>Applications</label>
                    <select v-model="app_id" class="form-control">
                      <option v-for="app in listApplicationFromState" :value="app.id">{{ app.name}}</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>User data <span class="text-danger">*</span></label>
                    <input v-model="user_data" type="text" class="form-control"
                           placeholder="The user-supplied, base64 encoded user data to attach to this instance">
                  </div>

                  <div class="form-group">
                    <label>Hostname</label>
                    <input v-model="hostname" type="text" class="form-control"
                           placeholder="The hostname to use when deploying this instance">
                  </div>

                  <div class="form-group">
                    <label>Tag</label>
                    <input v-model="tag" type="text" class="form-control"
                           placeholder="The user-supplied tag">
                  </div>

                  <div class="form-group">
                    <label>Firewall Groups</label>
                    <select v-model="firewall_group_id" class="form-control">
                      <option v-for="firewall_group in listFireWallGroupFromState" :value="firewall_group.id">{{ firewall_group.description}}</option>
                    </select>
                  </div>

                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="button" @click.prevent="submitFormCreateInstance()" class="btn btn-primary">Submit</button>
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
                  <label>Plan <span class="text-danger">*</span> (Only VC2)</label>
                  <select v-model="plan" class="form-control">
                    <option v-for="plan in listPlansFromState" :value="plan.id">{{ plan.id}}</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Ipxe_chain_url</label>
                  <input v-model="ipxe_chain_url" type="text" class="form-control" placeholder="The URL location of the iPXE chainloader.">
                </div>

                <div class="form-group">
                  <label>Script_id</label>
                  <select v-model="script_id" class="form-control">
                    <option v-for="scriptItem in listStartupScriptFromState" :value="scriptItem.id">{{ scriptItem.name}}</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Enable IP V6</label>
                  <label class="switch d-block">
                    <input v-model="enable_ipv6" type="checkbox" />
                    <div class="slider round"></div>
                  </label>
                </div>

                <div class="form-group">
                  <label>Label <span class="text-danger">*</span></label>
                  <input v-model="label" type="text" class="form-control"
                         placeholder="A user-supplied label for this instance.">
                </div>

                <div class="form-group">
                  <label>Backups</label>
                  <label class="switch d-block">
                    <input v-model="backups" type="checkbox" />
                    <div class="slider round"></div>
                  </label>
                </div>

                <div class="form-group">
                  <label>Image </label>
                  <input v-model="image_id" type="text" class="form-control"
                         placeholder="The Application image_id to use when deploying this instance">
                </div>

                <div class="form-group">
                  <label> DDoS protection</label>
                  <label class="switch d-block">
                    <input v-model="ddos_protection" type="checkbox" />
                    <div class="slider round"></div>
                  </label>
                </div>

                <div class="form-group">
                  <label>Activation email</label>
                  <label class="switch d-block">
                    <input v-model="activation_email" type="checkbox" />
                    <div class="slider round"></div>
                  </label>
                </div>

                <div class="form-group">
                  <label>Reserved Ip V4 </label>
                  <input v-model="reserved_ipv4" type="text" class="form-control"
                         placeholder="ID of the floating IP to use as the main IP of this server">
                </div>

                <div class="form-group">
                  <label>Enable Private Network</label>
                  <label class="switch d-block">
                    <input v-model="enable_private_network" type="checkbox" />
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
import {mapActions,mapGetters,mapState} from "vuex/dist/vuex.esm.browser";

export default {
  name: "CreateInstanceCp",
  data(){
    return {
      region : '',
      plan : '',
      os_id : '',
      ipxe_chain_url : '',
      iso_id : '',
      script_id : '',
      enable_ipv6 : '',
      attach_private_network : '',
      label : '',
      sshkey_id : '',
      backups : '',
      app_id : '',
      image_id : '',
      user_data : '',
      ddos_protection : '',
      activation_email : '',
      hostname : '',
      snapshot_id : '',
      tag : '',
      firewall_group_id : '',
      reserved_ipv4 : '',
      enable_private_network : '',
    }
  },
  created() {
    this.getListRegion({}),
      this.getListPlan({}),
      this.getListOS({}),
      this.getListIso({}),
      this.getListStartUpScript({}),
      this.getListSnapShot({}),
      this.getListApplication({}),
      this.getListFireWallGroup({})
  },
  computed:{
    ...mapGetters([
      'listRegionsFromState','listPlansFromState','listOSFromState','listIsoFromState','listStartupScriptFromState',
      'listSnapShotFromState','listApplicationFromState','listFireWallGroupFromState'
    ]),
    ...mapState([
      // 'listRegions','listPlans','listOS'
    ])
  },
  methods:{
    ...mapActions([
      'getListRegion','getListPlan','getListOS','getListIso','getListStartUpScript','getListSnapShot','getListApplication',
      'getListFireWallGroup','createInstance','saveInstanceToServer'
    ]),
    submitFormCreateInstance(){
      let {region,plan,os_id,ipxe_chain_url,iso_id,script_id,enable_ipv6,attach_private_network,label,sshkey_id,
        backups,app_id,image_id,user_data,ddos_protection,activation_email,hostname,snapshot_id,tag,firewall_group_id,
        reserved_ipv4,enable_private_network
        } = this;

      let dataValues  = {
        region : region,
        os_id : os_id,
        plan : plan,
        ipxe_chain_url : ipxe_chain_url,
        iso_id : iso_id,
        script_id : script_id,
        enable_ipv6 : enable_ipv6 === '' ? false : true,
        attach_private_network : attach_private_network,
        label : label,
        sshkey_id : sshkey_id,
        backups : backups ? 'enabled' : 'disabled',
        app_id : app_id,
        image_id : image_id,
        user_data : user_data,
        ddos_protection : ddos_protection === '' ? false : true,
        activation_email : activation_email === '' ? false : true,
        hostname : hostname,
        snapshot_id : snapshot_id,
        tag : tag,
        firewall_group_id : firewall_group_id,
        reserved_ipv4 : reserved_ipv4,
        enable_private_network : enable_private_network === '' ? false : true,
      }
      console.log('dataValues submitFormCreateInstance', dataValues)
      this.createInstance(dataValues).then(res => {

        console.log('RES submitFormCreateInstance', res)

      }).catch(e => {

        console.log(e)
      })
    }
  }
}
</script>

<style scoped>
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
