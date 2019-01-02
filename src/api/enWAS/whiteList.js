import { fetch } from 'utils/fetch';
let  method = 'post'
//====================blackName===========================
export function getBlackName(blackName) {
    return fetch({
        url: '/api/enwas/black/user/list',
        method: method,
        body: blackName
    });
}
export function addBlackName(blackName) {
    return fetch({
        url: '/api/enwas/black/user/add',
        method: method,
        body: blackName
    });
}

export function updateBlackName(blackName) {
    return fetch({
        url: '/api/enwas/black/user/modify',
        method:method,
        body: blackName
    });
}

export function deleteBlackName(blackName) {
    return fetch({
        url: '/api/enwas/black/user/del',
        method: method,
        body: blackName
    });
}
//检查被删应用是否关联用户组
export function checkDeleteBlackName(blackName) {
    return fetch({
        url: '/api/enwas/black/user/checkDelBlack',
        method: method,
        body: blackName
    });
}
//====================domain===========================
export function getDomain(p) {
    return fetch({
        url: '/api/enwas/black/user/list',
        method: method,
        body: p
    });
}

export function getDomainList(p) {
    return fetch({
        url: '/api/enwas/black/domian/list',
        method: method,
        body: p
    });
}


export function addDomain(domain) {
    return fetch({
        url: '/api/enwas/black/domain/add',
        method: method,
        body: domain
    });
}

export function updateDomain(domain) {
    return fetch({
        url: '/api/enwas/black/domain/modify',
        method:method,
        body: domain
    });
}

export function deleteDomain(domain) {
    return fetch({
        url: '/api/enwas/black/domain/del',
        method: method,
        body: domain
    });
}