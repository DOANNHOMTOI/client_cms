import axios from 'axios';
import {config} from "../constants/config";
const axiosInstance = axios.create({
  baseURL: config.url_api_back_end,
  // timeout: 1000,
  headers: {
    'accept': 'application/json',
    // 'Authorization' :  'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
  }
});

const axiosVultrService = axios.create({
  baseURL: config.local_api_proxy_service,
  // timeout: 1000,
  headers: {
    'Authorization' : 'Bearer ' + config.api_key_vultr_service,
    'accept': 'application/json'
  }
});

const axiosDigitalOceanService = axios.create({
  baseURL: config.local_api_proxy_service,
  // timeout: 1000,
  headers: {
    'Authorization' : 'Bearer ' + config.api_key_digital_ocean_service,
    'accept': 'application/json'
  }
});

export{
  axiosInstance,axiosVultrService,axiosDigitalOceanService
}
