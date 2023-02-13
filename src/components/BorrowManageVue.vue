<template>
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
        <Button icon="ios-add" @click="add()">添加借阅</Button>
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
                    key: 'lendTime'
                },
                {
                    title: '归还时间',
                    key: 'repaidTime'
                },
                {
                    title: '状态',
                    key: 'station'
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
            username: '',
            bookName: '',
            author: '',
            total: 1,
            addUsername: '',
            addBookName: '',
            addAuthor: '',
            addNum: 1,
            addLendTime: '',
            addRepaidTime: '',
            addStation: ''
        }
    },
    methods: {
        //修改借阅信息
        update(index) {
            this.addUsername = this.data[index].username
            this.addBookName = this.data[index].bookName
            this.addAuthor = this.data[index].author
            this.addNum = this.data[index].num
            this.addLendTime = this.data[index].lendTime
            this.addRepaidTime = this.data[index].repaidTime
            this.addStation = this.data[index].station
            this.$Modal.confirm({
                onOk: () => {
                    this.$axios.put('/borrow/update', {
                        id: this.data[index].id,
                        username: this.addUsername,
                        bookName: this.addBookName,
                        author: this.addAuthor,
                        num: this.addNum,
                        lendTime: this.addLendTime,
                        repaidTime: this.addRepaidTime
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
                        h(Input, {
                            size: "default",
                            modelValue: this.addUsername,
                            placeholder: 'Please enter username...',
                            'onInput': (event) => {
                                this.addUsername = event.target.value;
                            }
                        }),
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
                            modelValue: '数量：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addNum,
                            placeholder: 'Please enter num...',
                            'onInput': (event) => {
                                this.addNum = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '借出时间：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addLendTime,
                            placeholder: 'Please enter lendTime...',
                            'onInput': (event) => {
                                this.addLendTime = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '归还时间：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addRepaidTime,
                            placeholder: 'Please enter repaidTime...',
                            'onInput': (event) => {
                                this.addRepaidTime = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '状态：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addStation,
                            placeholder: 'Please enter station...',
                            'onInput': (event) => {
                                this.addStation = event.target.value;
                            }
                        }),
                    ]
                }
            })
        },
        //删除借阅记录
        remove(index) {
            this.$axios.delete('/borrow/delete', {
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
        },
        add() {
            //数据初始化
            this.addUsername = ''
            this.addBookName = ''
            this.addAuthor = ''
            this.addNum = 1
            this.addLendTime = this.dateformat('yyyy-MM-dd HH:mm:ss')
            this.addRepaidTime = ''
            //打开添加借阅记录对话框
            this.$Modal.confirm({
                onOk: () => {
                    this.$axios.post('/borrow/add', {
                        username: this.addUsername,
                        bookName: this.addBookName,
                        author: this.addAuthor,
                        num: this.addNum,
                        lendTime: this.addLendTime,
                        repaidTime: this.addRepaidTime,
                        station: this.addStation
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
                            modelValue: '用户名：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addUsername,
                            placeholder: 'Please enter username...',
                            'onInput': (event) => {
                                this.addUsername = event.target.value;
                            }
                        }),
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
                            modelValue: '数量：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addNum,
                            placeholder: 'Please enter num...',
                            'onInput': (event) => {
                                this.addNum = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '借出时间：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addLendTime,
                            placeholder: 'Please enter lendTime...',
                            'onInput': (event) => {
                                this.addLendTime = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '归还时间：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addRepaidTime,
                            placeholder: 'Please enter repaidTime...',
                            'onInput': (event) => {
                                this.addRepaidTime = event.target.value;
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
.space {
    height: 30px;
}
</style>