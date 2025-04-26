import { IRoleSearchParams, IPermission, IRoleCreateParams, IRoleEditParams} from '../types/api';
import reuquest from '../utils/requests';

export default {
    // 获取角色列表
    getRoleList(params: IRoleSearchParams) {
        return reuquest.get('/roles/list', params);
    },
    // 删除角色
    deleteRole(params: { _id: string }) {
        return reuquest.post('/roles/delete', params);
    },
    // 更新权限
    updatePermission(params: IPermission) {
        return reuquest.post('/roles/update/permission', params);
    },
    // 创建角色
    createRole(params: IRoleCreateParams) {
        return reuquest.post('/roles/create', params);
    },
    // 更新角色
    updateRole(params: IRoleEditParams) {
        return reuquest.post('/roles/edit', params);
    },

    // 获取所有角色列表
    getAllRoleList() {
        return reuquest.get('/roles/allList');
    },
};
