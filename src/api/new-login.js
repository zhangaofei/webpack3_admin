import {fetch} from 'utils/fetch';
var md5 = require('js-md5');
export function loginByEmail(userName, password) {
    // const data = {
    //     userName,
    //     password
    // };
// let psw= md5.hex(password).toUpperCase();
    return fetch({
        url: '/api/admin/auth/login',
        method: 'GET',
        params: { 'userName': userName, 'password':password },
        // params: { 'userName': userName, 'password':psw }
    });
}
export function logout() {
    return fetch({
        url: '/api/admin/auth/logout',
        method: 'GET'
    });
}
