import {fetch} from 'utils/fetch';

//rule
export function getAclList(param) {
    return fetch ({
        url: '/server/HaproxyCFG/ACL/selectACL',
        method: 'GET',
        params: param
    })
}
//rule==无分页
export function getAclListNopage() {
    return fetch ({
        url: '/server/HaproxyCFG/ACL/selectAllACL',
        method: 'GET'
        // params: param
    })
}
//add
export function getAclAdd(param) {
    return fetch ({
        url: '/server/HaproxyCFG/ACL/insertACL',
        method: 'post',
        body: param
    })
}
//edit
export function getAclEdit(param) {
    return fetch ({
        url: '/server/HaproxyCFG/ACL/updateACL',
        method: 'post',
        body: param
    })
}
//del
export function getAclDel(param) {
    return fetch ({
        url: '/server/HaproxyCFG/ACL/deleteACL',
        method: 'delete',
        params: param
    })
}