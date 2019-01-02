import {fetch} from 'utils/fetch';

//获取防火墙 策略列表(分页)
export function getPolicyList(param) {
    return fetch ({
        url: '/api/admin/policy',
        method: 'GET',
        params: param
    })
}


//批量删除防火墙 策略
export function deletePolicy(policy) {
    return fetch ({
        url: '/api/admin/policy',
        method: 'DELETE',
        params: policy
    })
}
//新建防火墙 策略
export function addPolicy(policy) {
    return fetch ({
        url: '/api/admin/policy',
        method: 'POST',
        body: policy
    })
}

//编辑防火墙 策略
export function updatePolicy(policy) {
    return fetch ({
        url: '/api/admin/policy',
        method: 'PUT',
        body: policy
    })
}



//更改策略执行优先级
export function sortPolicy(policy) {
    return fetch ({
        url: '/api/admin/policy/sort',
        method: 'PUT',
        params: policy
    })
}

//验证防火墙 策略名称是否已存在
export function isNameExist(param) {
    return fetch ({
        url: '/api/admin/policy/name/exist',
        method: 'GET',
        params: param
    })
}

//验证防火墙 目的地址是否为本机接口下的地址
export function isDesipExist(param) {
    return fetch ({
        url: '/api/admin/policy/desip/exist',
        method: 'GET',
        params: param
    })
}

//设置默认策略的inrule 端口
export function setDefaultPolicy(ports) {
    return fetch ({
        url: '/api/admin/policy/defaultpolicy',
        method: 'PUT',
        params: ports
    })
}
