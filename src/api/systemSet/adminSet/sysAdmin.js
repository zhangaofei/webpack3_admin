/**
 * Created by Administrator on 2017/8/18.
 */
import { fetch } from 'utils/fetch';

const method = 'get';
//-----------------admin
export function getAdminList(param) {
    return fetch({
        url: '/api/admin/administrators/getAdministrators',
        method: method,
        params: param
    });
}
//------------getpower
export function getPower( param) {
    return fetch({
        url: '/api/admin/power/getPower',
        // method: "post",
        method: method,
        params: param
    });
}
export function addAdmin( param) {
    return fetch({
        url: '/api/admin/administrators/addAdministrators',
        // method: method,
        method: 'post',
        params:  param
    });
}
export function editAdmin(param) {
    return fetch({
        url: '/api/admin/administrators/updateAdministrators',
        method:'post',
        params: param
    });
}
export function modAdminPsw(param) {
    return fetch({
        url: '/api/admin/administrators/updateAdministratorsPW',
        method: 'post',
        params: param

    })
}
export function deleteAdmin(param) {

    return fetch({
        url: '/api/admin/administrators/delAdministratorUsers',
        method: 'delete',
        params: param
    });
}
export function isExistUser(param) {
    return fetch({
        url: '/api/admin/administrators/isExistUser',
        method: "get",
        params: param
    });
}