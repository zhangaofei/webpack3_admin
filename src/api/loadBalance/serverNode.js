import {fetch} from 'utils/fetch';

export function getServernodeList(param) {
    return fetch ({
        url: '/server/HaproxyCFG/ServerNode/selectServerNode',
        method: 'GET',
        params: param
    })
}
//无分页
export function getServernodeListNopage() {
    return fetch ({
        url: '/server/HaproxyCFG/ServerNode/selectAllServerNode',
        method: 'GET'
    })
}
//Add
export function servernodeAdd(param) {
    return fetch ({
        url: '/server/HaproxyCFG/ServerNode/insertServerNode',
        method: 'post',
        // params: param,
        body:param
    })
}
//edit
export function servernodeEdit(param) {
    return fetch ({
        url: '/server/HaproxyCFG/ServerNode/updateServerNode',
        method: 'post',
        body:param
    })
}
//del
export function servernodeDel(param) {
    return fetch ({
        url: '/server/HaproxyCFG/ServerNode/deleteServerNode',
        method: 'delete',
        params: param,
    })
}