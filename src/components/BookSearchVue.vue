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
            <Icon type="ios-search" @click="press(bookName, author, currentPage)" />
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
                    title: '描述',
                    key: 'content'
                },
                {
                    title: '出版社',
                    key: 'press'
                },
                {
                    title: '库存',
                    key: 'num'
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
                                    this.show(params.index)
                                }
                            }, {
                                default() {
                                    return '借阅'
                                }
                            })
                        ]);
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
            //打开对话框
            this.$Modal.confirm({
                content: `您是否申请借阅？`,
                onOk: () => {
                    this.$axios.get('/borrow/requestBorrow', {
                        params:{
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
            this.data.splice(index, 1);
        },
        press(bookName, author, currentPage) {
            this.$axios.get('/book/query', {
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
