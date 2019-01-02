import {fetch} from 'utils/fetch';

//获取ip列表(分页)
export function getIpList(param) {
    return fetch ({
        url: '/api/admin/ip',
        method: 'GET',
        params: param
    })
}

//获取ip列表(选择)
export function getIpListSelect() {
    return fetch ({
        url: '/api/admin/ip/select',
        method: 'GET'
    })
}

//获取ip列表(选择) ipv4类型
export function getIpv4ListSelect() {
    return fetch ({
        url: '/api/admin/ip/select/ipv4',
        method: 'GET'
    })
}



//批量删除ip
export function deleteIp(ip) {
    return fetch ({
        url: '/api/admin/ip',
        method: 'DELETE',
        params: ip
    })
}
//新建ip
export function addIp(ip) {
    return fetch ({
        url: '/api/admin/ip',
        method: 'POST',
        body: ip
    })
}

//查看ip
export function checkIp(ip) {
    return fetch ({
        url: '/api/admin/ip/info',
        method: 'GET',
        params: ip
    })
}
//编辑ip
export function updateIp(ip) {
    return fetch ({
        url: '/api/admin/ip',
        method: 'PUT',
        body: ip
    })
}

//验证ip名称是否已存在
export function isNameExist(param) {
    return fetch ({
        url: '/api/admin/ip/name/exist',
        method: 'GET',
        params: param
    })
}
