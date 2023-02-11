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
        <Button icon="ios-add" @click="add()">添加订单</Button>
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
                    title: '发起时间',
                    key: 'launchTime'
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
            addlaunchTime: '',
            addStation: ''
        }
    },
    methods: {
        //修改订单信息
        update(index) {
            this.addUsername = this.data[index].username
            this.addBookName = this.data[index].bookName
            this.addAuthor = this.data[index].author
            this.addNum = this.data[index].num
            this.addLaunchTime = this.data[index].launchTime
            this.addStation = this.data[index].station
            this.$Modal.confirm({
                onOk: () => {
                    this.$axios.put('/order/update', {
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
                            modelValue: '发起时间：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addLaunchTime,
                            placeholder: 'Please enter launchTime...',
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
        //删除订单信息
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
        },
        dateformat(args) {
            let dt = new Date()
            let y = dt.getFullYear()
            let m = dt.getMonth() + 1
            let d = dt.getDate()
            if (args.toLowerCase() === 'yyyy-MM-dd') {
                return `${y}-${m}-${d}`
            } else {
                let hh = dt.getHours()
                let mm = dt.getMinutes()
                let ss = dt.getSeconds()
                return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
            }
        },
        add() {
            //数据初始化
            this.addUsername = ''
            this.addBookName = ''
            this.addAuthor = ''
            this.addNum = 1
            this.addLaunchTime = this.dateformat('yyyy-MM-dd HH:mm:ss')
            //打开添加订单对话框
            this.$Modal.confirm({
                onOk: () => {
                    this.$axios.post('/borrow/add', {
                        username: this.addUsername,
                        bookName: this.addBookName,
                        author: this.addAuthor,
                        num: this.addNum,
                        launchTime: this.addLaunchTime,
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
                            modelValue: '发起时间：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: this.addLaunchTime,
                            placeholder: 'Please enter launchTime...',
                            'onInput': (event) => {
                                this.addLaunchTime = event.target.value;
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