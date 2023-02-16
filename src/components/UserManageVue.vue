<template>
    <Space>
        用户名:
        <Input v-model="username" placeholder="Enter username" style="width: auto">
        <template #prefix>
            <Icon type="ios-contact" />
        </template>
        <template #suffix>
            <Icon type="ios-search" @click="query(username)" />
        </template>
        </Input>
    </Space>
    <div class="space"></div>
    <Table border :columns="columns" :data="data"></Table>
    <div class="space"></div>
<Page v-model="currentPage" :total="total" />
</template>

<script>
import QueryString from 'qs';
import { Checkbox, CheckboxGroup, Text } from 'view-ui-plus'
import { resolveComponent } from 'vue'

export default {
    mounted() {
        this.$axios.get("/role/queryAll")
            .then(successResponse => {
                this.roles = successResponse.data.object
                for (let i = 0; i < this.roles.length; i++) {
                    this.rolesMap[this.roles[i]] = false
                }
            }).catch(failResponse => {
                console.log(failResponse)
            })
    },
    data() {
        return {
            columns: [
                {
                    title: '用户名',
                    key: 'username'
                },
                {
                    title: '角色',
                    key: 'roles'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 180,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h(resolveComponent('Button'), {
                                type: 'primary',
                                size: 'small',
                                style: {
                                    marginRight: '5px'
                                },
                                onClick: () => {
                                    this.update(params.index)
                                }
                            }, {
                                default() {
                                    return '修改'
                                }
                            })
                        ]);
                    }
                }
            ],
            data: [

            ],
            username: '',
            currentPage: 1,
            total: 1,
            roles: [],
            rolesMap: {},
            updateRoles:[]
        }
    },
    methods: {
        //修改用户角色
        update(index) {
            this.updateRoles=[]
            for (let k = 0; k < this.data[index].roles.length; k++) {
                this.updateRoles.push(this.data[index].roles[k])
            }
            for (let i = 0; i < this.roles.length; i++) {
                this.rolesMap[this.roles[i]] = false
            }
            this.$Modal.confirm({
                onOk: () => {
                    if(this.updateRoles.length==0){
                        this.updateRoles.push('');
                    }
                    this.$axios({
                        method: 'put',
                        url: '/user/updateRole',
                        data: QueryString.stringify({
                            id: this.data[index].id,
                            roles: this.updateRoles
                        }, { arrayFormat: 'repeat' })
                    }).then(() => {
                        this.$Message.success('Updated success')
                    }).catch(() => {
                        this.$Message.error('Updated fail')
                    })
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel');
                },
                //添加对话框组件
                render: (h) => {
                    return [
                        h(Text, {
                            modelValue: '用户名：'
                        }),
                        h('div', {
                            modelValue: ''
                        }),
                        h(Text, {
                            size: "default",
                            modelValue: this.data[index].username,
                        }),
                        h('div', {
                            modelValue: ''
                        }),
                        h(Text, {
                            modelValue: '角色：'
                        }),
                        h(CheckboxGroup, {
                            modelValue: this.updateRoles
                        }, () => {
                            let checkbox = []
                            for (let i = 0; i < this.roles.length; i++) {
                                if (this.updateRoles !== undefined && this.updateRoles.length >= 0) {
                                    if (this.updateRoles.includes(this.roles[i])) {
                                        this.rolesMap[this.roles[i]] = true
                                    } else {
                                        this.rolesMap[this.roles[i]] = false
                                    }
                                }
                                checkbox.push(
                                    h(Checkbox, {
                                        label: this.roles[i],
                                        'onChange': (event) => {
                                            if (this.rolesMap[event.target.value]) {
                                                for (let j = 0; j < this.updateRoles.length; j++) {
                                                    if (this.updateRoles[j] == event.target.value) {
                                                        this.updateRoles.splice(j, 1);
                                                    }
                                                }
                                                this.rolesMap[event.target.value] = false
                                            } else {
                                                this.updateRoles.push(event.target.value)
                                                this.rolesMap[event.target.value] = true
                                            }
                                        }
                                    })
                                )
                            }
                            return checkbox
                        })
                    ]
                }
            })
        },
        //删除用户
        remove(index) {
            this.$axios.delete('/user/delete', {
                params: {
                    ids: this.data[index].id
                }
            }).then(successResponse => {
                this.$Message.success(successResponse.data.message)
            }).catch(failResponse => {
                this.$Message.error(failResponse.data.message)
            })
            this.data.splice(index, 1);
        },
        query(username) {
            //发送查询角色请求
            this.$axios.get('/user/queryAll', {
                params: {
                    username: username,
                    currentPage: this.currentPage
                }
            }).then(successResponse => {
                this.data = successResponse.data.object
                this.total = successResponse.data.object.total
            }).catch(failResponse => {
                console.log(failResponse)
            })
        }
    }
}
</script>
<style>
.space {
    height: 30px;
}
</style>
