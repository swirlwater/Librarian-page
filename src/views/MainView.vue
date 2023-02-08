<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                        <Icon type="ios-navigate"></Icon>
                        Item 1
                        </MenuItem>
                        <MenuItem name="2">
                        <Icon type="ios-keypad"></Icon>
                        Item 2
                        </MenuItem>
                        <MenuItem name="3">
                        <Icon type="ios-analytics"></Icon>
                        Item 3
                        </MenuItem>
                        <MenuItem name="4">
                        <Icon type="ios-paper"></Icon>
                        Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{ background: '#fff' }">
                    <Menu theme="light" width="auto" @on-select="onselect">
                        <Submenu name="1">
                            <template #title>
                                <Icon type="ios-book"></Icon>
                                阅读管理
                            </template>
                            <MenuItem name="bookSearch">书籍检索</MenuItem>
                            <MenuItem name="1-2">借阅记录</MenuItem>
                            <MenuItem name="orderAdd">发起订单</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template #title>
                                <Icon type="ios-stats"></Icon>
                                借阅管理
                            </template>
                            <MenuItem name="2-1">借阅记录</MenuItem>
                            <MenuItem name="2-2">查看订单</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template #title>
                                <Icon type="ios-paper"></Icon>
                                书籍管理
                            </template>
                            <MenuItem name="bookManage">书籍管理</MenuItem>
                            <MenuItem name="3-2">订单处理</MenuItem>
                        </Submenu>
                        <Submenu name="4">
                            <template #title>
                                <Icon type="ios-people"></Icon>
                                资料管理
                            </template>
                            <MenuItem name="4-1">用户资料</MenuItem>
                            <MenuItem name="4-2">用户管理</MenuItem>
                            <MenuItem name="4-3">职位管理</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{ padding: '0 24px 24px' }">
                    <Breadcrumb :style="{ margin: '24px 0' }">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{ padding: '24px', minHeight: '500px', background: '#fff' }">
                        <RouterView />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
export default {
    mounted() {
        this.$router.push('/main/home')
    },
    components: {

    },
    methods: {
        onselect(name) {
            this.$router.push('/main/' + name)
        }
    }
}
</script>
<style>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}

.layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
