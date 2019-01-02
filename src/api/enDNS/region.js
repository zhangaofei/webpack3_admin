import {fetch} from 'utils/fetch';

//获取区域 列表(分页)
export function getRegionList(param) {
    return fetch ({
        url: '/api/dns/dnsArea',
        method: 'GET',
        params: param
    })
}

//批量删除区域
export function deleteRegion(param) {
    return fetch ({
        url: '/api/dns/dnsArea',
        method: 'DELETE',
        params: param
    })
}
//新建区域
export function addRegion(param) {
    return fetch ({
        url: '/api/dns/dnsArea',
        method: 'POST',
        body:param
    })
}

//编辑区域
export function updateRegion(param) {
    return fetch ({
        url: '/api/dns/dnsArea',
        method: 'PUT',
        body: param
    })
}


//验证区域是否已存在
export function isRegionNameExist(param) {
    return fetch ({
        url: '/api/admin/tobedefined/name/exist',
        method: 'GET',
        params: param
    })
}



//=====================黑名单=========================



//获取黑名单 列表(分页)
export function getBlacklistList(param) {
    return fetch ({
        url: '/api/dns/dnsBlackList',
        method: 'GET',
        params: param
    })
}

//批量删除黑名单
export function deleteBlacklist(param) {
    return fetch ({
        url: '/api/dns/dnsBlackList',
        method: 'DELETE',
        params: param
    })
}
//新建黑名单
export function addBlacklist(param) {
    return fetch ({
        url: '/api/dns/dnsBlackList',
        method: 'POST',
        body:param
    })
}

//编辑黑名单
export function updateBlacklist(param) {
    return fetch ({
        url: '/api/dns/dnsBlackList',
        method: 'PUT',
        body: param
    })
}


//验证黑名单是否已存在
export function isBlacklistNameExist(param) {
    return fetch ({
        url: '/api/admin/tobedefined/name/exist',
        method: 'GET',
        params: param
    })
}


//启动或者停止使用黑名单
export function setBlacklistStatus(param) {
    return fetch ({
        url: '/api/admin/tobedefined/status',
        method: 'PUT',
        params: param
    })
}
//开启或关闭状态
export function stopBlackListAnalyze(param) {
    return fetch ({
        url: '/api/dns/dnsBlackList/stop',
        method: 'PUT',
        params: param
    })
}
