<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <router-link :to="{ name: 'dashboard', params: {} }"
                 class="brand-link">
      <img :src="getImageLogo" alt="" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">VPS Management</span>
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img :src="getImageAvatar" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <router-link :to="{ name: 'dashboard', params: {} }"
                       class="d-block">
            Admin
          </router-link>
        </div>
      </div>

      <!-- SidebarSearch Form -->
<!--      <div class="form-inline">-->
<!--        <div class="input-group" data-widget="sidebar-search">-->
<!--          <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">-->
<!--          <div class="input-group-append">-->
<!--            <button class="btn btn-sidebar">-->
<!--              <i class="fas fa-search fa-fw"></i>-->
<!--            </button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item menu-open">
            <a href="#" class="nav-link" v-bind:class="{ active: nameRoute === 'dashboard' }" >
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
              </p>
            </a>
          </li>
<!--          <li class="nav-header">Vultr</li>-->
<!--          <li class="nav-item"-->
<!--              v-bind:class="{ 'menu-open' : ['list-instances','create-instance'].includes(nameRoute), }">-->
<!--            <a href="" class="nav-link" v-bind:class="{ active: ['list-instances','create-instance'].includes(nameRoute), }">-->
<!--              <i class="nav-icon far fas fa-th"></i>-->
<!--              <p>-->
<!--                Instances-->
<!--                <i class="fas fa-angle-left right"></i>-->
<!--              </p>-->
<!--            </a>-->
<!--            <ul class="nav nav-treeview">-->
<!--              <li class="nav-item">-->
<!--                <router-link :to="{ name: 'list-instances', params: {} }"-->
<!--                             class="nav-link"-->
<!--                             v-bind:class="{ active: nameRoute === 'list-instances' }">-->
<!--                  <i class="far fa-circle nav-icon"></i>-->
<!--                  <p>List Instances</p>-->
<!--                </router-link>-->
<!--              </li>-->
<!--              <li class="nav-item">-->
<!--                <router-link :to="{ name: 'create-instance', params: {} }"-->
<!--                             class="nav-link"-->
<!--                             v-bind:class="{ active: nameRoute === 'create-instance' }">-->
<!--                  <i class="far fa-circle nav-icon"></i>-->
<!--                  <p>Create Instance</p>-->
<!--                </router-link >-->
<!--              </li>-->
<!--            </ul>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <a href="#" class="nav-link">-->
<!--              <i class="nav-icon far fas fa-th"></i>-->
<!--              <p>-->
<!--                Firewall-->
<!--                <i class="fas fa-angle-left right"></i>-->
<!--              </p>-->
<!--            </a>-->
<!--            <ul class="nav nav-treeview">-->
<!--              <li class="nav-item">-->
<!--                <a href="pages/mailbox/mailbox.html" class="nav-link">-->
<!--                  <i class="far fa-circle nav-icon"></i>-->
<!--                  <p>List Firewall</p>-->
<!--                </a>-->
<!--              </li>-->
<!--              <li class="nav-item">-->
<!--                <a href="pages/mailbox/compose.html" class="nav-link">-->
<!--                  <i class="far fa-circle nav-icon"></i>-->
<!--                  <p>Compose</p>-->
<!--                </a>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </li>-->

          <!--   DIGITAL OCEAN       -->
          <li class="nav-header">Digital Ocean</li>
          <li class="nav-item"
              v-bind:class="{ 'menu-open' :
                                          ['digital-ocean-list-droplet','digital-ocean-create-droplet','digital-ocean-list-backup-droplet',
                                          'digital-ocean-list-snapshot-droplet','digital-ocean-list-kernel-droplet','digital-ocean-list-firewall-droplet',
                                          'digital-ocean-list-neighbor-droplet','digital-ocean-list-resource-droplet'
                                          ]
                             .includes(nameRoute), }">
            <a
              href=""
              class="nav-link"
              v-bind:class="{ active:
                                  ['digital-ocean-list-droplet','digital-ocean-create-droplet','digital-ocean-list-backup-droplet','digital-ocean-list-firewall-droplet',
                                   'digital-ocean-list-neighbor-droplet','digital-ocean-list-resource-droplet',
                                  'digital-ocean-list-snapshot-droplet','digital-ocean-list-kernel-droplet']
                              .includes(nameRoute), }">
              <i class="nav-icon far fas fa-th"></i>
              <p>
                Droplets
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'digital-ocean-list-droplet', params: {} }"
                             class="nav-link"
                             v-bind:class="{ active: nameRoute === 'digital-ocean-list-droplet' }">
                  <i class="far fa-circle nav-icon"></i>
                  <p>List Droplet</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'digital-ocean-create-droplet', params: {} }"
                             class="nav-link"
                             v-bind:class="{ active: nameRoute === 'digital-ocean-create-droplet' }">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Create Droplet</p>
                </router-link >
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'digital-ocean-list-backup-droplet', params: {} }"
                             class="nav-link"
                             v-bind:class="{ active: nameRoute === 'digital-ocean-list-backup-droplet' }">
                  <i class="far fa-circle nav-icon"></i>
                  <p>List Backups by Droplet</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'digital-ocean-list-snapshot-droplet', params: {} }"
                             class="nav-link"
                             v-bind:class="{ active: nameRoute === 'digital-ocean-list-snapshot-droplet' }">
                  <i class="far fa-circle nav-icon"></i>
                  <p>List SnapShots by Droplet</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'digital-ocean-list-kernel-droplet', params: {} }"
                             class="nav-link"
                             v-bind:class="{ active: nameRoute === 'digital-ocean-list-kernel-droplet' }">
                  <i class="far fa-circle nav-icon"></i>
                  <p>List Kernels by Droplet</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'digital-ocean-list-firewall-droplet', params: {} }"
                             class="nav-link"
                             v-bind:class="{ active: nameRoute === 'digital-ocean-list-firewall-droplet' }">
                  <i class="far fa-circle nav-icon"></i>
                  <p>List FireWalls by Droplet</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'digital-ocean-list-neighbor-droplet', params: {} }"
                             class="nav-link"
                             v-bind:class="{ active: nameRoute === 'digital-ocean-list-neighbor-droplet' }">
                  <i class="far fa-circle nav-icon"></i>
                  <p>List NeighBors by Droplet</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'digital-ocean-list-resource-droplet', params: {} }"
                             class="nav-link"
                             v-bind:class="{ active: nameRoute === 'digital-ocean-list-resource-droplet' }">
                  <i class="far fa-circle nav-icon"></i>
                  <p>List Resource by Droplet</p>
                </router-link>
              </li>

            </ul>
          </li>

          <li class="nav-item"
              v-bind:class="{ 'menu-open' : ['digital-ocean-list-region'].includes(nameRoute), }">
            <a href="" class="nav-link" v-bind:class="{ active: ['digital-ocean-list-region'].includes(nameRoute), }">
              <i class="nav-icon far fas fa-th"></i>
              <p>
                Regions
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'digital-ocean-list-region', params: {} }"
                             class="nav-link"
                             v-bind:class="{ active: nameRoute === 'digital-ocean-list-region' }">
                  <i class="far fa-circle nav-icon"></i>
                  <p>List Region</p>
                </router-link>
              </li>
            </ul>
          </li>


          <li class="nav-item"
              v-bind:class="{ 'menu-open' : ['digital-ocean-list-firewall','digital-ocean-create-firewall'].includes(nameRoute), }">
            <a href="" class="nav-link" v-bind:class="{ active: ['digital-ocean-list-firewall','digital-ocean-create-firewall'].includes(nameRoute), }">
              <i class="nav-icon far fas fa-th"></i>
              <p>
                FireWalls
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'digital-ocean-list-firewall', params: {} }"
                             class="nav-link"
                             v-bind:class="{ active: nameRoute === 'digital-ocean-list-firewall' }">
                  <i class="far fa-circle nav-icon"></i>
                  <p>List FireWall</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'digital-ocean-create-firewall', params: {} }"
                             class="nav-link"
                             v-bind:class="{ active: nameRoute === 'digital-ocean-create-firewall' }">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Create FireWall</p>
                </router-link >
              </li>
            </ul>
          </li>

          <li class="nav-item"
              v-bind:class="{ 'menu-open' : ['digital-ocean-list-ssh-key','digital-ocean-create-ssh-key'].includes(nameRoute), }">
            <a href="" class="nav-link" v-bind:class="{ active: ['digital-ocean-list-ssh-key','digital-ocean-create-ssh-key'].includes(nameRoute) }">
              <i class="nav-icon far fas fa-th"></i>
              <p>
                SSH Key
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'digital-ocean-list-ssh-key', params: {} }"
                             class="nav-link"
                             v-bind:class="{ active: nameRoute === 'digital-ocean-list-ssh-key' }">
                  <i class="far fa-circle nav-icon"></i>
                  <p>List SSH Key</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'digital-ocean-create-ssh-key', params: {} }"
                             class="nav-link"
                             v-bind:class="{ active: nameRoute === 'digital-ocean-create-ssh-key' }">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Create SSH Key</p>
                </router-link >
              </li>
            </ul>
          </li>

        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
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
