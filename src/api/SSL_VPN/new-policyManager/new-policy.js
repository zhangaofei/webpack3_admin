import {fetch} from 'utils/fetch';

//获取策略列表(分页)
export function getPolicyList(param) {
    return fetch ({
        url: '/api/admin/rule',
        method: 'GET',
        params: param
    })
}
//获取使用某一个策略的所有用户组
export function getPolicyGroup(param) {
    return fetch ({
        url: '/api/admin/rule/groups',
        method: 'GET',
        params: param
    })
}
//获取使用某一个策略的所有用户
export function getPolicyUsers(param) {
    return fetch ({
        url: '/api/admin/rule/users',
        method: 'GET',
        params: param
    })
}
//批量删除策略
export function deletePolicy(policy) {
    return fetch ({
        url: '/api/admin/rule',
        method: 'DELETE',
        params: policy
    })
}
//新建策略
export function addPolicy(policy) {
    return fetch ({
        url: '/api/admin/rule',
        method: 'POST',
        body: policy
    })
}
export function checkPolicy(policy) {
    return fetch ({
        url: '/api/admin/user_rules/checkUserRule',
        method: 'GET',
        params: policy
    })
}

export function getSysTime()
{
    return fetch ({
        url: '/api/admin/sysTool/getCurrentTime',
        method: 'GET'
    })
}
//编辑策略
export function updatePolicy(policy) {
    return fetch ({
        url: '/api/admin/rule',
        method: 'PUT',
        body: policy
    })
}
