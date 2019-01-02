import { fetch } from 'utils/fetch';

//获取系统参数列表
export function getSystemConfigList(param) {
    return fetch({
        url: '/api/enwas/system/list',
        method: 'POST',
        body:param
    });
}
//添加系统参数配置
export function addSystemConfigList(param) {
    return fetch({
        url: '/api/enwas/system/add',
        method: 'POST',
        body:param
    });
}
//修改系统参数配置
export function modifySystemConfigList(param) {
    return fetch({
        url: '/api/enwas/system/modify',
        method: 'POST',
        body:param
    });
}
//删除系统参数配置
export function deleteSystemConfigList(param) {
    return fetch({
        url: '/api/enwas/system/del',
        method: 'POST',
        body:param
    });
}