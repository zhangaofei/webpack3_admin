import {fetch} from 'utils/fetch';

//服务器池
export function getServerpoolList(param) {
    return fetch ({
        url: '/server/HaproxyCFG/ServerPool/selectServerPool',
        method: 'GET',
        params: param
    })
}
//服务器池==无分页
export function getServerpoolListNopage() {
    return fetch ({
        url: '/server/HaproxyCFG/ServerPool/selectAllServerPool',
        method: 'GET',
        // params: param
    })
}
export function serverpoolAdd(param) {
    return fetch ({
        url: '/server/HaproxyCFG/ServerPool/insertServerPool',
        method: 'post',
        // params: param,
        body:param
    })
}
//edit
export function serverpoolEdit(param) {
    return fetch ({
        url: '/server/HaproxyCFG/ServerPool/updateServerPool',
        method: 'post',
        body:param
    })
}
//del
export function serverpoolDel(param) {
    return fetch ({
        url: '/server/HaproxyCFG/ServerPool/deleteServerPool',
        method: 'delete',
        params: param,
    })
}
//获取服务器node节点（服务器池新增用）
export function selectServerNode() {
    return fetch ({
        url: '/server/HaproxyCFG/ServerNode/selectServerNode',
        method: 'get',
        // params: param,
    })
}
//获取服务器node节点（服务器池edit用）
export function selectServerNodeUnused(param) {
    return fetch ({
        url: '/server/HaproxyCFG/ServerNode/selectUnusedServerNodeByIds',
        method: 'get',
        params: param,
    })
}
//获取服务器node节点（服务器池edit用）
export function selectServerNodeUsed(param) {
    return fetch ({
        url: '/server/HaproxyCFG/ServerNode/selectServerNodeByIds',
        method: 'get',
        params: param,
    })
}
//