<template>
    <Space split>
        <Link style="color: #515a6e;">审核</Link>
        <Link @click="toUpdate">修改</Link>
    </Space>
    <div class="space"></div>
    <Space>
        用户名:
        <Input v-model="username" placeholder="Enter username" style="width: auto">
        <template #prefix>
            <Icon type="ios-people" />
        </template>
        </Input>
        书名:
        <Input v-model="bookName" placeholder="Enter bookname" style="width: auto">
        <template #prefix>
            <Icon type="ios-book" />
        </template>
        </Input>
        作者:
        <Input v-model="author" placeholder="Enter author" style="width: auto">
        <template #prefix>
            <Icon type="ios-contact" />
        </template>
        <template #suffix>
            <Icon type="ios-search" @click="query(username, bookName, author, currentPage)" />
        </template>
        </Input>
    </Space>
    <div class="space"></div>
    <Table border :columns="columns" :data="data"></Table>
    <div class="space"></div>
    <Page v-model="currentPage" :total="total" />
</template>

<script>
import { Text } from 'view-ui-plus'
import { resolveComponent } from 'vue'

export default {
    data() {
        return {
            columns: [
                {
                    title: '用户名',
                    key: 'username'
                },
                {
                    title: '书名',
                    key: 'bookName'
                },
                {
                    title: '作者',
                    key: 'author'
                },
                {
                    title: '数量',
                    key: 'num'
                },
                {
                    title: '发起时间',
                    key: 'launchTime'
                },
                {
                    title: '状态',
                    key: 'station',
                    render: (h, params) => {
                        if (params.row.station == 0) {
                            return h(Text, null, {
                                default() {
                                    return '未处理'
                                }
                            })
                        } else {
                            return h(Text, null, {
                                default() {
                                    return '已处理'
                                }
                            })
                        }
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 180,
                    align: 'center',
                    render: (h, params) => {
                        if (params.row.station == 0) {
                            return h('div', [
                                h(resolveComponent('Button'), {
                                    type: 'primary',
                                    size: 'small',
                                    style: {
                                        marginRight: '5px'
                                    },
                                    onClick: () => {
                                        this.agree(params.index)
                                    }
                                }, {
                                    default() {
                                        return '处理'
                                    }
                                }),
                                h(resolveComponent('Button'), {
                                    type: 'error',
                                    size: 'small',
                                    onClick: () => {
                                        this.cancel(params.index)
                                    }
                                }, {
                                    default() {
                                        return '撤销'
                                    }
                                })
                            ]);
                        } else {
                            return h(Text, null, {
                                default() {
                                    return '--'
                                }
                            })
                        }
                    }
                }
            ],
            data: [

            ],
            currentPage: 1,
            username: '',
            bookName: '',
            author: '',
            total: 1
        }
    },
    methods: {
        //跳转到修改页面
        toUpdate() {
            this.$router.push('/main/orderManage')
        },
        //同意
        agree(index) {
            this.$Modal.confirm({
                content: `您是否同意给申请？`,
                onOk: () => {
                    this.$axios.get('/order/agree', {
                        params: {
                            id: this.data[index].id,
                            station: this.data[index].station
                        }
                    }).then(successResponse => {
                        this.$Message.success(successResponse.data.message)
                    }).catch(failResponse => {
                        this.$Message.error(failResponse)
                    })
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel')
                }
            })
        },
        //撤销
        cancel(index) {
            this.$Modal.confirm({
                content: `您是否撤销该申请？`,
                onOk: () => {
                    this.$axios.get('/order/cancel', {
                        params: {
                            id: this.data[index].id
                        }
                    }).then(successResponse => {
                        this.$Message.success(successResponse.data.message)
                    }).catch(failResponse => {
                        this.$Message.error(failResponse)
                    })
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel')
                }
            })
        },
        //查询订单
        query(username, bookName, author, currentPage) {
            //发送查询订单请求
            this.$axios.get('/order/query', {
                params: {
                    username: username,
                    bookName: bookName,
                    author: author,
                    currentPage: currentPage
                }
            }).then(successResponse => {
                this.data = successResponse.data.object.records
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