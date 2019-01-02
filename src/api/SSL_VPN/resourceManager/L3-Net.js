import {fetch} from 'utils/fetch';

export function getL3NetList(param) {
    return fetch ({
        url: '/api/admin/apps/getL3NetList',
        // method: 'POST',
        method: 'get',
        params: param
    })
}
export function delL3Net(param) {
    return fetch ({
        url: '/api/admin/apps/delApps',
        method: 'delete',
        params: param
    })
}
export function addL3Net(param) {
    return fetch ({
        url: '/api/admin/apps/addApps',
        method: 'POST',
        params: param
    })
}
export function editL3Net(param) {
    return fetch ({
        url: '/api/admin/apps/editApps',
        method: 'POST',
        params: param
    })
}
export function isExistUser(param) {
    return fetch({
        url: '/api/admin/apps/isExistApps',
        method: "get",
        params: param
    });
}