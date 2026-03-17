// 整个项目api的统一管理
import request from "./request";

// 请求首页左侧表格的数据

export default {
    // 获取表格数据
    getTableData() {
        return request({
            url: '/home/getTableData',
            // url: "https://apifoxmock.com/m1/4068509-0-default/api/home/getTable",
            method: "get",
        });
    },
    // 获取count数据
    getCountData() {
        return request({
            url: '/home/getCountData',
            method: "get",
        });
    },
    // 获取chart数据
    getChartData() {
        return request({
            url: '/home/getChartData',
            method: "get",
        });
    },
    // 获取用户数据
    getUserData(data) {
        return request({
            url: '/home/getUserData',
            method: "get",
            data,
        });
    },
    // 删除用户数据
    deleteUser(data) {
        return request({
            url: '/user/deleteUser',
            method: "get",
            data,
        });
    },
    // 增加用户数据
    addUser(data) {
        return request({
            url: '/user/addUser',
            method: "post",
            data,
        });
    },
    // 编辑用户数据
    editUser(data) {
        return request({
            url: '/user/editUser',
            method: "post",
            data,
        });
    },
    
    getMenu(params) {
    return request({
        url: '/permission/getMenu',
        method: 'post',
        data: params
        })
    }
};