<template>
    <Space split>
        <Link @click="toVerify">审核</Link>
        <Link style="color: #515a6e;">修改</Link>
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
        <Button icon="ios-add" @click="add()">添加借阅</Button>
    </Space>
    <div class="space"></div>
    <Table border :columns="columns" :data="data"></Table>
    <div class="space"></div>
    <Page v-model="currentPage" :total="total" @on-change="changePage"/>
</template>

<script>
import { DatePicker, Dropdown, DropdownItem, DropdownMenu, Icon, Input, Space, Text } from 'view-ui-plus'
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
        }
    },
    methods: {
        changePage(page){
            this.query(this.username,this.bookName,this.author,page)
        },
        //跳转到审核页面
        toVerify(){
            this.$router.push('/main/borrowVerify')
        },
        //修改借阅信息
        update(index) {
            let username = this.data[index].username
            let bookName = this.data[index].bookName
            let author = this.data[index].author
            let num = this.data[index].num
            let lendTime = this.data[index].lendTime
            let repaidTime = this.data[index].repaidTime
            let station = this.data[index].station
            let dropdown = ''
            if (station == 0) {
                dropdown = '申请借阅'
            } else if (station == 1) {
                dropdown = '借阅中'
            } else if (station == 2) {
                dropdown = '申请归还'
            } else {
                dropdown = '已归还'
            }
            this.$Modal.confirm({
                onOk: () => {
                    this.$axios.put('/borrow/update', {
                        id: this.data[index].id,
                        username: username,
                        bookName: bookName,
                        author: author,
                        num: num,
                        lendTime: lendTime,
                        repaidTime: repaidTime,
                        station: station
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
                            modelValue: username,
                            placeholder: 'Please enter username...',
                            'onInput': (event) => {
                                username = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '书名：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: bookName,
                            placeholder: 'Please enter bookname...',
                            'onInput': (event) => {
                                bookName = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '作者：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: author,
                            placeholder: 'Please enter author...',
                            'onInput': (event) => {
                                author = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '数量：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: num,
                            placeholder: 'Please enter num...',
                            'onInput': (event) => {
                                num = event.target.value;
                            }
                        }),
                        h(Space, null, {
                            default() {
                                return [
                                    h(Text, {
                                        modelValue: '借出时间：'
                                    }),
                                    h(DatePicker, {
                                        type: 'datetime',
                                        modelValue: lendTime,
                                        'onOnChange': (date) => {
                                            lendTime = date
                                        }
                                    })
                                ]
                            }
                        }),
                        h(Space, null, {
                            default() {
                                return [
                                    h(Text, {
                                        modelValue: '归还时间：'
                                    }),
                                    h(DatePicker, {
                                        type: 'datetime',
                                        modelValue: repaidTime,
                                        'onOnChange': (date) => {
                                            repaidTime = date
                                        }
                                    })
                                ]
                            }
                        }),
                        h(Space, null, {
                            default() {
                                return [
                                    h(Text, {
                                        modelValue: '状态：'
                                    }),
                                    h(Dropdown, {
                                        placement: 'bottom-start',
                                    }, {
                                        default() {
                                            return h('div', [
                                                h('span', {
                                                    color: '#515a6e'
                                                }, {
                                                    default() {
                                                        return dropdown
                                                    }
                                                }),
                                                h(Icon, {
                                                    type: 'ios-arrow-down'
                                                }, {
                                                    default() {
                                                        return ''
                                                    }
                                                })
                                            ])
                                        },
                                        list() {
                                            return h(DropdownMenu, null, {
                                                default() {
                                                    return [
                                                        h(DropdownItem, {
                                                            onClick() {
                                                                dropdown = '申请借阅'
                                                                station = 0
                                                            }
                                                        }, {
                                                            default() {
                                                                return '申请借阅'
                                                            }
                                                        }),
                                                        h(DropdownItem, {
                                                            onClick() {
                                                                station = 1
                                                                dropdown = '借阅中'
                                                            }
                                                        }, {
                                                            default() {
                                                                return '借阅中'
                                                            }
                                                        }),
                                                        h(DropdownItem, {
                                                            onClick() {
                                                                station = 2
                                                                dropdown = '申请归还'
                                                            }
                                                        }, {
                                                            default() {
                                                                return '申请归还'
                                                            }
                                                        }),
                                                        h(DropdownItem, {
                                                            onClick() {
                                                                station = 3
                                                                dropdown = '已归还'
                                                            }
                                                        }, {
                                                            default() {
                                                                return '已归还'
                                                            }
                                                        })
                                                    ]
                                                }
                                            })
                                        }
                                    }),
                                ]
                            }
                        })
                    ]
                }
            })
        },
        //删除借阅记录
        remove(index) {
            this.$Modal.confirm({
                content: '您确定删除该记录？',
                onOk: () => {
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
        },
        add() {
            //数据初始化
            let username = ''
            let bookName = ''
            let author = ''
            let num = 1
            let lendTime = this.dateformat('yyyy-MM-dd HH:mm:ss')
            let repaidTime = ''
            let station = '0'
            //打开添加借阅记录对话框
            this.$Modal.confirm({
                onOk: () => {
                    this.$axios.post('/borrow/add', {
                        username: username,
                        bookName: bookName,
                        author: author,
                        num: num,
                        lendTime: lendTime,
                        repaidTime: repaidTime,
                        station: station
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
                            modelValue: username,
                            placeholder: 'Please enter username...',
                            'onInput': (event) => {
                                username = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '书名：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: bookName,
                            placeholder: 'Please enter bookname...',
                            'onInput': (event) => {
                                bookName = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '作者：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: author,
                            placeholder: 'Please enter author...',
                            'onInput': (event) => {
                                author = event.target.value;
                            }
                        }),
                        h(Text, {
                            modelValue: '数量：'
                        }),
                        h(Input, {
                            size: "default",
                            modelValue: num,
                            placeholder: 'Please enter num...',
                            'onInput': (event) => {
                                num = event.target.value;
                            }
                        }),
                        h(Space, null, {
                            default() {
                                return [
                                    h(Text, {
                                        modelValue: '借出时间：'
                                    }),
                                    h(DatePicker, {
                                        type: 'datetime',
                                        modelValue: lendTime,
                                        'onOnChange': (date) => {
                                            lendTime = date
                                        }
                                    })
                                ]
                            }
                        }),
                        h(Space, null, {
                            default() {
                                return [
                                    h(Text, {
                                        modelValue: '归还时间：'
                                    }),
                                    h(DatePicker, {
                                        type: 'datetime',
                                        modelValue: repaidTime,
                                        'onOnChange': (date) => {
                                            repaidTime = date
                                        }
                                    })
                                ]
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