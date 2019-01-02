import {fetch} from 'utils/fetch';
export function loginByEmail(name, password) {
    const data = {
        name,
        password
    };

    return fetch({
        url: '/api/admin/login/login',
        method: 'post',
        params: { 'username': name, 'password':password }
    });
}
export function logout(userName) {
    return fetch({
        url: '/api/admin/login/logout',
        method: 'get',
        params: { "userNameStr":'admin'}
    });
}


export function getInfo(token) {
    return fetch({
        url: '/user/addInfo',
        method: 'get',
        params: {token}
    });
}

