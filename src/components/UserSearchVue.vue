<template>
    <Space direction="vertical">
        <Space>
            用户名：
            <Title v-model="username" :level="5" style="margin: 0" />
        </Space>
        <Space>
            昵称：
            <Paragraph v-model="nickname" editable />
        </Space>
        <Space>
            邮箱：
            <Paragraph v-model="email" editable />
        </Space>
        <Space>
            电话：
            <Paragraph v-model="phone" editable />
        </Space>
        <Space>
            性别：
            <RadioGroup v-model="gender">
                <Radio label="male">男</Radio>
                <Radio label="femail">女</Radio>
            </RadioGroup>
        </Space>
        <Space>
            <Button @click="handleSubmit">提交</Button>
            <Button @click="updatePassword">修改密码</Button>
        </Space>
    </Space>
</template>

<script>
import QueryString from 'qs'
import { Icon, Input, Space, Text } from 'view-ui-plus'

export default {
    mounted() {
        this.user = this.$store.getters.getUser
        this.username = this.user.username
        this.nickname = this.user.nickname
        this.email = this.user.email
        this.phone = this.user.phone
        this.gender = this.user.gender
    },
    data() {
        return {
            user: {},
            username: '',
            nickname: '',
            email: '',
            phone: '',
            gender: ''
        }
    },
    methods: {
        handleSubmit() {
            this.$Modal.confirm({
                content: '您确认修改信息吗？',
                onOk: () => {
                    this.$axios.put('/user/update', {
                        username: this.username,
                        nickname: this.nickname,
                        email: this.email,
                        phone: this.phone,
                        gender: this.gender
                    }).then(() => {
                        this.$Message.success('Updated success')
                        this.$axios.get('/user/query')
                            .then(successResponse => {
                                this.username = successResponse.data.object.username
                                this.nickname = successResponse.data.object.nickname
                                this.email = successResponse.data.object.email
                                this.phone = successResponse.data.object.phone
                                this.gender = successResponse.data.object.gender
                            }).catch(failResponse => {
                                this.$Message.error(failResponse)
                            })
                    }).catch(() => {
                        this.$Message.error('Updated fail')
                    })
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel');
                }
            })
        },
        updatePassword() {
            let username = this.username
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

