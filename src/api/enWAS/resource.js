import { fetch } from 'utils/fetch';

let method = 'post'


export function searchResourceList(resource) {
    return fetch({
        url: '/api/enwas/resource/search',
        method: method,
        body: resource
    });
}
export function getResourceList(resource) {
    return fetch({
        url: '/api/enwas/resource/list',
        method: method,
        body: resource
    });
}
/*9.13  qqy*/
export function newResourceList(resource) {
    return fetch({
        url: '/api/admin/enwasResource',
        method: 'get',
        params: resource
    });
}
// api/admin/enwasResource
export function getTypeRellist(resource) {
    return fetch({
        url: '/api/enwas/resource/typeRellist',
        method: method,
        body: resource
    });
}
export function addResource(resource) {
    return fetch({
        url: '/api/enwas/resource/add',
        method: method,
        body: resource
    });
}

export function updateResource(resource) {
    return fetch({
        url: '/api/enwas/resource/modify',
        method: method,
        body: resource
    });
}

export function deleteResource(resource) {
    return fetch({
        url: '/api/enwas/resource/del',
        method: method,
        body: resource
    });
}
//检查被删应用是否关联用户组
export function checkDeleteResource(resource) {
    return fetch({
        url: '/api/enwas/resource/checkDel',
        method: method,
        body: resource
    });
}
export function getTypeList(type) {
    return fetch({
        url: '/api/enwas/type/list',
        method: method,
        body: type
    });
}

export function addType(type) {
    return fetch({
        url: 'api/enwas/type/add',
        method: method,
        body: type
    });
}

export function updateType(type) {
    return fetch({
        url: '/api/enwas/type/modify',
        method: method,
        body: type
    });
}

export function deleteType(type) {
    return fetch({
        url: '/api/enwas/type/del',
        method: method,
        body: type
    });
}

//获取所有应用资源图标列表
export function getAppsIcon(config){
    return fetch({
        url: '/api/admin/apps/icon/getIconsList',
        method: 'get',
        params: config
    });
}