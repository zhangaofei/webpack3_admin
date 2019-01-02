import {fetch} from 'utils/fetch';

export function getVirtualServiceList(param) {
    return fetch ({
        url: '/server/HaproxyCFG/VirtualService/selectVirtualService',
        method: 'GET',
        params: param
    })
}
//add
export function virtualServiceAdd(param) {
    return fetch ({
        url: '/server/HaproxyCFG/VirtualService/insertVirtualService',
        method: 'post',
        body:param
    })
}
//edit
export function virtualServiceEdit(param) {
    return fetch ({
        url: '/server/HaproxyCFG/VirtualService/updateVirtualService',
        method: 'post',
        body:param
    })
}
//del
export function virtualServiceDel(param) {
    return fetch ({
        url: '/server/HaproxyCFG/VirtualService/deleteVirtualService',
        method: 'delete',
        // params: param,
        params:param
    })
}
//byId 通过id显示编辑内容
export function virtualServiceById(param) {
    return fetch ({
        url: '/server/HaproxyCFG/VirtualService/selectVirtualServiceById',
        method: 'get',
        params:param
    })
}

// HaproxyCFG/WriteHaproxyCFG/write
//byId 通过id显示编辑内容
export function writeHaproxy() {
    return fetch ({
        url: '/server/HaproxyCFG/WriteHaproxyCFG/write',
        method: 'get',
        // params:param
    })
}
