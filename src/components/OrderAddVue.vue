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
        <Button icon="ios-cart" @click="add()">发起订单</Button>
    </Space>
    <div class="space"></div>
    <Table border :columns="columns" :data="data"></Table>
    <div class="space"></div>
    <Page v-model="currentPage" :total="total" />
</template>

<script>
import { Input, Text } from 'view-ui-plus'
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
                    render: (h,params)=>{
                        if(params.row.station=='0'){
                            return h(Text,{},{default(){return '审核中'}})
                        }
                    }
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
            currentPage: 1,
            bookName: '',
            author: '',
            total: 1,
            addBookName: '',
            addAuthor: '',
            addPress: '',
            addContent: '',
            addNum: 1,
            addLaunchTime: ''
        }
    },
    methods: {
        //修改图书信息
        update(index) {
            this.addBookName = this.data[index].bookName
            this.addAuthor = this.data[index].author
            this.addPress = this.data[index].press
            this.addContent = this.data[index].content
            this.addNum = this.data[index].num
            this.$Modal.confirm({
                onOk: () => {
                    this.$axios.put('/order/update', {
                        id: this.data[index].id,
                        bookName: this.addBookName,
                        author: this.addAuthor,
                        press: this.addPress,
                        content: this.addContent,
                        num: this.addNum
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
                            modelValue: '书名：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addBookName,
                            placeholder: 'Please enter bookname...',
                            'onInput': (event) => {
                                this.addBookName = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '作者：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addAuthor,
                            placeholder: 'Please enter author...',
                            'onInput': (event) => {
                                this.addAuthor = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '出版社：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addPress,
                            placeholder: 'Please enter press...',
                            'onInput': (event) => {
                                this.addPress = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '描述：'
                        }),
                        h(Input, {
                            type: 'textarea',
                            size: "default",
                            modelValue: this.addContent,
                            placeholder: 'Please enter content...',
                            'onInput': (event) => {
                                this.addContent = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '数量：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addNum,
                            placeholder: 'Please enter number...',
                            'onInput': (event) => {
                                this.addNum = event.target.value;
                            }
                        }),
                    ]
                }
            })
        },
        //删除订单
        remove(index) {
            this.$axios.delete('/order/delete', {
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
        query(bookName, author, currentPage) {
            //发送查询订单请求
            this.$axios.get('/order/queryWithUser', {
                params: {
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
        },
        add() {
            //数据初始化
            this.addBookName = ''
            this.addAuthor = ''
            this.addPress = ''
            this.addContent = ''
            this.addNum = 1
            this.addLaunchTime = this.dateformat('yyyy-MM-dd HH:mm:ss')
            //打开发起订单对话框
            this.$Modal.confirm({
                onOk: () => {
                    this.$axios.post('/order/add', {
                        bookName: this.addBookName,
                        author: this.addAuthor,
                        press: this.addPress,
                        content: this.addContent,
                        num: this.addNum,
                        launchTime: this.addLaunchTime
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
                            modelValue: '书名：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addBookName,
                            placeholder: 'Please enter bookname...',
                            'onInput': (event) => {
                                this.addBookName = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '作者：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addAuthor,
                            placeholder: 'Please enter author...',
                            'onInput': (event) => {
                                this.addAuthor = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '出版社：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addPress,
                            placeholder: 'Please enter press...',
                            'onInput': (event) => {
                                this.addPress = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '描述：'
                        }),
                        h(Input, {
                            type: 'textarea',
                            size: "default",
                            modelValue: this.addContent,
                            placeholder: 'Please enter content...',
                            'onInput': (event) => {
                                this.addContent = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '数量：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addNum,
                            placeholder: 'Please enter number...',
                            'onInput': (event) => {
                                this.addNum = event.target.value;
                            }
                        }),
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
