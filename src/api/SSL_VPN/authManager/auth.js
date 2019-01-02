/**
 * Created by zuce wei on 2017/7/4.
 */

import {fetch,post} from 'utils/fetch';

export function authList(currentPage, pageSize,type,searchContent) {
    return fetch({
        url: '/api/admin/auths/get_auths',
        method: 'get',
        params: {
            'pageSize':pageSize,
            "search_content": searchContent,
            'cur_page': currentPage,
            'type_str':type
        }
    });
}

export function addAuths(auth) {
    return fetch({
        url: '/api/admin/auths/addAuths',
        method: 'post',
        params:auth
    });
}

export function editAuths(auth) {
    return fetch({
        url: '/api/admin/auths/editAuths',
        method: 'put',
        params:auth
    });
}

export function delAuths(id_name_type) {
    return fetch({
        url: '/api/admin/auths/delAuths',
        method: 'delete',
        params: {
            id_name_type:id_name_type
        }
    });
}

/****************************************************************/
/*******
 * 获取认证方式
 * ******/
export function mainAuthTypeList() {
    return fetch({
        url: '/api/admin/auths/getAllMainAuths',
        method: 'get',
    });
}
/*cas认证*/
export function getCasAuthList() {
    return fetch({
        url: '/api/enwas/system/cas/list',
        method: 'post',
    });
}
export function EditCasAuth(param) {
    return fetch({
        url: '/api/enwas/system/cas/modify',
        method: 'post',
        body:param
    });
}
