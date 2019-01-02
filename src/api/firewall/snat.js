import {fetch} from 'utils/fetch';

//获取防火墙 源地址转换列表(分页)
export function getSnatList(param) {
    return fetch ({
        url: '/api/admin/snat',
        method: 'GET',
        params: param
    })
}


//批量删除防火墙 源地址转换
export function deleteSnat(snat) {
    return fetch ({
        url: '/api/admin/snat',
        method: 'DELETE',
        params: snat
    })
}
//新建防火墙 源地址转换
export function addSnat(snat) {
    return fetch ({
        url: '/api/admin/snat',
        method: 'POST',
        body: snat
    })
}

//编辑防火墙 源地址转换
export function updateSnat(snat) {
    return fetch ({
        url: '/api/admin/snat',
        method: 'PUT',
        body: snat
    })
}



//更改源地址转换执行优先级
export function sortSnat(snat) {
    return fetch ({
        url: '/api/admin/snat/sort',
        method: 'PUT',
        params: snat
    })
}

//验证防火墙 源地址转换名称是否已存在
export function isNameExist(param) {
    return fetch ({
        url: '/api/admin/snat/name/exist',
        method: 'GET',
        params: param
    })
}
