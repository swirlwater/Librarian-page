<template>
  <TitleVue />
  <div id="label">
    登录
    <Divider type="vertical" />
    <a href="#" @click="toRegister">注册</a>
  </div>
  <div class="demo-login">
    <Login @on-submit="handleSubmit">
      <UserName name="username" />
      <Password name="password" />
      <div class="demo-auto-login">
        <Checkbox v-model="autoLogin" size="large">自动登录</Checkbox>
        <a>忘记密码</a>
      </div>
      <Submit />
    </Login>
  </div>
</template>

<script>
import TitleVue from '@/components/TitleVue.vue'

export default {
  name: 'LoginView',
  data() {
    return {
      autoLogin: true
    }
  },
  components: {
    TitleVue
  },
  methods: {
    handleSubmit(valid, { username, password }) {
      if (valid) {
        this.$axios.post('/user/login', {
          username: username,
          password: password
        })
          .then(successResponse => {
            if (successResponse.data.code == 200) {
              localStorage.username = username
              localStorage.password = password
              localStorage.setItem('token',successResponse.data.object["token"])
              this.$router.push('/main')
            }
          })
          .catch(failResponse => {
            this.$Message.error(failResponse.response.data.message)
          })
      }
    },
    toRegister() {
      this.$router.push('/register')
    }
  }
}
</script>
<style>
#label {
  text-align: center;
  height: 30px;
}

.demo-login {
  width: 400px;
  margin: 0 auto !important;
}

.demo-auto-login {
  margin-bottom: 24px;
  text-align: left;
}

.demo-auto-login a {
  float: right;
}
</style>
