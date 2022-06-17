<template>
  <div class="account-pages mt-5 mb-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-pattern">

            <div class="card-body p-4">

              <div class="text-center w-75 m-auto">
                <div class="auth-logo">
                  <a href="" class="logo logo-dark text-center">
                                            <span class="logo-lg">
                                                <img src="../assets/images/logo-dark.png" alt="" height="22">
                                            </span>
                  </a>

                  <a href="index.html" class="logo logo-light text-center">
                                            <span class="logo-lg">
                                                <img src="../assets/images/logo-light.png" alt="" height="22">
                                            </span>
                  </a>
                </div>
                <p class="text-muted mb-4 mt-3">Enter your email address and password to access admin panel.</p>
              </div>

              <form action="#">

                <div class="form-group mb-3">
                  <label for="emailaddress">Email address</label>
                  <input v-model="email" class="form-control" type="email" id="emailaddress" required="" placeholder="Enter your email">
                </div>

                <div class="form-group mb-3">
                  <label for="password">Password</label>
                  <div class="input-group input-group-merge">
                    <input v-model="password" type="password" id="password" class="form-control" placeholder="Enter your password">
                  </div>
                </div>

                <div class="form-group mb-3">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkbox-signin" checked="">
                    <label class="custom-control-label" for="checkbox-signin">Remember me</label>
                  </div>
                </div>

                <div class="form-group mb-0 text-center">
                  <button class="btn btn-primary btn-block" type="button" @click="handleSubmitLogin()"> Log In</button>
                </div>

              </form>

              <div class="text-center">
                <h5 class="mt-3 text-muted">Sign in with</h5>
                <ul class="social-list list-inline mt-3 mb-0">
                  <li class="list-inline-item">
                    <a href="javascript: void(0);" class="social-list-item border-primary text-primary"><i
                      class="mdi mdi-facebook"></i></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="javascript: void(0);" class="social-list-item border-danger text-danger"><i
                      class="mdi mdi-google"></i></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="javascript: void(0);" class="social-list-item border-info text-info"><i
                      class="mdi mdi-twitter"></i></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="javascript: void(0);" class="social-list-item border-secondary text-secondary"><i
                      class="mdi mdi-github"></i></a>
                  </li>
                </ul>
              </div>

            </div> <!-- end card-body -->
          </div>
          <!-- end card -->

          <div class="row mt-3">
            <div class="col-12 text-center">
              <p><a href="auth-recoverpw.html" class="text-white-50 ml-1">Forgot your password?</a></p>
              <p class="text-white-50">Don't have an account? <a href="auth-register.html" class="text-white ml-1"><b>Sign
                Up</b></a></p>
            </div> <!-- end col -->
          </div>
          <!-- end row -->

        </div> <!-- end col -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "LoginCp",
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapActions(['login']),
    handleSubmitLogin(e) {
      let data = {
        email: this.email,
        password: this.password
      }
      this.login(data).then(res => {
        if (res.status == 200 && res.data.success) {
          this.$router.push('/');
        } else {
          alert('Login Failed !')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
