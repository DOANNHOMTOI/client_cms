<template>
  <div class="left-side-menu">

    <div class="h-100" data-simplebar>

      <!-- User box -->
      <div class="user-box text-center">
        <img src="static/assets/images/users/user-1.jpg" alt="user-img" title="Mat Helme"
             class="rounded-circle avatar-md">
        <div class="dropdown">
          <a href="javascript: void(0);" class="text-dark dropdown-toggle h5 mt-2 mb-1 d-block"
             data-toggle="dropdown">Geneva Kennedy</a>
          <div class="dropdown-menu user-pro-dropdown">

            <!-- item-->
            <a href="javascript:void(0);" class="dropdown-item notify-item">
              <i class="fe-user mr-1"></i>
              <span>My Account</span>
            </a>

            <!-- item-->
            <a href="javascript:void(0);" class="dropdown-item notify-item">
              <i class="fe-settings mr-1"></i>
              <span>Settings</span>
            </a>

            <!-- item-->
            <a href="javascript:void(0);" class="dropdown-item notify-item">
              <i class="fe-lock mr-1"></i>
              <span>Lock Screen</span>
            </a>

            <!-- item-->
            <a href="javascript:void(0);" class="dropdown-item notify-item">
              <i class="fe-log-out mr-1"></i>
              <span>Logout</span>
            </a>

          </div>
        </div>
        <p class="text-muted">Admin Head</p>
      </div>

      <!--- Sidemenu -->
      <div id="sidebar-menu">

        <ul id="side-menu">

          <li class="menu-title">Navigation</li>

          <li>
            <router-link to="/">
              <span> Dashboards</span>
            </router-link>
          </li>

          <li class="menu-title mt-2">Apps</li>


          <li>
            <a href="#sidebarEcommerce" data-toggle="collapse">
              <i class="mdi mdi-text-box-multiple-outline"></i>
              <span>  Category </span>
              <span class="menu-arrow"></span>
            </a>
            <div class="collapse" id="sidebarEcommerce">
              <ul class="nav-second-level">
                <li>
                  <router-link to="/product-category/list">List</router-link>
                </li>
                <li>
                  <router-link to="/product-category/add">Add</router-link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#sidebarProduct" data-toggle="collapse">
              <i class="mdi mdi-layers-outline"></i>
              <span> Product </span>
              <span class="menu-arrow"></span>
            </a>
            <div class="collapse" id="sidebarProduct">
              <ul class="nav-second-level">
                <li>
                  <router-link to="/product/list">List</router-link>
                </li>
                <li>
                  <router-link to="/product/add">Add</router-link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#sidebarVoucher" data-toggle="collapse">
              <i class="mdi mdi-gift-outline"></i>
              <span>Voucher </span>
              <span class="menu-arrow"></span>
            </a>
            <div class="collapse" id="sidebarVoucher">
              <ul class="nav-second-level">
                <li>
                  <router-link to="/voucher/list">List</router-link>
                </li>
                <li>
                  <router-link to="/voucher/add">Add</router-link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#sidebarCustomer" data-toggle="collapse">
              <i class="mdi mdi-account-multiple-outline"></i>
              <span>Customer </span>
              <span class="menu-arrow"></span>
            </a>
            <div class="collapse" id="sidebarCustomer">
              <ul class="nav-second-level">
                <li>
                  <router-link to="/customer">List</router-link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#sidebarOrder" data-toggle="collapse">
              <i class="mdi mdi-cart-outline"></i>
              <span>Order </span>
              <span class="menu-arrow"></span>
            </a>
            <div class="collapse" id="sidebarOrder">
              <ul class="nav-second-level">
                <li>
                  <router-link to="/order/list">List</router-link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#sidebarGuest" data-toggle="collapse">
              <i class="mdi mdi-account-circle-outline"></i>
              <span>Guest </span>
              <span class="menu-arrow"></span>
            </a>
            <div class="collapse" id="sidebarGuest">
              <ul class="nav-second-level">
                <li>
                  <router-link to="/guest">List</router-link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#sidebarRate" data-toggle="collapse">
              <i class="mdi mdi-lifebuoy"></i>
              <span>Rating </span>
              <span class="menu-arrow"></span>
            </a>
            <div class="collapse" id="sidebarRate">
              <ul class="nav-second-level">
                <li>
                  <router-link to="/rating">List</router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>

      </div>
      <!-- End Sidebar -->

      <div class="clearfix"></div>

    </div>
    <!-- Sidebar -left -->

  </div>
</template>

<script>
export default {
  name: "AsideCp",
  computed:{
    nameRoute : function (){
      return this.$route.name;
    },
    getImageLogo: function (){
      return '/static/images/logo.png'
    },
    getImageAvatar: function (){
      return '/static/images/avt.png'
    }
  },
  created() {

  },
}
</script>

<style scoped>

</style>
