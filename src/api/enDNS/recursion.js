import {fetch} from 'utils/fetch';

//获取递归服务器 列表(分页)
export function getServerList(param) {
    return fetch ({
        url: '/api/dns/dnsDomainServer',
        method: 'GET',
        params: param
    })
}

//批量删除递归服务器
export function deleteServer(param) {
    return fetch ({
        url: '/api/dns/dnsDomainServer',
        method: 'DELETE',
        params: param
    })
}
//新建递归服务器
export function addServer(param) {
    return fetch ({
        url: '/api/dns/dnsDomainServer',
        method: 'POST',
        body:param
    })
}

//编辑递归服务器
export function updateServer(param) {
    return fetch ({
        url: '/api/dns/dnsDomainServer',
        method: 'PUT',
        body: param
    })
}

//获取递归服务器(用于下拉列表)
export function getDnsDomainServerForPull(param) {
    return fetch ({
        url: '/api/dns/dnsDomainServer/all',
        method: 'GET',
        body: param
    })
}

//验证递归服务器是否已存在
export function isServerNameExist(param) {
    return fetch ({
        url: '/api/admin/tobedefined/name/exist',
        method: 'GET',
        params: param
    })
}



//=====================递归规则=========================


//获取递归列表(下拉框)
export function getRecursionForPull(param) {
    return fetch ({
        url: '/api/dns/dnsRecursive/all',
        method: 'GET',
        params: param
    })
}

//获取递归规则 列表(分页)
export function getRuleList(param) {
    return fetch ({
        url: '/api/dns/dnsRecursive',
        method: 'GET',
        params: param
    })
}

//获取递归规则 供选择
export function getRuleNameList(param) {
    return fetch ({
        url: '/api/dns/dnsRecursive',
        method: 'GET',
        params: param
    })
}

//批量删除递归规则
export function deleteRule(param) {
    return fetch ({
        url: '/api/dns/dnsRecursive',
        method: 'DELETE',
        params: param
    })
}
//新建递归规则
export function addRule(param) {
    return fetch ({
        url: '/api/dns/dnsRecursive',
        method: 'POST',
        body:param
    })
}

//编辑递归规则
export function updateRule(param) {
    return fetch ({
        url: '/api/dns/dnsRecursive',
        method: 'PUT',
        body: param
    })
}
//上移或下移
export function upOrDown(param) {
    return fetch ({
        url: '/api/dns/dnsRecursive/shift',
        method: 'PUT',
        params: param
    })
}
//获取出口IP
export function getEthAddressList(param) {
    return fetch ({
        url: '/api/admin/netInterface/ip',
        method: 'GET',
        body: param
    })
}

//验证递归规则是否已存在
export function isRuleNameExist(param) {
    return fetch ({
        url: '/api/admin/tobedefined/name/exist',
        method: 'GET',
        params: param
    })
}


//更改 递归规则优先级
export function setRulePriority(param) {
    return fetch ({
        url: '/api/admin/tobedefined/status',
        method: 'PUT',
        params: param
    })
}





