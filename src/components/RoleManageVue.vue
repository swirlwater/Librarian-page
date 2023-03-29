<template>
    <Space>
        角色名:
        <Input v-model="name" placeholder="Enter rolename" style="width: auto">
        <template #prefix>
            <Icon type="ios-contact" />
        </template>
        <template #suffix>
            <Icon type="ios-search" @click="query(name)" />
        </template>
        </Input>
        <Button icon="ios-cart" @click="add()">添加角色</Button>
    </Space>
    <div class="space"></div>
    <Table border :columns="columns" :data="data"></Table>
    <div class="space"></div>
    <Page v-model="currentPage" :total="total" />
</template>

<script>
import QueryString from 'qs';
import { Checkbox, CheckboxGroup, Input, Text } from 'view-ui-plus'
import { resolveComponent } from 'vue'

export default {
    mounted() {
        this.$axios.get("/permission/queryAll")
            .then(successResponse => {
                this.permissions = successResponse.data.object
                for (let i = 0; i < this.permissions.length; i++) {
                    this.permissionsMap[this.permissions[i]] = false
                }
            }).catch(failResponse => {
                console.log(failResponse)
            })
    },
    data() {
        return {
            columns: [
                {
                    title: '角色名',
                    key: 'name'
                },
                {
                    title: '描述',
                    key: 'content'
                },
                {
                    title: '权限',
                    key: 'permissions'
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
                            }),
                            h(resolveComponent('Button'), {
                                type: 'error',
                                size: 'small',
                                onClick: () => {
                                    this.remove(params.index)
                                }
                            }, {
                                default() {
                                    return '删除'
                                }
                            })
                        ]);
                    }
                }
            ],
            data: [

            ],
            name: '',
            addName: '',
            addPermissions: [],
            addContent: '',
            currentPage: 1,
            total: 1,
            permissions: [],
            permissionsMap: {}
        }
    },
    methods: {
        //修改角色信息
        update(index) {
            this.addName = this.data[index].name
            this.addContent = this.data[index].content
            this.addPermissions=[]
            for(let k=0;k<this.data[index].permissions.length;k++){
                this.addPermissions.push(this.data[index].permissions[k])
            }
            for (let i = 0; i < this.permissions.length; i++) {
                this.permissionsMap[this.permissions[i]] = false
            }
            this.$Modal.confirm({
                onOk: () => {
                    if (this.addPermissions.length==0) {
                        this.addPermissions.push('')
                    }
                    this.$axios({
                        method: 'put',
                        url: '/role/update',
                        data: QueryString.stringify({
                            id: this.data[index].id,
                            name: this.addName,
                            content: this.addContent,
                            permissions: this.addPermissions
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
                            modelValue: '角色名：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addName,
                            placeholder: 'Please enter rolename...',
                            'onInput': (event) => {
                                this.addName = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '描述：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addContent,
                            placeholder: 'Please enter content...',
                            'onInput': (event) => {
                                this.addContent = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '权限：'
                        }),
                        h(CheckboxGroup, {
                            modelValue: this.addPermissions
                        }, () => {
                            let checkbox = []
                            for (let i = 0; i < this.permissions.length; i++) {
                                if (this.addPermissions.includes(this.permissions[i])) {
                                    this.permissionsMap[this.permissions[i]] = true
                                } else {
                                    this.permissionsMap[this.permissions[i]] = false
                                }
                                checkbox.push(
                                    h(Checkbox, {
                                        label: this.permissions[i],
                                        'onChange': (event) => {
                                            if (this.permissionsMap[event.target.value]) {
                                                for(let j=0;j<this.addPermissions.length;j++){
                                                    if(this.addPermissions[j]==event.target.value){
                                                        this.addPermissions.splice(j,1);
                                                    }
                                                }
                                                this.permissionsMap[event.target.value] = false
                                            } else {
                                                this.addPermissions.push(event.target.value)
                                                this.permissionsMap[event.target.value] = true
                                            }
                                            console.log(this.addPermissions);
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
        //删除角色
        remove(index) {
            this.$axios.delete('/role/delete', {
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
        query(name) {
            //发送查询角色请求
            this.$axios.get('/role/query', {
                params: {
                    name: name,
                    currentPage: this.currentPage
                }
            }).then(successResponse => {
                this.data = successResponse.data.object
                this.total = successResponse.data.object.total
            }).catch(failResponse => {
                console.log(failResponse)
            })
        },
        add() {
            //数据初始化
            this.addName = ''
            this.addContent = ''
            this.addPermissions = []
            for (let i = 0; i < this.permissions.length; i++) {
                this.permissionsMap[this.permissions[i]] = false
            }
            //打开添加角色对话框
            this.$Modal.confirm({
                onOk: () => {
                    this.$axios({
                        method: 'post',
                        url: '/role/add',
                        data: QueryString.stringify({
                            name: this.addName,
                            content: this.addContent,
                            permissions: this.addPermissions
                        }, { arrayFormat: 'repeat' })
                    }).then(() => {
                        this.$Message.success('Added success');
                    }).catch(() => {
                        this.$Message.error('Added fail')
                    })
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel');
                },
                //添加对话框组件
                render: (h) => {
                    return [
                        h(Text, {
                            modelValue: '角色名：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addName,
                            placeholder: 'Please enter name...',
                            'onInput': (event) => {
                                this.addName = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '描述：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addContent,
                            placeholder: 'Please enter content...',
                            'onInput': (event) => {
                                this.addContent = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '权限：'
                        }),
                        h(CheckboxGroup, {
                            modelValue: this.addPermissions
                        }, () => {
                            let checkbox = []
                            for (let i = 0; i < this.permissions.length; i++) {
                                checkbox.push(
                                    h(Checkbox, {
                                        label: this.permissions[i],
                                        'onChange': () => {
                                            if (this.permissionsMap[this.permissions[i]]) {
                                                this.addPermissions.pop(this.permissions[i])
                                                this.permissionsMap[this.permissions[i]] = false
                                            } else {
                                                this.addPermissions.push(this.permissions[i])
                                                this.permissionsMap[this.permissions[i]] = true
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
        }
    }
}
</script>
<style>
.space {
    height: 30px;
}
</style>
