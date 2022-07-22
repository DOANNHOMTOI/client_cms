<template>
  <div class="navbar-custom">
    <div class="container-fluid">
      <ul class="list-unstyled topnav-menu float-right mb-0">

        <li class="dropdown notification-list topbar-dropdown">
          <a class="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
            <img src="https://banner2.cleanpng.com/20180625/req/kisspng-computer-icons-avatar-business-computer-software-user-avatar-5b3097fcae25c3.3909949015299112927133.jpg" alt="user-image" class="rounded-circle">
            <span class="pro-user-name ml-1">
                                    {{ user.email }} <i class="mdi mdi-chevron-down"></i>
                                </span>
          </a>
          <div class="dropdown-menu dropdown-menu-right profile-dropdown ">

            <!-- item-->
            <a @click="handleLogout()" href="javascript:void(0);" class="dropdown-item notify-item">
              <i class="fe-log-out"></i>
              <span>Logout</span>
            </a>

          </div>
        </li>


      </ul>

      <!-- LOGO -->
      <div class="logo-box">
        <a href="index.html" class="logo logo-dark text-center">
                            <span class="logo-sm">
                                <img src="static/assets/images/logo-sm.png" alt="" height="22">
                              <!-- <span class="logo-lg-text-light">UBold</span> -->
                            </span>
          <span class="logo-lg">
                                <img src="static/assets/images/logo-dark.png" alt="" height="20">
            <!-- <span class="logo-lg-text-light">U</span> -->
                            </span>
        </a>

        <a href="index.html" class="logo logo-light text-center">
                            <span class="logo-sm">
                                <img src="static/assets/images/logo-sm.png" alt="" height="22">
                            </span>
          <span class="logo-lg">
                                <img src="static/assets/images/logo-light.png" alt="" height="20">
                            </span>
        </a>
      </div>

      <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
        <li>
<!--          <button class="button-menu-mobile waves-effect waves-light">-->
<!--            <i class="fe-menu"></i>-->
<!--          </button>-->
        </li>



      </ul>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "NavbarCp",
  data(){
    return{
      user : JSON.parse(localStorage.getItem('USER_INFO_VPS')),
    }
  },
  created() {
    this.getListPermissionByUser(this.user.id).then(r=>{
      console.log('res getListPermissionByUser', r)
      console.log('r.data.data.name',r.data.data)
      this.$store.commit('SET_PERMISSION_LOCAL_STORAGE',JSON.stringify(r.data.data.name))
      // localStorage.setItem('permissions',JSON.stringify(r.data.data.name))
    }).catch(e=>{
      console.log(e)
    })
  },
  methods:{
    ...mapActions(['getListPermissionByUser']),
    handleLogout(){
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('USER_INFO_VPS');
      localStorage.removeItem('i4sign_in');
      // this.$router.push('/login')
      window.location.href = '/login'
    }
  }
}
</script>

<style scoped>

</style>
