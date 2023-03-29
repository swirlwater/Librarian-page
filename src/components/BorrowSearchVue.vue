<template>
    <Space>
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
            <Icon type="ios-search" @click="query(bookName, author, currentPage)" />
        </template>
        </Input>
    </Space>
    <div class="space"></div>
    <Table border :columns="columns" :data="data"></Table>
    <div class="space"></div>
    <Page v-model="currentPage" :total="total" />
</template>

<script>
import { resolveComponent } from 'vue'
import { Text } from 'view-ui-plus'

export default {
    data() {
        return {
            columns: [
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
                    title: '借阅时间',
                    key: 'lendTime',
                    render: (h, params) => {
                        if (params.row.lendTime == null || params.row.lendTime == '') {
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
                        if (params.row.repaidTime == null || params.row.repaidTime == '') {
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
                        } else if (params.row.station == 3) {
                            return h(Text, null, {
                                default() {
                                    return '已归还'
                                }
                            })
                        } else {
                            return h(Text, null, {
                                default() {
                                    return '已撤销'
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
                            return h(resolveComponent('Button'), {
                                type: 'error',
                                size: 'small',
                                style: {
                                    marginRight: '5px'
                                },
                                onClick: () => {
                                    this.cancel(params.index)
                                }
                            }, {
                                default() {
                                    return '撤销'
                                }
                            })
                        } else if (params.row.station == 1) {
                            return h(resolveComponent('Button'), {
                                type: 'primary',
                                size: 'small',
                                style: {
                                    marginRight: '5px'
                                },
                                onClick: () => {
                                    this.show(params.index)
                                }
                            }, {
                                default() {
                                    return '归还'
                                }
                            })
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
            author: '',
            bookName: '',
            total: 1
        }
    },
    methods: {
        show(index) {
            this.$Modal.confirm({
                content: `您是否申请归还图书？`,
                onOk: () => {
                    this.$axios.get('/borrow/requestRepaid', {
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
        //撤销申请
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
        remove(index) {
            this.$Modal.confirm({
                content: `您是否确认删除该记录？`,
                onOk: () => {
                    this.$axios.delete('/borrow/delete', {
                        params: {
                            ids: this.data[index].id
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
            this.data.splice(index, 1)
        },
        query(bookName, author, currentPage) {
            this.$axios.get('/borrow/queryWithUser', {
                params: {
                    bookName: bookName,
                    author: author,
                    currentPage: currentPage
                }
            })
                .then(successResponse => {
                    this.data = successResponse.data.object.records
                    this.total = successResponse.data.object.total
                })
                .catch(failResponse => {
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
