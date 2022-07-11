import Vue from 'vue'
import Router from 'vue-router'
import LoginCp from "../pages/LoginCp";
import DashBoardCp from "../pages/DashBoardCp";
import store from "../store";
import {ifAuthenticated, ifNotAuthenticated} from "../helpers/authenticate";
import ProductCategoryList from '../pages/product-category/ProductCategoryList'
import ProductCategoryAdd from '../pages/product-category/ProductCategoryAdd'
import Table from "../pages/Table";
import ProductCategoryEdit from "../pages/product-category/ProductCategoryEdit";
import ProductList from "../pages/product/ProductList";
import ProductAdd from "../pages/product/ProductAdd";
import ProductEdit from "../pages/product/ProductEdit";
import VoucherList from "../pages/voucher/VoucherList";
import VoucherAdd from "../pages/voucher/VoucherAdd";
import VoucherEdit from "../pages/voucher/VoucherEdit";
import Customer from "../pages/customer/CustomerList";
import OrderList from "../pages/order/OrderList";
import OrderDetail from "../pages/order/OrderDetail";

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
      path: '/table/list',
      name: 'Table',
      component: Table,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/login',
      name: 'login',
      component: LoginCp,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/product-category/list',
      name: 'ProductCategoryList',
      component: ProductCategoryList,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/product-category/add',
      name: 'ProductCategoryAdd',
      component: ProductCategoryAdd,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/product-category/:id',
      name: 'ProductCategoryEdit',
      component: ProductCategoryEdit,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/product/list',
      name: 'ProductList',
      component: ProductList,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/product/add',
      name: 'ProductAdd',
      component: ProductAdd,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/product/:id',
      name: 'ProductEdit',
      component: ProductEdit,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/voucher/list',
      name: 'VoucherList',
      component: VoucherList,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/voucher/add',
      name: 'VoucherAdd',
      component: VoucherAdd,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/voucher/:id',
      name: 'VoucherEdit',
      component: VoucherEdit,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/customer',
      name: 'Customer',
      component: Customer,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/order/list',
      name: 'OrderList',
      component: OrderList,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/order/:id',
      name: 'OrderDetail',
      component: OrderDetail,
      beforeEnter: ifAuthenticated
    },
  ]
})
