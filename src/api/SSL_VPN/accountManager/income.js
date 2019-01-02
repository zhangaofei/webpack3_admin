import {fetch,post} from 'utils/fetch';
//总体收支报表
export function getTotalChargeReport(param) {
    return fetch({
        url: '/api/admin/charging/report/normal',
        method: 'GET',
        params: param
    });
}
//支付方式收支报表
export function getChargewayReport(param) {
    return fetch({
        url: '/api/admin/charging/report/chargeWay',
        method: 'GET',
        params: param
    });
}
//管理员收支报表
export function getAdminChargeReport(param) {
    return fetch({
        url: '/api/admin/charging/report/admin',
        method: 'GET',
        params: param
    });
}
//总体收支报表明细
export function TotalReportDetail(param) {
    return fetch({
        url: '/api/admin/charging/account/history/day',
        method: 'GET',
        params: param
    });
}
//管理员收支报表明细
export function adminReportDetail(param) {
    return fetch({
        url: '/api/admin/charging/account/history/admin',
        method: 'GET',
        params: param
    });
}
//支付方式收支报表明细
export function chargewayReportDetail(param) {
    return fetch({
        url: '/api/admin/charging/account/history/chargeWay',
        method: 'GET',
        params: param
    });
}
//支付明细
export function chargeDetail(param) {
    return fetch({
        url: '/api/admin/charging/account/history/detail',
        method: 'GET',
        params: param
    });
}
//收支报表(历史总计)
export function historyTotal(param) {
    return fetch({
        url: '/api/admin/charging/report/history/total',
        method: 'GET',
        params: param
    });
}
//收支报表下载(总体)
export function totalReportDownload(param) {
    return fetch({
        url: '/api/admin/charging/report/normal/download',
        method: 'GET',
        params: param
    });
}
//收支报表下载(管理员)
export function adminReportDownload(param) {
    return fetch({
        url: '/api/admin/charging/report/admin/download',
        method: 'GET',
        params: param
    });
}
//收支报表下载(支付方式)
export function chargewayReportDownload(param) {
    return fetch({
        url: '/api/admin/charging/report/chargeWay/download',
        method: 'GET',
        params: param
    });
}