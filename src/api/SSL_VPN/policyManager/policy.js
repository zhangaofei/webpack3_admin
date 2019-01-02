import {fetch} from 'utils/fetch';

//获取用户策略列表(分页)
export function getPolicyList(param) {
    return fetch ({
        url: '/api/admin/user_rules/get_user_rules',
        method: 'GET',
        params: param
    })
}
export function deletePolicy(policy) {
    return fetch ({
        url: '/api/admin/user_rules/delUserRules',
        method: 'delete',
        body: policy
    })
}
export function addPolicy(policy) {
    return fetch ({
        url: '/api/admin/user_rules/addUserRule',
        method: 'POST',
        params: policy
    })
}
export function checkPolicy(policy) {
    return fetch ({
        url: '/api/admin/user_rules/checkUserRule',
        method: 'GET',
        params: policy
    })
}
export function updatePolicy(policy) {
    return fetch ({
        url: '/api/admin/user_rules/editUserRule',
        method: 'POST',
        params: policy
    })
}
