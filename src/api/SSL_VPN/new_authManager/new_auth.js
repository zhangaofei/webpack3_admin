/**
 * Created by stone on 2017/8/30.
 */

import {fetch,post} from 'utils/fetch';

//  获取认证
export function authList(currentPage, pageSize,type,searchContent) {
    return fetch({
        url: '/api/admin/auth',
        method: 'get',
        params: {
            'currentPage': currentPage,
            'pageSize':pageSize,
            'authTypes':type,
            'searchContent': searchContent,


        }
    });
}

//新建认证
export function addAuths(auth) {
    return fetch({
        url: '/api/admin/auth',
        method: 'post',
        body:auth
    });
}

//修改认证
export function editAuths(auth) {
    return fetch({
        url: '/api/admin/auth',
        method: 'put',
        body:auth
    });
}

//删除认证
export function delAuths(id) {
    return fetch({
        url: '/api/admin/auth',
        method: 'delete',
        params: {
            ids:id
        }
    });
}

//获取查询条件
export function getCondition(id) {
    return fetch({
        url: '/api/admin/auth/dbAuth/searchCondition',
        method: 'get',
        params: {
            authId:id
        }
    });
}
