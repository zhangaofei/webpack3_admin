import { fetch } from 'utils/fetch';
let  method = 'post'
export function getRuleList(rule) {
    return fetch({
        url: '/api/enwas/rule/list',
        method: method,
        body: rule
    });
}

export function addRule(rule) {
    return fetch({
        url: '/api/enwas/rule/add',
        method: method,
        body: rule
    });
}

export function updateRule(rule) {
    return fetch({
        url: '/api/enwas/rule/modify',
        method: method,
        body: rule
    });
}

export function deleteRule(rule) {
    return fetch({
        url: '/api/enwas/rule/del',
        method: method,
        body: rule
    });
}
export function refresh(param) {
    return fetch({
        url: '/api/enwas/admin/rule/updateRule',
        method: method,
        body: param
    });
}

export function getAutoUpdata(param) {
    return fetch({
        url: '/api/enwas/admin/rule/getService',
        method: method,
        body: param
    });
}
export function saveAutoUpdata(param) {
    return fetch({
        url: '/api/enwas/admin/rule/updateSystemService',
        method: method,
        body: param
    });
}