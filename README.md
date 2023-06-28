## 项目概述

图书馆管理系统是图书馆管理员用于管理图书馆相关业务的管理系统。本系统包含的功能有书籍搜索、借阅记录、发起订单、借阅管理、订单管理、书籍管理、用户管理和角色管理。该项目图书馆管理系统的前端页面。 
图书馆管理系统的后台项目下载：[点击此处](https://github.com/whx1978938887/Librarian-server)

## 功能概述

书籍搜索：用户对图书馆中具有的图书按条件进行搜索，对查询的图书可以发起借阅，然后等待管理员的审核。  
借阅记录：用户在书籍搜索中借阅的记录可以在此处进行查看，对借阅的图书可以进行归还操作。  
发起订单：用户通知发起订单，通知系统管理员需要在系统中上架的图书，然后等待管理员的审核情况。  
借阅管理：分为审核和修改两大子模块。审核是同意或者撤销来自用户的借阅或归还申请，而修改则是修改借阅记录的具体信息。  
订单管理：分为审核和修改两大子模块。审核是同意或驳回来自用户的订单请求，而修改则是修改订单的具体信息。  
书籍管理：管理员在此处对书籍搜索中的图书信息进行修改。  
用户管理：管理员修改用户承担的角色。  
角色管理：管理员修改系统的角色信息，包括对角色信息的增删改查操作。  

## 部分功能展示

书籍搜索  
![书籍搜索](http://wuhaixuan.top/bookSearch.png)
借阅管理  
![借阅管理](http://wuhaixuan.top/borrowManage.png)
书籍管理  
![书籍管理](http://wuhaixuan.top/bookManage.png)
用户管理  
![用户管理](http://wuhaixuan.top/userManage.png)
角色管理  
![角色管理](http://wuhaixuan.top/roleManage.png)

## 系统架构

系统采用Vue+SpringBoot的前后端分离架构开发。系统前端使用的技术有：  
1.Vue  
2.Vue-router  
2.Axios  
3.Vuex  
...  
页面使用的ui组件是view design。官方链接：[点击此处](https://www.iviewui.com/view-ui-plus/guide/introduce)  


## 项目运行

前置说明：系统运行需要node.js环境，需要自行搭建。

### 1.项目下载/克隆  

在项目需要保存的路径下，使用git命令`git clone https://github.com/whx1978938887/Librarian-page.git .`将项目克隆到本地  
或者在github直接下载Zip文件到本地进行解压   

### 2.下载npm包  
执行`npm install`下载项目依赖包

### 3.项目运行
执行`npm run serve`运行项目

## 系统登陆
在保证前后端项目正常运行的情况下在浏览器中输入地址`http://localhost:8081/`进入系统登录页。
> 初始超级管理员的用户名是zhangsan，密码是1234  

登录页面

![登录页面](http://wuhaixuan.top/librarian/login.png)

注册页面

![注册页面](http://wuhaixuan.top/librarian/register.png)