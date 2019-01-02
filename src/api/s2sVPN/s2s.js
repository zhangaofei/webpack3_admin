import { fetch } from 'utils/fetch';
//获取s2s列表
export function gets2sList(config) {
    return fetch({
        url: '/api/admin/s2s',
        method: 'GET',
        params: config
    });
}
//新建s2s
export function adds2s(config) {
    return fetch({
        url: '/api/admin/s2s',
        method: 'POST',
        body: config
    });
}
//编辑s2s
export function edits2s(config) {
    return fetch({
        url: '/api/admin/s2s',
        method: 'PUT',
        body: config
    });
}
//删除s2s
export function deletes2s(config) {
    return fetch({
        url: '/api/admin/s2s',
        method: 'DELETE',
        params: config
    });
}
//获取接口列表
export function getInterfaceList() {
    return fetch({
        url: '/api/admin/netInterface/name/all',
        method: 'GET'
    });
}
//获取s2c主列表接口
export function getS2cList(config) {
    return fetch({
        url: '/api/admin/deviceNode',
        method: 'GET',
        params:config
    });
}
//编辑s2c
export function editS2c(config) {
    return fetch({
        url: '/api/admin/deviceNode',
        method: 'PUT',
        body:config
    });
}
//可视化接口
export function VisualS2c(type) {
    return fetch({
        url: '/api/admin/deviceNode/getProvinceNum',
        method: 'GET',
        params:type
    });
}
//获取市站点详细信息
export function getCityMessage() {
    return fetch({
        url: '/api/admin/deviceNode/getAllByCity',
        method: 'GET'
    });
}