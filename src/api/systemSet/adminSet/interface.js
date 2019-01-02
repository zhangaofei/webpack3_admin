import { fetch } from 'utils/fetch';
//获取api列表
export function getApiList() {
    return fetch({
        url: '/api/enwas/pg/gateway/api/list',
        method: 'get'
    });
}
//添加API
export function addApi(info) {
    return fetch({
        url: '/api/enwas/pg/gateway/api/add',
        method: 'get',
        params: info
    });
}
//编辑api
export function editApi(info) {
    return fetch({
        url: '/api/enwas/pg/gateway/api/modify',
        method: 'get',
        params: info
    });
}
//删除api
export function deleteApi(id) {
    return fetch({
        url: '/api/enwas/pg/gateway/api/del',
        method: 'post',
        body: id
    });
}

