<template>
  <div class="container-fluid">
    <div v-if="total != null" class="row mt-3">
      <h4 style="color:black">Thống kê chung</h4>
      <div class="col-md-6 col-xl-3">
        <div class="widget-rounded-circle card-box">
          <div class="row">
            <div class="col-6">
              <div class="avatar-lg rounded-circle bg-primary border-primary border shadow">
                <i class="fe-heart font-22 avatar-title text-white"></i>
              </div>
            </div>
            <div class="col-6">
              <div class="text-right">
                <h3 class="mt-1"><span style="color: black" data-plugin="counterup">{{total.orders}}</span></h3>
                <p class="text-muted mb-1 text-truncate">Số đơn hàng</p>
              </div>
            </div>
          </div> <!-- end row-->
        </div> <!-- end widget-rounded-circle-->
      </div> <!-- end col-->

      <div class="col-md-6 col-xl-3">
        <div class="widget-rounded-circle card-box">
          <div class="row">
            <div class="col-6">
              <div class="avatar-lg rounded-circle bg-success border-success border shadow">
                <i class="fe-shopping-cart font-22 avatar-title text-white"></i>
              </div>
            </div>
            <div class="col-6">
              <div class="text-right">
                <h3 class="text-dark mt-1"><span style="color: black" data-plugin="counterup">{{total.products}}</span></h3>
                <p class="text-muted mb-1 text-truncate">Số sản phẩm</p>
              </div>
            </div>
          </div> <!-- end row-->
        </div> <!-- end widget-rounded-circle-->
      </div> <!-- end col-->

      <div class="col-md-6 col-xl-3">
        <div class="widget-rounded-circle card-box">
          <div class="row">
            <div class="col-6">
              <div class="avatar-lg rounded-circle bg-info border-info border shadow">
                <i class="fe-bar-chart-line- font-22 avatar-title text-white"></i>
              </div>
            </div>
            <div class="col-6">
              <div class="text-right">
                <h3 class="text-dark mt-1"><span style="color: black" data-plugin="counterup">{{total.guests}}</span></h3>
                <p class="text-muted mb-1 text-truncate">Số khách hàng</p>
              </div>
            </div>
          </div> <!-- end row-->
        </div> <!-- end widget-rounded-circle-->
      </div> <!-- end col-->

      <div class="col-md-6 col-xl-3">
        <div class="widget-rounded-circle card-box">
          <div class="row">
            <div class="col-6">
              <div class="avatar-lg rounded-circle bg-warning border-warning border shadow">
                <i class="fe-eye font-22 avatar-title text-white"></i>
              </div>
            </div>
            <div class="col-6">
              <div class="text-right">
                <h3 class="text-dark mt-1"><span style="color: black" data-plugin="counterup">{{total.categories}}</span></h3>
                <p class="text-muted mb-1 text-truncate">Số danh mục</p>
              </div>
            </div>
          </div> <!-- end row-->
        </div> <!-- end widget-rounded-circle-->
      </div> <!-- end col-->
    </div>

    <div v-if="orders != null" class="row mt-3">
      <h4 style="color:black">Thống kê đơn hàng</h4>
      <div class="row">
        <form class="d-flex">

          <div class="form-group mb-3 mr-3">
            <label for="simpleinput">Ngày bắt đầu</label>
            <input v-model="start_time" type="datetime-local" id="simpleinput" class="form-control">
          </div>
          <div class="form-group mb-3 mr-3">
            <label for="example-email">Ngày kết thúc</label>
            <input v-model="end_time" type="datetime-local" id="example-email" name="example-email" class="form-control" placeholder="Email">
          </div>
          <div class="form-group mb-3 mr-3">
            <label for="example-email">Trạng thái</label>
            <select v-model="status" name="" id="" class="form-control">
              <option value="">TRANG THÁI</option>
              <option value="1">Mới</option>
              <option value="2">ĐANG GIAO</option>
              <option value="3">THÀNH CÔNG</option>
              <option value="4">HUỶ</option>
            </select>
          </div>
          <div class="form-group mb-3 mr-3">
            <label></label>
            <button @click="search()" style="background-color: #4938d7;margin-top:7px" type="button" name="example-email" class="form-control btn-primary">Tra cứu</button>
          </div>
        </form>
      </div>
      <div class="col-md-6 col-xl-2">
        <div class="widget-rounded-circle card-box">
          <div class="row">
            <div class="col-12">
              <div class="">
                <h3 class="mt-1"><span style="color: black" data-plugin="counterup">{{convertCurrency(orders.total_price)}}</span></h3>
                <p class="text-muted mb-1 text-truncate">Doanh Thu</p>
              </div>
            </div>
          </div> <!-- end row-->
        </div> <!-- end widget-rounded-circle-->
      </div> <!-- end col-->
      <div class="col-md-6 col-xl-2">
        <div class="widget-rounded-circle card-box">
          <div class="row">
            <div class="col-12">
              <div class="">
                <h3 class="mt-1"><span style="color: black" data-plugin="counterup">{{orders.total_order}}</span></h3>
                <p class="text-muted mb-1 text-truncate">Số đơn hàng</p>
              </div>
            </div>
          </div> <!-- end row-->
        </div> <!-- end widget-rounded-circle-->
      </div> <!-- end col-->

      <div class="col-md-6 col-xl-2">
        <div class="widget-rounded-circle card-box">
          <div class="row">
            <div class="col-12">
              <div class="">
                <h3 class="text-dark mt-1"><span style="color: black" data-plugin="counterup">{{orders.NEW}}</span></h3>
                <p class="text-muted mb-1 text-truncate">Đơn mới</p>
              </div>
            </div>
          </div> <!-- end row-->
        </div> <!-- end widget-rounded-circle-->
      </div> <!-- end col-->

      <div class="col-md-6 col-xl-2">
        <div class="widget-rounded-circle card-box">
          <div class="row">
            <div class="col-12">
              <div class="">
                <h3 class="text-dark mt-1"><span style="color: black" data-plugin="counterup">{{orders.PROCESSING}}</span></h3>
                <p class="text-muted mb-1 text-truncate">Đơn đang giao</p>
              </div>
            </div>
          </div> <!-- end row-->
        </div> <!-- end widget-rounded-circle-->
      </div> <!-- end col-->

      <div class="col-md-6 col-xl-2">
        <div class="widget-rounded-circle card-box">
          <div class="row">
            <div class="col-12">
              <div>
                <h3 class="text-dark mt-1"><span style="color: black" data-plugin="counterup">{{orders.SUCCESS}}</span></h3>
                <p class="text-muted mb-1 text-truncate">Đơn thành công</p>
              </div>
            </div>
          </div> <!-- end row-->
        </div> <!-- end widget-rounded-circle-->
      </div> <!-- end col-->
      <div class="col-md-6 col-xl-2">
        <div class="widget-rounded-circle card-box">
          <div class="row">
            <div class="col-12">
              <div class="">
                <h3 class="text-dark mt-1"><span style="color: black" data-plugin="counterup">{{orders.CANCEL}}</span></h3>
                <p class="text-muted mb-1 text-truncate">Đơn đã huỷ</p>
              </div>
            </div>
          </div> <!-- end row-->
        </div> <!-- end widget-rounded-circle-->
      </div> <!-- end col-->
    </div>

    <div v-if="recent != null" class="row">
      <div class="col-xl-6">
        <div class="card-box">

          <h4 class="header-title mb-3">Top 5 Sản phẩm bán chạy</h4>

          <div class="table-responsive">
            <table class="table table-borderless table-hover table-nowrap table-centered m-0">

              <thead class="thead-light">
              <tr>
                <th>Mã sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Đã bán</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,i) in recent.sp_ban_chay">
                <td>
                  <h5 class="m-0 font-weight-normal">{{ item.sku }}</h5>
                </td>
                <td>
                  <h5 class="m-0 font-weight-normal">{{ item.name }}</h5>
                </td>
                <td>
                  <h5 class="m-0 font-weight-normal">{{ convertCurrency(item.price) }}</h5>
                </td>

                <td>
                  <h5 class="m-0 font-weight-normal">{{ item.buyer }}</h5>
                </td>
              </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div> <!-- end col -->

      <div class="col-xl-6">
        <div class="card-box">
          <div class="dropdown float-right">
            <a href="#" class="dropdown-toggle arrow-none card-drop" data-toggle="dropdown" aria-expanded="false">
              <i class="mdi mdi-dots-vertical"></i>
            </a>
          </div>

          <h4 class="header-title mb-3">Đơn hàng gần đây</h4>

          <div class="table-responsive">
            <table class="table table-borderless table-nowrap table-hover table-centered m-0">

              <thead class="thead-light">
              <tr>
                <th>Mã đơn hàng</th>
                <th>Tổng tiền</th>
                <th>Ngày tạo</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in recent.don_gan_day">
                <td>
                 {{item.sku}}
                </td>

                <td>
                  {{convertCurrency(item.total_price)}}
                </td>

                <td>
                 {{ convertMoment(item.created_at)}}
                </td>
              </tr>

              </tbody>
            </table>
          </div> <!-- end .table-responsive-->
        </div> <!-- end card-box-->
      </div> <!-- end col -->
    </div>
  </div> <!-- container -->
</template>

<script>
import {mapActions} from "vuex";
import moment from "moment";
export default {
  name: "DashBoardCp",
  data(){
    return {
      total:{},
      orders:{},
      status: '',
      start_time: '',
      end_time: '',
      recent:{},
    }
  },
  created() {
    this.getDataDash(-1).then(r=>{
      console.log('res getDataDash', r)
      this.total = r.data.data.total
      this.recent = r.data.data.recent
    }).catch(e=>{
      console.log(e)
    })
    this.getDataOrder(null).then(r=>{
      console.log('res getDataOrder', r)
      this.orders = r.data.data
    }).catch(e=>{
      console.log(e)
    })
  },
  methods: {
    ...mapActions(['getDataDash','getDataOrder']),
    convertMoment(date){
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    convertCurrency(x){
      return x.toLocaleString('vi-VN') + ' đ'
    },
    search(){
      let params  = {}
      let url = `/api/report/order`;

      if (this.status !== ''){
        params .status = parseInt(this.status)
      }
      if (this.start_time !== '' && this.end_time !== ''){
        params .start_time = new Date(this.start_time).getTime()/1000
        params .end_time = new Date(this.end_time).getTime()/1000
      }

      console.log('params',params )
      this.getDataOrder(params).then(r=>{
        console.log('res getDataOrder', r)
        this.orders = r.data.data
      }).catch(e=>{
        console.log(e)
      })
    }
  },
}
</script>

<style scoped>
.widget-rounded-circle{
  border: 1px solid lightgray;
}
.table-hover tbody tr:hover{
  background-color: white;
}
table td h5{
  color: black;
}
</style>
