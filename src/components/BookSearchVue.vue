<template>
    <Space>
        书名:
        <Input placeholder="Enter name" style="width: auto">
        <template #prefix>
            <Icon type="ios-book" />
        </template>
        </Input>
        作者:
        <Input placeholder="Enter text" style="width: auto">
        <template #prefix>
            <Icon type="ios-contact" />
        </template>
        <template #suffix>
            <Icon type="ios-search" @click="press" />
        </template>
        </Input>
    </Space>
    <div class="space"></div>
    <Table border :columns="columns" :data="data"></Table>
    <div class="space"></div>
    <Page v-model="currentPage" :total="80" />
</template>

<script>
import { resolveComponent } from 'vue'

export default {
    data() {
        return {
            columns: [
                {
                    title: '书名',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            h(resolveComponent('Icon'), {
                                type: 'ios-paper'
                            }),
                            h('strong', params.row.name)
                        ]);
                    }
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
                                    return '查看'
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
                {
                    name: 'John Brown',
                    author: 18,
                    content: 'New York No. 1 Lake Park'
                },
                {
                    name: 'Jim Green',
                    author: 24,
                    content: 'London No. 1 Lake Park'
                },
                {
                    name: 'Joe Black',
                    author: 30,
                    content: 'Sydney No. 1 Lake Park'
                },
                {
                    name: 'Jon Snow',
                    author: 26,
                    content: 'Ottawa No. 2 Lake Park'
                }
            ],
            currentPage: 1
        }
    },
    methods: {
        show(index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data[index].name}<br>Age：${this.data[index].age}<br>Address：${this.data[index].address}`
            })
        },
        remove(index) {
            this.data.splice(index, 1);
        },
        press() {
            alert('hello')
        }
    }
}
</script>
<style>
.space{
    height: 30px;
}
</style>
