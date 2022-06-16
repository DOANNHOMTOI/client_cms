import Vue from 'vue'
import Router from 'vue-router'
import LoginCp from "../pages/LoginCp";
import DashBoardCp from "../pages/DashBoardCp";
import store from "../store";
import {ifAuthenticated, ifNotAuthenticated} from "../helpers/authenticate";
import ListInstanceCp from "../pages/instances/ListInstanceCp";
import CreateInstanceCp from "../pages/instances/CreateInstanceCp";
import DigitalOceanListRegion from "../pages/digital-ocean/regions/DigitalOceanListRegion";
import DigitalOceanListFireWall from "../pages/digital-ocean/firewalls/DigitalOceanListFireWall";
import DigitalOceanCreateFireWall from "../pages/digital-ocean/firewalls/DigitalOceanCreateFireWall";
import DigitalOceanListDropLet from "../pages/digital-ocean/droplets/DigitalOceanListDropLet";
import DigitalOceanListBackupDropLet from "../pages/digital-ocean/droplets/DigitalOceanListBackupDropLet";
import DigitalOceanListSnapShotDropLet from "../pages/digital-ocean/droplets/DigitalOceanListSnapShotDropLet";
import DigitalOceanListKernelDropLet from "../pages/digital-ocean/droplets/DigitalOceanListKernelDropLet";
import DigitalOceanListFireWallDropLet from "../pages/digital-ocean/droplets/DigitalOceanListFireWallDropLet";
import DigitalOceanListNeighBorDropLet from "../pages/digital-ocean/droplets/DigitalOceanListNeighBorDropLet";
import DigitalOceanListResourceDropLet from "../pages/digital-ocean/droplets/DigitalOceanListResourceDropLet";
import DigitalOceanCreateDropLet from "../pages/digital-ocean/droplets/DigitalOceanCreateDropLet";
import DigitalOceanListSshKey from "../pages/digital-ocean/ssh-keys/DigitalOceanListSshKey";
import DigitalOceanCreateSshKey from '../pages/digital-ocean/ssh-keys/DigitalOceanCreateSshKey'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashBoardCp,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/login',
      name: 'login',
      component: LoginCp,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/instances/list',
      name: 'list-instances',
      component: ListInstanceCp,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/instances/create',
      name: 'create-instance',
      component: CreateInstanceCp,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/digital-ocean/droplet/list',
      name: 'digital-ocean-list-droplet',
      component: DigitalOceanListDropLet,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/digital-ocean/droplet/create',
      name: 'digital-ocean-create-droplet',
      component: DigitalOceanCreateDropLet,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/digital-ocean/droplet/list-backup',
      name: 'digital-ocean-list-backup-droplet',
      component: DigitalOceanListBackupDropLet,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/digital-ocean/droplet/list-snapshot',
      name: 'digital-ocean-list-snapshot-droplet',
      component: DigitalOceanListSnapShotDropLet,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/digital-ocean/droplet/list-kernel',
      name: 'digital-ocean-list-kernel-droplet',
      component: DigitalOceanListKernelDropLet,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/digital-ocean/droplet/list-firewall',
      name: 'digital-ocean-list-firewall-droplet',
      component: DigitalOceanListFireWallDropLet,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/digital-ocean/droplet/list-neighbor',
      name: 'digital-ocean-list-neighbor-droplet',
      component: DigitalOceanListNeighBorDropLet,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/digital-ocean/droplet/list-resource',
      name: 'digital-ocean-list-resource-droplet',
      component: DigitalOceanListResourceDropLet,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/digital-ocean/region/list',
      name: 'digital-ocean-list-region',
      component: DigitalOceanListRegion,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/digital-ocean/firewall/list',
      name: 'digital-ocean-list-firewall',
      component: DigitalOceanListFireWall,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/digital-ocean/firewall/create',
      name: 'digital-ocean-create-firewall',
      component: DigitalOceanCreateFireWall,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/digital-ocean/firewall/add-droplet/:id',
      name: 'digital-ocean-firewall-add-droplet',
      component: DigitalOceanCreateFireWall,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/digital-ocean/ssh-key/list',
      name: 'digital-ocean-list-ssh-key',
      component: DigitalOceanListSshKey,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/digital-ocean/ssh-key/create',
      name: 'digital-ocean-create-ssh-key',
      component: DigitalOceanCreateSshKey,
      beforeEnter: ifAuthenticated
    },

  ]
})
