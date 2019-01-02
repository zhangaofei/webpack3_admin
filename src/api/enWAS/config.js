import { fetch } from 'utils/fetch';
let  method = 'post'

// =============================================================
export function getConfigList(config) {
    return fetch({
        url: '/api/enwas/oauth2/list',
        method: method,
        body: config
    });
}

export function addConfig(config) {
    return fetch({
        url: '/api/enwas/oauth2/add',
        method: method,
        body: config
    });
}

export function updateConfig(config) {
    return fetch({
        url: '/api/enwas/oauth2/modify',
        method: method,
        body: config
    });
}

export function deleteConfig(config) {
    return fetch({
        url: '/api/enwas/oauth2/del',
        method: method,
        body: config
    });
}
//检查被删应用是否关联用户组
export function checkDeleteConfig(config) {
    return fetch({
        url: '/api/enwas/oauth2/checkDel',
        method: method,
        body: config
    });
}
export function checkConfig(config) {
    return fetch({
        url: '/api/enwas/oauth2/check',
        method: method,
        body: config
    });
}