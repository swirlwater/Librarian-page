<template>
    <div class="layout">
        <Layout>
            <Header style="background-color: #fff; padding: 0px 0px; border: 0px 0px;">
                <Menu mode="horizontal" theme="light" active-name="1" style="width: 100%;">
                    <div class="layout-logo"></div>
                    <div class="layout-title">图书馆管理系统</div>
                    <div class="layout-user">
                        <Dropdown @on-click="onclick">
                            <a href="javascript:void(0)">
                                {{ user.nickname }}
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <template #list>
                                <DropdownMenu>
                                    <DropdownItem name="userSearch">用户资料</DropdownItem>
                                    <DropdownItem name="logout">注销</DropdownItem>
                                </DropdownMenu>
                            </template>
                        </Dropdown>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{ background: '#fff' }">
                    <Menu theme="light" width="auto" @on-select="onselect">
                        <MenuItem :name="item.component" v-for="item in components" :key="item">
                        <Icon :type="item.icon"></Icon>
                        {{ item.name }}
                        </MenuItem>
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
import { Icon, MenuItem } from 'view-ui-plus';

export default {
    data() {
        return {
            components: [],
            user: {}
        }
    },
    mounted() {
        this.$router.push('/main/home')
        this.$axios.get('/user/permissions', {
        }).then((successResponse) => {
            this.components = successResponse.data.object
        }).catch((failResponse) => {
            this.$Message.info(failResponse)
        })
        this.user = this.$store.getters.getUser
    },
    components: {
        Icon,
        MenuItem
    },
    methods: {
        onselect(name) {
            this.$router.push('/main/' + name)
        },
        onclick(name) {
            if (name == 'logout') {
                this.$Modal.confirm({
                    content: '您是否确定退出？',
                    onOk: () => {
                        this.$axios.get('/user/logout')
                            .then(successResponse => {
                                this.$Message.success(successResponse.data.message)
                                this.$router.push('/login')
                            }).catch(failResponse => {
                                console.log(failResponse)
                            })
                    }
                })
            }else{
                this.$router.push('/main/'+name)
            }
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
    width: 35px;
    height: 30px;
    background: url('@/assets/librarian.png') no-repeat;
    background-size: 30px 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}

.layout-title {
    width: 120px;
    height: 30px;
    line-height: 30px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}

.layout-user {
    width: 200px;
    height: 30px;
    line-height: 30px;
    float: right;
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
