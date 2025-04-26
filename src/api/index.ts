import request from '../utils/requests';
import {
    ILogin,
    IDeptSearchParam,
    IUserSearchParams,
    IUpdateUserParams,
    ICreateUserParams,
    IMenuEditParams,
    ICreateMenuParams,
} from '../types/api';
export default {
    // 登陆
    login(params: ILogin) {
        return request.post('/users/login', params);
    },
    // 获取用户信息
    getUserInfo() {
        return request.get('/users/getUserInfo');
    },
    getPermissionList() {
        return request.get('/users/getPermissionList');
    },

    // 部门管理模块
    getDeptList(params?: IDeptSearchParam) {
        return request.get('/dept/list', params)
    },
    // 删除部门
    delDept(params: { _id: string }) {
        return request.post('/dept/delete', params);
    },
    createDept(params: { deptName: string; parentId: string; userName: string }) {
        return request.post('/dept/create', params);
    },
    // 修改部门
    updateDept(params: { _id: string; deptName: string; parentId: string; userName: string }) {
        return request.post('/dept/edit', params);
    },
    // 用户管理模块
    // getUserList(params?: IDeptSearchParam) {
    //     return request.get<IUserItem[]>('/users/list', params);
    // },
    // getAllUserList
    getAllUserList() {
        return request.get('/users/all/list');
    },

    // 获取用户列表
    getUserList(params: IUserSearchParams) {
        return request.get('/users/list', params);
    },
    // 创建用户
    createUser(params: ICreateUserParams) {
        return request.post('/users/create', params);
    },
    // 创建用户
    editUser(params: IUpdateUserParams) {
        return request.post('/users/edit', params);
    },
    // 删除和批量删除用户
    delUser(params: { userIds: number[] }) {
        return request.post('/users/delete', params);
    },
    getReportData(){
        return request.get('/order/dashboard/getReportData')
    },
    getLineData(){
        return request.get('/order/dashboard/getLineData')
    },
    getPieCityData(){
        return request.get('/order/dashboard/getPieCityData')
    },
    getPieAgeData(){
        return request.get('/order/dashboard/getPieAgeData')
    },
    getRadarData(){
        return request.get('/order/dashboard/getRadarData')
    },


    //菜单模块
    getMenuList() {
        return request.get('/menu/list');
    },
    postEditMenu(params: IMenuEditParams) {
        return request.post('/menu/edit', params);
    },
    postCreateMenu(params: ICreateMenuParams) {
        return request.post('/menu/create', params);
    },
    postDeleteMenu(params: { _id: string }) {
        return request.post('/menu/delete', params);
    },


    
};
