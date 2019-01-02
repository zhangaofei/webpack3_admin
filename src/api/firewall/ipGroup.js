import {fetch} from 'utils/fetch';

//获取ip组列表(分页)
export function getIpGroupList(param) {
    return fetch ({
        url: '/api/admin/ipgroup',
        method: 'GET',
        params: param
    })
}

//获取ip组列表(选择)
export function getIpGroupListSelect() {
    return fetch ({
        url: '/api/admin/ipgroup/select',
        method: 'GET'
    })
}

//批量删除ip组
export function deleteIpGroup(ipgroup) {
    return fetch ({
        url: '/api/admin/ipgroup',
        method: 'DELETE',
        params: ipgroup
    })
}
//新建ip组
export function addIpGroup(ipgroup) {
    return fetch ({
        url: '/api/admin/ipgroup',
        method: 'POST',
        body: ipgroup
    })
}

//编辑ip组
export function updateIpGroup(ipgroup) {
    return fetch ({
        url: '/api/admin/ipgroup',
        method: 'PUT',
        body: ipgroup
    })
}

//验证ip组名称是否已存在
export function isNameExist(param) {
    return fetch ({
        url: '/api/admin/ipgroup/name/exist',
        method: 'GET',
        params: param
    })
}
