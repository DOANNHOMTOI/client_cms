import {isEmptyObject} from "../../helpers";
import {axiosVultrService} from "../../helpers/axiosInstance";
import store from "../index";
import axios from 'axios';
var querystring = require('querystring');

import {config} from "../../constants/config";
export default {
  async getListRegion({commit, state}, data) {
    try {
      var result = await axiosVultrService.get('/regions');
      if (result.status == 200){
        let data = result.data.regions.length > 0 ? result.data.regions : [];
        commit('SET_LIST_REGIONS', data)
      }else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getListPlan({commit, state}, data) {
    try {
      var result = await axiosVultrService.get('/plans?type=' + config.typePlanQuery);
      if (result.status == 200){
        let data = result.data.plans.length > 0 ? result.data.plans : [];
        commit('SET_LIST_PLANS', data)
      }else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getListOS({commit, state}, data) {
    try {
      var result = await axiosVultrService.get('/os');
      if (result.status == 200){
        let data = result.data.os.length > 0 ? result.data.os : [];
        commit('SET_LIST_OS', data)
      }else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getListIso({commit, state}, data) {
    try {
      var result = await axiosVultrService.get('/iso');
      if (result.status == 200){
        let data = result.data.isos.length > 0 ? result.data.isos : [];
        commit('SET_LIST_ISO', data)
      }else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getListStartUpScript({commit, state}, data) {
    try {
      var result = await axiosVultrService.get('/startup-scripts');
      if (result.status == 200){
        let data = result.data.startup_scripts.length > 0 ? result.data.startup_scripts : [];
        commit('SET_LIST_START_UP_SCRIPT', data)
      }else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getListSnapShot({commit, state}, data) {
    try {
      var result = await axiosVultrService.get('/snapshots');
      if (result.status == 200){
        let data = result.data.snapshots.length > 0 ? result.data.snapshots : [];
        commit('SET_LIST_SNAP_SHOT', data)
      }else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getListApplication({commit, state}, data) {
    try {
      var result = await axiosVultrService.get('/applications');
      if (result.status == 200){
        let data = result.data.applications.length > 0 ? result.data.applications : [];
        commit('SET_LIST_APPLICATION', data)
      }else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getListFireWallGroup({commit, state}, data) {
    try {
      var result = await axiosVultrService.get('/firewalls');
      if (result.status == 200){
        let data = result.data.firewall_groups.length > 0 ? result.data.firewall_groups : [];
        commit('SET_LIST_FIRE_WALL_GROUP', data)
      }else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async createInstance({commit, state}, data) {
    try {
      commit('SHOW_LOADING',true);
      let {
        region, os_id, plan, ipxe_chain_url, iso_id, script_id, enable_ipv6, attach_private_network, label,
        sshkey_id, backups, app_id, image_id, user_data, ddos_protection, activation_email, hostname, snapshot_id,
        tag, firewall_group_id, reserved_ipv4, enable_private_network
      } = data

      // let bodyFormData = new FormData();


      // bodyFormData.append('ipxe_chain_url', ipxe_chain_url)
      // bodyFormData.append('iso_id', iso_id)
      // bodyFormData.append('script_id', script_id)
      // bodyFormData.append('enable_ipv6', enable_ipv6)
      // bodyFormData.append('attach_private_network', attach_private_network)
      // bodyFormData.append('sshkey_id', sshkey_id)
      // bodyFormData.append('backups', backups)
      // bodyFormData.append('app_id', app_id)
      // bodyFormData.append('image_id', image_id)
      // bodyFormData.append('ddos_protection', ddos_protection)
      // bodyFormData.append('activation_email', activation_email)
      // bodyFormData.append('hostname', hostname)
      // bodyFormData.append('snapshot_id', snapshot_id)
      // bodyFormData.append('tag', tag)
      // bodyFormData.append('firewall_group_id', firewall_group_id)
      // bodyFormData.append('reserved_ipv4', reserved_ipv4)
      // bodyFormData.append('enable_private_network', enable_private_network)


      var postData = {
        region: region,
        plan: plan,
        os_id: os_id,
        backups: backups,
        user_data: user_data,
        label: label,
        // enable_private_network: enable_private_network,
        // enable_ipv6: enable_ipv6,
        // ddos_protection: ddos_protection,
        // activation_email: activation_email,
      };

      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "Authorization": 'Bearer ' + config.api_key_vultr_service
        }
      };


      const response  = await axios.post(config.local_api_vultr_service + '/instances', postData, axiosConfig)
        .then((res) => {
          commit('SHOW_LOADING',false);
          console.log("RESPONSE RECEIVED: ", res);
        })
        .catch((err) => {
          commit('SHOW_LOADING',false);
          console.log("ERROR RECEIVED CREATE VULTR: ", err);
        })

      // CALL API SAVE TO SERVER
      let dataToPHP = {
        id: "4f0f12e5-1f84-404f-aa84-85f431ea5ec2",
        os: "CentOS 8 Stream",
        ram: 1024,
        disk: 0,
        main_ip: "0.0.0.0",
        vcpu_count: 1,
        region: "ewr",
        plan: "vc2-1c-1gb",
        date_created: "2021-09-14T13:22:20+00:00",
        status: "pending",
        allowed_bandwidth: 1000,
        netmask_v4: "",
        gateway_v4: "0.0.0.0",
        power_status: "running",
        server_status: "none",
        v6_network: "",
        v6_main_ip: "",
        v6_network_size: 0,
        label: "",
        internal_ip: "",
        kvm: "",
        tag: "",
        os_id: 401,
        app_id: 0,
        image_id: "",
        firewall_group_id: "",
        features: [ ],
        default_password: "v5{Fkvb#2ycPGwHs"
      }
      let axiosConfigToPHP = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        }
      };
      const responseFromPHP  = await axios.post(config.url_api_back_end + '/instances/create', dataToPHP, axiosConfigToPHP)
        .then((res) => {
          commit('SHOW_LOADING',false);
          console.log("RESPONSE RECEIVED FROM SAVE PHP: ", res);
        })
        .catch((err) => {
          commit('SHOW_LOADING',false);
          console.log("ERROR RECEIVED FROM SAVE PHP ", err);
        })

      console.log('RES', response)

    } catch (error) {
      console.log(error);
      commit('SHOW_LOADING',false);
      return false;
    }
  },
}
