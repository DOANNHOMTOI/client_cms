<template>
  <div id="app">
    <div class="wrapper">
      <!-- Navbar -->
      <NavbarCp  v-if="!isSimplePage"/>
      <!-- /.navbar -->

      <!-- Main Sidebar Container -->


      <!-- Content Wrapper. Contains page content -->
      <router-view/>
      <!-- /.content-wrapper -->

      <!-- Control Sidebar -->
     <AsideCp  v-if="!isSimplePage" />
      <!-- /.control-sidebar -->
      <FooterCp  v-if="!isSimplePage"/>
      <!-- Main Footer -->

      <Loading v-bind:class="{ show: this.isLoading }"/>
      <notifications />
    </div>

  </div>
</template>

<script>
import Loading from "./components/Loading";
import NavbarCp from "./components/NavbarCp";
import AsideCp from "./components/AsideCp";
import FooterCp from "./components/FooterCp";
import {mapActions, mapState} from "vuex";
import "./plugins/jquery/jquery.min.js"
import "./plugins/bootstrap/js/bootstrap.bundle.min.js";
import "./dist/js/adminlte.js";
export default {
  name: 'App',
  data(){
    return {

    }
  },
  components :{
    Loading,
    NavbarCp,AsideCp,FooterCp
  },
  created() {
    this.checkLogin();
  },
  computed:{
    ... mapState(['isLoading']),
    isSimplePage(){
      let arrPageSimple = ['login'];
      if (arrPageSimple.includes(this.$route.name)){
        return true
      }else return false;
    }
  },
  methods:{
    ...mapActions(['checkLogin'])
  }
}
</script>
<style>
  @import "/plugins/fontawesome-free/css/all.min.css";
  @import "/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css";
  @import "/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
  @import "/plugins/jqvmap/jqvmap.min.css";
  @import "/dist/css/adminlte.min.css";
  @import "/plugins/overlayScrollbars/css/OverlayScrollbars.min.css";
  @import "/plugins/daterangepicker/daterangepicker.css";
  @import "/plugins/summernote/summernote-bs4.min.css";
</style>
