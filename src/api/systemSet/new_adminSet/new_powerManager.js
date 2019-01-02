/**
 * Created by stone on 2017/9/1.
 */
import { fetch } from 'utils/fetch';

//获取权限列表
export function powerList(currentPage, pageSize,searchContent) {
    return fetch({
        url: '/api/admin/access',
        method: 'get',
        params: {
            'currentPage':currentPage,
            'pageSize': pageSize,
            'keyword': searchContent
        }
    });
}

//新建权限
export function addPower(power) {
    return fetch({
        url: '/api/admin/access',
        method: 'POST',
        body: power
    });
}

//删除权限
export function delPower(id) {
    return fetch({
        url: '/api/admin/access',
        method: 'DELETE',
        params: {
            'ids':id
        }
    });
}

//更新权限
export function editPower(id,powerInfo) {
    return fetch({
        url: '/api/admin/access',
        method: 'PUT',
        params:{
            'id':id
        },
        body: powerInfo
    });
}

