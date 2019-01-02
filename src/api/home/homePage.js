import { fetch } from 'utils/fetch';
//获取cpu
export function getCpu() {
    return fetch({
        url: '/api/admin/sysTool/cpu',
        method: 'GET'
    })
}
//获取内存
export function getMem() {
    return fetch({
        url: '/api/admin/sysTool/mem',
        method: 'GET'
    })
}
//获取硬盘
export function getHdd() {
    return fetch({
        url: '/api/admin/sysTool/hdd',
        method: 'GET'
    })
}
//获取用户并发数
export function getTotalUsers() {
    return fetch({
        url: '/api/enwas/iis/list',
        method: 'POST'
    })
}
export function getFlowList() {
    return fetch({
        url: '/logs/api/sysLog/getFlowList',
        method: 'post',
        // body:parm

    });
}