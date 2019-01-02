import {fetch,post} from 'utils/fetch';
//新建
export function addCheckConfig(param) {
    return fetch({
        url: '/api/admin/audit',
        method: 'POST',
        body: param
    });
}
//编辑
export function editCheckConfig(param) {
    return fetch({
        url: '/api/admin/audit',
        method: 'PUT',
        body: param
    });
}
//删除
export function deleteCheckConfig(ids) {
    return fetch({
        url: '/api/admin/audit',
        method: 'DELETE',
        params: ids
    });
}
//获取列表
export function getCheckConfigList(param) {
    return fetch({
        url: '/api/admin/audit',
        method: 'GET',
        params: param
    });
}
//获取用户审核与审核日志列表
export function getAuditList(param) {
    return fetch({
        url: '/api/admin/userAudit',
        method: 'GET',
        params: param
    });
}
//审核通过与不通过列表
export function AuditPass(param) {
    return fetch({
        url: '/api/admin/userAudit',
        method: 'POST',
        params: param
    });
}
//获取用户组
export function getGroup(param) {
    return fetch({
        url: '/api/admin/audit/group',
        method: 'GET',
        params:param
    });
}
