import { fetch } from 'utils/fetch';
//访问控制  匹配规则
export function getAclBasicRule(param) {
    return fetch({
        url:'/api/enwas/pg/acl/basic_rule/list',
        method: 'post',
        body:param,
    })
}
export function addAclBasicRule(param) {
    return fetch({
        url:'/api/enwas/pg/acl/basic_rule/add',
        method: 'post',
        body:param,
    })
}
export function editAclBasicRule(param) {
    return fetch({
        url:'/api/enwas/pg/acl/basic_rule/modify',
        method: 'post',
        body:param,
    })
}
export function delAclBasicRule(param) {
    return fetch({
        url:'/api/enwas/pg/acl/basic_rule/del',
        method: 'post',
        body:param,
    })
}
// 拦截规则
export function getBreakRuleName(param) {
    return fetch({
        url:'/api/enwas/pg/acl/basic_rule/list_basics_name',
        method: 'post',
        body:param,
    })
}
export function getBreakRule(param) {
    return fetch({
        url:'/api/enwas/pg/acl/filter_rule/list',
        method: 'post',
        body:param,
    })
}
export function addBreakRule(param) {
    return fetch({
        url:'/api/enwas/pg/acl/filter_rule/add',
        method: 'post',
        body:param,
    })
}
export function editBreakRule(param) {
    return fetch({
        url:'/api/enwas/pg/acl/filter_rule/modify',
        method: 'post',
        body:param,
    })
}
export function delBreakRule(param) {
    return fetch({
        url:'/api/enwas/pg/acl/filter_rule/del',
        method: 'post',
        body:param,
    })
}