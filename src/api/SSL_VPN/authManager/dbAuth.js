/**
 * Created by Administrator on 2017/7/4.
 */
import {fetch} from 'utils/fetch';
//*****************************db认证
export function getDbAuthList(param) {
    return fetch({
        url: '/api/admin/auths/get_auths',
        method: 'get',
        // method: 'post',
        params: param
    });
}
export function addDbAuth(param) {
    return fetch({
        url: '/api/admin/auths/addAuths',
        method: 'post',
        params: param
    });
}
export function editDbAuth(param) {
    return fetch({
        url: '/api/admin/auths/editAuths',
        method: 'put',
        params: param
    });
}
export function deleteDbAuth(param) {
    return fetch({
        url: '/api/admin/auths/delAuths',
        method: 'delete',
        // method: 'post',
        params: param
    });
}
export function isExistUser(param) {
    return fetch({
        url: '/api/admin/auths/isExistAuths',
        method: 'get',
        // method: 'post',
        params: param
    });
}

