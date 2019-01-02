import {fetch} from 'utils/fetch';

//获取防火墙 目的地址转换列表(分页)
export function getDnatList(param) {
    return fetch ({
        url: '/api/admin/dnat',
        method: 'GET',
        params: param
    })
}


//批量删除防火墙 目的地址转换
export function deleteDnat(dnat) {
    return fetch ({
        url: '/api/admin/dnat',
        method: 'DELETE',
        params: dnat
    })
}
//新建防火墙 目的地址转换
export function addDnat(dnat) {
    return fetch ({
        url: '/api/admin/dnat',
        method: 'POST',
        body: dnat
    })
}

//编辑防火墙 目的地址转换
export function updateDnat(dnat) {
    return fetch ({
        url: '/api/admin/dnat',
        method: 'PUT',
        body: dnat
    })
}



//更改目的地址转换执行优先级
export function sortDnat(dnat) {
    return fetch ({
        url: '/api/admin/dnat/sort',
        method: 'PUT',
        params: dnat
    })
}

//验证防火墙 目的地址转换名称是否已存在
export function isNameExist(param) {
    return fetch ({
        url: '/api/admin/dnat/name/exist',
        method: 'GET',
        params: param
    })
}
