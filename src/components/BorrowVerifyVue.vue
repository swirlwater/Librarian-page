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
                    title: '借出时间',
                    key: 'lendTime',
                    render: (h, params) => {
                        if (params.row.lendTime == null) {
                            return h(Text, null, {
                                default() {
                                    return '--'
                                }
                            })
                        } else {
                            return h(Text, null, {
                                default() {
                                    return params.row.lendTime
                                }
                            })
                        }
                    }
                },
                {
                    title: '归还时间',
                    key: 'repaidTime',
                    render: (h, params) => {
                        if (params.row.repaidTime == null) {
                            return h(Text, null, {
                                default() {
                                    return '--'
                                }
                            })
                        } else {
                            return h(Text, null, {
                                default() {
                                    return params.row.repaidTime
                                }
                            })
                        }
                    }
                },
                {
                    title: '状态',
                    key: 'station',
                    render: (h, params) => {
                        if (params.row.station == 0) {
                            return h(Text, null, {
                                default() {
                                    return '申请借阅'
                                }
                            })
                        } else if (params.row.station == 1) {
                            return h(Text, null, {
                                default() {
                                    return '借阅中'
                                }
                            })
                        } else if (params.row.station == 2) {
                            return h(Text, null, {
                                default() {
                                    return '申请归还'
                                }
                            })
                        } else {
                            return h(Text, null, {
                                default() {
                                    return '已归还'
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
                        if (params.row.station == 0 || params.row.station == 2) {
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
                                        return '同意'
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
            total: 1,
        }
    },
    methods: {
        //跳转到修改页面
        toUpdate() {
            this.$router.push('/main/borrowManage')
        },
        //同意
        agree(index) {
            this.$Modal.confirm({
                content: `您是否同意该申请？`,
                onOk: () => {
                    this.$axios.get('/borrow/agree', {
                        params: {
                            id: this.data[index].id,
                            station: this.data[index].station
                        }
                    }).then(successResponse => {
                        this.$Message.success(successResponse.data.message)
                    }).catch(failResponse => {
                        this.$Message.error(failResponse.data.message)
                    })
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel')
                }
            })
        },
        //撤销用户申请
        cancel(index) {
            this.$Modal.confirm({
                content: `您是否确认撤销该申请？`,
                onOk: () => {
                    this.$axios.get('/borrow/cancel', {
                        params: {
                            id: this.data[index].id
                        }
                    }).then(successResponse => {
                        this.$Message.success(successResponse.data.message)
                    }).catch(failResponse => {
                        console.log(failResponse)
                    })
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel')
                }
            })
        },
        query(username, bookName, author, currentPage) {
            //发送查询借阅请求
            this.$axios.get('/borrow/query', {
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