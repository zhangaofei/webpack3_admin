import { fetch } from 'utils/fetch';
/*（form qqy）新公共授权api*/
export function getAssociationPubGroup(param) {
    return fetch({
        url: '/api/admin/group/getGroupEmpower',//（form qqy）新公共授权api
        method: 'get',
        params: param,
        // body: param
    });
}
export function deletePubAssociation(param) {
    return fetch({
        url: '/api/admin/group/deleteEmpower',
        method: 'delete',
        params: param
    });
}
export function getNotAssociationPubGroup(param) {
    return fetch({
        url: '/api/admin/group/getGroupNoEmpower',
        method: 'get',
        params: param
    });
}
/*webend 已排序列表*/
export function getTerminalBySort(param) {
    return fetch({
        url: '/api/admin/webTerminal/terminalBySort',
        method: 'get',
        params: param
    });
}
// /api/admin/group  =>qqy
export function saveRemark(param) {
    return fetch({
        url: '/api/admin/group/editGroupRemark',
        method: 'put',
        body: param
    });
}