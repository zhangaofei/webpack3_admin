/**
 * Created by Administrator on 2017/7/25.
 */
import {fetch} from 'utils/fetch';

export function getRdpList(param) {
    return fetch ({
        url: '/api/admin/apps/getRDPList',
        // method: 'POST',
        method: 'get',
        params: param
    })
}

export function deleteRdp(param) {
    return fetch ({
        url: '/api/admin/apps/delRDPApps',
        method: 'delete',
        params: param
    })
}
// export function addL3Net(param) {
//     return fetch ({
//         url: '/api/admin/apps/addApps',
//         method: 'POST',
//         params: param
//     })
// }
// export function editL3Net(param) {
//     return fetch ({
//         url: '/api/admin/apps/editApps',
//         method: 'POST',
//         params: param
//     })
// }

export function isExistUser(param) {
    return fetch({
        url: '/api/admin/apps/isExistApps',
        method: "get",
        params: param
    });
}