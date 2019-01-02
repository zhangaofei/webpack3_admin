import {fetch,post} from 'utils/fetch';

export function getSmsAuthList() {
    return fetch({
        url: '/api/admin/systemConfig',
        method: 'GET'
    });
}
//编辑
export function editSmsAuditConfig(param){
    return fetch({
        url: '/api/admin/systemConfig',
        method: 'POST',
        body:param
    });
}