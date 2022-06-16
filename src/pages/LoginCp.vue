<template>
  <div class="login-page">
    <div class="login-box">
      <!-- /.login-logo -->
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <a href="javascript:void(0)" class="h1"><b>VPS</b> </a>
        </div>
        <div class="card-body">

          <form>
            <div class="input-group mb-3">
              <input v-model="email" type="email" class="form-control" placeholder="Email">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input v-model="password" type="password" class="form-control" placeholder="Password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
<!--            <div class="row">-->
<!--              <div class="col-8">-->
<!--                <div class="icheck-primary">-->
<!--                  <input type="checkbox" id="remember">-->
<!--                  <label for="remember">-->
<!--                    Remember Me-->
<!--                  </label>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="col-4">-->
<!--                <button type="submit" class="btn btn-primary btn-block">Sign In</button>-->
<!--              </div>-->
<!--            </div>-->
          </form>

          <div class="social-auth-links text-center mt-2 mb-3">
            <a @click="handleSubmitLogin()" class="btn btn-block btn-primary">
              Sign In
            </a>
<!--            <a href="#" class="btn btn-block btn-danger">-->
<!--              <i class="fab fa-google-plus mr-2"></i> Sign in using Google+-->
<!--            </a>-->
          </div>
          <!-- /.social-auth-links -->

<!--          <p class="mb-1">-->
<!--            <a href="forgot-password.html">I forgot my password</a>-->
<!--          </p>-->
<!--          <p class="mb-0">-->
<!--            <a href="register.html" class="text-center">Register a new membership</a>-->
<!--          </p>-->
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "LoginCp",
  data(){
    return{
      email : '',
      password : '',
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
        if (res.status == 200 && res.data.success){
          this.$router.push('/');
        }else{
          alert('Login Failed !')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
