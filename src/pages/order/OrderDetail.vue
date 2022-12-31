<template>
  <div class="container-fluid">

    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">

        </div>
      </div>
    </div>
    <!-- end page title -->

    <div class="row">
      <div class="col-12">
        <div class="card-box">
          <!-- Logo & title -->
          <div class="clearfix">
            <div class="float-left">
              <div class="auth-logo">
                <div class="logo logo-dark">
                  <span class="logo-lg">
                    <img src="" alt="" height="22">
                  </span>
                </div>

                <div class="logo logo-light">
                  <span class="logo-lg">
                    <img src="" alt="" height="22">
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="order" class="row">
            <div class="col-md-6">
              <div class="mt-3">
                <p>Mã đơn hàng : <b style="font-size: 20px">{{ order.sku }}</b></p>
                <p v-if="order.voucher_id != null">Mã giảm giá : <b>{{ order.voucher_id.code }}</b></p>
                <p v-if="order.voucher_id != null">Giảm trừ : <b> <span class="badge badge-danger">-{{
                    order.voucher_id.percent_value
                }} %</span></b></p>
              </div>

            </div><!-- end col -->
            <div class="col-md-4 offset-md-2">
              <div class="mt-3 float-right">
                <p class="m-b-10"><strong>Trạng Thái : </strong> <span class="float-right">
                    <span v-if="order.status == 1" class="badge badge-primary">NEW</span>
                    <span v-if="order.status == 2" class="badge badge-info">PROCESSING</span>
                    <span v-if="order.status == 3" class="badge badge-success">SUCCESS</span>
                    <span v-if="order.status == 4" class="badge badge-danger">CANCEL</span>
                  </span></p>

                <p class="m-b-10"><strong>Ngày tạo : </strong> <span class="float-right"> &nbsp;&nbsp;&nbsp;&nbsp; {{
                    convertMoment(order.created_at)
                }}</span></p>
                <p class="m-b-10"><strong>Ngày cập nhật : </strong> <span class="float-right"> &nbsp;&nbsp;&nbsp;&nbsp;
                    {{ convertMoment(order.updated_at) }}</span></p>
              </div>
            </div><!-- end col -->
          </div>
          <!-- end row -->

          <div v-if="order" class="row mt-3">
            <div class="col-sm-6">
              <h6>Thông tin người nhận</h6>
              <address>
                <b>Name</b> : {{ order.customer.name }}<br>
                <b>Phone</b> : {{ order.customer.phone }}<br>
                <b>Email</b> : {{ order.customer.email }}<br>
                <b>Address</b> : {{ order.customer.address }}<br>
              </address>
            </div> <!-- end col -->

            <div class="col-sm-6">
              <h6>Hình thức thanh toán</h6>
              <address>
                - Giao hàng toàn quốc<br>
                - Thanh toán khi nhận hàng<br>
                <br>
              </address>
            </div> <!-- end col -->
          </div>
          <!-- end row -->

          <div v-if="order" class="row">
            <div class="col-12">
              <div class="table-responsive">
                <table class="table mt-4 table-centered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tên sản phẩm</th>
                      <th style="width: 10%">Màu</th>
                      <th style="width: 10%">Size</th>
                      <th style="width: 10%">Số lượng</th>
                    </tr>
                  </thead>
                  <tbody v-if="order">
                    <tr v-for="(pr, i) in JSON.parse(order.products)">
                      <td>{{ i + 1 }}</td>
                      <td>
                        <b>{{ pr.product.name }}</b> <br>
                      </td>
                      <td>{{ pr.attribute.color }}</td>
                      <td>{{ pr.attribute.size }}</td>
                      <td>{{ pr.qty }}</td>
                    </tr>

                  </tbody>
                </table>
              </div> <!-- end table-responsive -->
            </div> <!-- end col -->
          </div>
          <!-- end row -->

          <div v-if="order" class="row">
            <div class="col-sm-6">
              <div class="clearfix pt-5">
                <h6 class="text-muted">Ghi chú:</h6>

                <small class="text-muted">
                  {{ order.note }}
                </small>
              </div>
            </div> <!-- end col -->
            <div class="col-sm-6">
              <div class="float-right" style="display: flex;align-items: baseline">
                <span style="display: block;padding-right: 20px">Tổng :</span>
                <h3 style="color:black"> {{ convertCurrency(order.total_price) }}</h3>
              </div>
              <div class="clearfix"></div>
            </div> <!-- end col -->
          </div>
          <!-- end row -->

          <div class="mt-4 mb-1">
            <div>

            </div>
            <div v-if="order" class="text-right d-print-none">
              <h5 style="color:black;margin-bottom: 20px">Cập nhật trạng thái đơn hàng</h5>
              <a v-if="order.status != 1" @click="changeSTT(1)" href="#"
                class="btn btn-primary waves-effect waves-light">NEW</a>
              <a v-if="order.status != 2" @click="changeSTT(2)" href="#"
                class="btn btn-info waves-effect waves-light">PROCESSING</a>
              <a v-if="order.status != 3" @click="changeSTT(3)" href="#"
                class="btn btn-success waves-effect waves-light">SUCCESS</a>
              <a v-if="order.status != 4" @click="changeSTT(4)" href="#"
                class="btn btn-danger waves-effect waves-light">CANCEL</a>
            </div>
          </div>
        </div> <!-- end card-box -->
      </div> <!-- end col -->
    </div>
    <!-- end row -->

  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";

export default {
  name: "OrderDetail",
  data() {
    return {
      name: "",
      order: null,
      is_active: 0
    }
  },
  created() {
    this.getOrderDetail(this.$route.params.id).then(r => {
      this.order = r.data.data
    })
  },
  methods: {
    ...mapActions(['getOrderDetail', 'updateSTTOrder']),
    convertMoment(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    convertCurrency(x) {
      return x.toLocaleString('vi-VN') + ' đ'
    },
    changeSTT(stt) {
      this.updateSTTOrder({
        id: parseInt(this.$route.params.id),
        status: parseInt(stt)
      }).then(r => {
        if (r.data.success) {
          alert('Cập nhật đơn hàng thành công !')
          this.$router.push('/order/list')
        } else {
          alert('Cập nhật đơn hàng không thành công !')
        }
      }).catch(e => {
        console.log('e', e)
      })
    },
  }
}
</script>

<style scoped>

</style>
