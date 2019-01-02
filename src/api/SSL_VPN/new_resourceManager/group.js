import {fetch} from 'utils/fetch';
//请求所有的资源列表
export function getAllAppsList(param){
    return fetch({
        url: '/api/admin/group/apps/all',
        method: 'GET',
        params:param
    });
}
export function getSelectedAppsList(param){
    return fetch({
        url: '/api/admin/group/allApps',
        method: 'GET',
        params:param
    });
}
export function updateAppsForGroup(id, appsList){
    return fetch({
        url: '/api/admin/group/updateApps',
        method: 'PUT',
        params:{groupId:id},
        body:appsList

    });
}
export function getSelectedApps(param){
    return fetch({
        url: '/api/admin/group/apps',
        method: 'GET',
        params:param
    });
}
/*新 获取enssl所有应用*/
// api/admin/group/appsBySort
//请求所有的资源列表
export function getEnsslList(param){
    return fetch({
        url: '/api/admin/group/appsBySort',
        method: 'GET',
        params:param
    });
}