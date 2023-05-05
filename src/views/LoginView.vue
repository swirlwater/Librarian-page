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
        <a href="#" @click="updatePassword">忘记密码</a>
      </div>
      <Submit />
    </Login>
  </div>
</template>

<script>
import TitleVue from '@/components/TitleVue.vue'
import QueryString from 'qs'
import { Icon, Input, Space, Text } from 'view-ui-plus'

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
              sessionStorage.setItem('token', successResponse.data.object["token"])
              sessionStorage.setItem('user',JSON.stringify(successResponse.data.object['user']))
              sessionStorage.setItem('permissions',JSON.stringify(successResponse.data.object['permissions']))
              this.$store.dispatch('setUser', successResponse.data.object['user'])
              this.$store.dispatch('setPermissions', successResponse.data.object['permissions'])
              this.$router.push('/main')
            }
          }).catch(failResponse => {
            this.$Message.error(failResponse)
            console.log(failResponse);
          })
      }
    },
    toRegister() {
      this.$router.push('/register')
    },
    updatePassword() {
      let username = ''
      let lastPassword = ''
      let newPassword = ''
      this.$Modal.confirm({
        onOk: () => {
          this.$axios({
            method: 'put',
            url: '/user/updatePassword',
            data: QueryString.stringify({
              username: username,
              lastPassword: lastPassword,
              newPassword: newPassword
            })
          }).then(successResponse => {
            this.$Message.succecc(successResponse.data.message)
          }).catch(failResponse => {
            this.$Message.error(failResponse)
          })
        },
        render: (h) => {
          return [
            h(Space, null, {
              default() {
                return [
                  h(Text, {
                    modelValue: '用户名：'
                  }),
                  h(Input, {
                    modelValue: username,
                    'onInput': (event) => {
                      username = event.target.value;
                    }
                  }, {
                    prepend() {
                      return h(Icon, {
                        type: 'ios-person-outline'
                      }, {
                        default() {
                          return ''
                        }
                      })
                    }
                  })
                ]
              }
            }),
            h(Space, null, {
              default() {
                return [
                  h(Text, {
                    modelValue: '原密码：'
                  }),
                  h(Input, {
                    type: 'password',
                    modelValue: lastPassword,
                    'onInput': (event) => {
                      lastPassword = event.target.value;
                    }
                  }, {
                    prepend() {
                      return h(Icon, {
                        type: 'ios-lock-outline'
                      }, {
                        default() {
                          return ''
                        }
                      })
                    }
                  })
                ]
              }
            }),
            h(Space, null, {
              default() {
                return [
                  h(Text, {
                    modelValue: '新密码：'
                  }),
                  h(Input, {
                    type: 'password',
                    modelValue: newPassword,
                    'onInput': (event) => {
                      newPassword = event.target.value;
                    }
                  }, {
                    prepend() {
                      return h(Icon, {
                        type: 'ios-lock-outline'
                      }, {
                        default() {
                          return ''
                        }
                      })
                    }
                  })
                ]
              }
            })
          ]
        }
      })
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
