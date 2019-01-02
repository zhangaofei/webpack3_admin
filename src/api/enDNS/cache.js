import {fetch} from 'utils/fetch';
//=====================缓存=========================



//获取缓存 列表(分页)
export function getCacheList(param) {
    return fetch ({
        url: '/api/dns/dnsCacheRecord',
        method: 'GET',
        params: param
    })
}

//批量删除缓存
export function deleteCache(param) {
    return fetch ({
        url: '/api/dns/dnsCacheRecord',
        method: 'DELETE',
        params: param
    })
}
//新建缓存
export function addCache(param) {
    return fetch ({
        url: '/api/dns/dnsCacheRecord',
        method: 'POST',
        body:param
    })
}

//编辑缓存
export function updateCache(param) {
    return fetch ({
        url: '/api/dns/dnsCacheRecord',
        method: 'PUT',
        body: param
    })
}


//验证缓存名是否已存在
export function isCacheNameExist(param) {
    return fetch ({
        url: '/api/admin/tobedefined/name/exist',
        method: 'GET',
        params: param
    })
}





