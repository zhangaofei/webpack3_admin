import {fetch} from 'utils/fetch';

//获取防火墙 服务列表(分页)
export function getServiceList(param) {
    return fetch ({
        url: '/api/admin/ipservice',
        method: 'GET',
        params: param
    })
}

//获取服务列表(选择)
export function getServiceListSelect() {
    return fetch ({
        url: '/api/admin/ipservice/select',
        method: 'GET'
    })
}

//获取防火墙 基础服务列表(分页)
export function getServiceListBasic(param) {
    return fetch ({
        url: '/api/admin/ipservice/basic',
        method: 'GET',
        params: param
    })
}

//获取防火墙 自定义服务列表(分页)
export function getServiceListDefine(param) {
    return fetch ({
        url: '/api/admin/ipservice/define',
        method: 'GET',
        params: param
    })
}

//批量删除防火墙 服务
export function deleteService(time) {
    return fetch ({
        url: '/api/admin/ipservice',
        method: 'DELETE',
        params: time
    })
}
//新建防火墙 服务
export function addService(time) {
    return fetch ({
        url: '/api/admin/ipservice',
        method: 'POST',
        body: time
    })
}

//编辑防火墙 服务
export function updateService(time) {
    return fetch ({
        url: '/api/admin/ipservice',
        method: 'PUT',
        body: time
    })
}

//验证防火墙 服务名称是否已存在
export function isNameExist(param) {
    return fetch ({
        url: '/api/admin/ipservice/name/exist',
        method: 'GET',
        params: param
    })
}
