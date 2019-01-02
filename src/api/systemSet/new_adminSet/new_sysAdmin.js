/**
 * Created by stone on 2017/9/1.
 */
import {fetch} from 'utils/fetch';

//-----------------admin系统管理员
//获取管理员列表
export function getAdminList(currentPage, pageSize, keyWord) {
    return fetch({
        url: '/api/admin/manager',
        method: 'GET',
        params: {
            'currentPage': currentPage,
            'pageSize': pageSize,
            'keyword': keyWord
        }
    });
}

//删除管理员
export function deleteAdmin(id) {
    return fetch({
        url: '/api/admin/manager',
        method: 'DELETE',
        params: {
            'ids': id
        }
    });
}

//新建管理员
export function addAdmin(sysAdmin) {
    return fetch({
        url: '/api/admin/manager',
        method: 'POST',
        body: sysAdmin
    });
}

//修改管理员
export function editAdmin(id, editDTO) {
    return fetch({
        url: '/api/admin/manager',
        method: 'PUT',
        params: {
            'id': id
        },
        body: editDTO

    });
}

//获取管理员可用权限
export function getPower() {
    return fetch({
        url: '/api/admin/manager/accessList',
        method: 'GET'
    });
}

//更新管理员密码
export function modAdminPsw(pwd) {
    return fetch({
        url: '/api/admin/manager/changePassword',
        method: 'POST',
        params: {},
        body: pwd

    })
}