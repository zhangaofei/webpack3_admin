import {fetch,post} from 'utils/fetch';
//获取用户的付费账户信息
export function getAccountInfo(param) {
    return fetch({
        url: '/api/admin/charging/account/one',
        method: 'GET',
        params: param
    });
}
//充值退费
export function payOrBackMoney(param) {
    return fetch({
        url: '/api/admin/charging/account/recharge',
        method: 'POST',
        params: param
    });
}
//充值退费明细
export function payOrBackDetail(param) {
    return fetch({
        url: '/api/admin/charging/account/history',
        method: 'GET',
        params: param
    });
}
//套餐明细
export function queryPackageDetail(param) {
    return fetch({
        url: '/api/admin/charging/package/userPackage/detail/user',
        method: 'GET',
        params: param
    });
}
//查询用户可以关闭的套餐列表
export function getCloseList(param) {
    return fetch({
        url: '/api/admin/charging/package/user/close/available',
        method: 'GET',
        params: param
    });
}
//关闭套餐
export function ClosePackage(param) {
    return fetch({
        url: '/api/admin/charging/package/userPackage/close',
        method: 'PUT',
        params: param
    });
}