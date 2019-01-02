import {fetch,post} from 'utils/fetch';
//获取套餐列表
export function getPackageList(param) {
    return fetch({
        url: '/api/admin/charging/package',
        method: 'GET',
        params: param
    });
}
//新建
export function addPackage(param1, param2) {
    return fetch({
        url: '/api/admin/charging/package',
        method: 'POST',
        params: param1,
        body:param2
    });
}
//编辑
export function editPackage(param1, param2) {
    return fetch({
        url: '/api/admin/charging/package',
        method: 'PUT',
        params: param1,
        body:param2
    });
}
//获取使用了某一个套餐的用户组
export function getPackageGroup(param) {
    return fetch({
        url: '/api/admin/group/package',
        method: 'GET',
        params: param
    });
}
//删除
export function deletePackage(param) {
    return fetch({
        url: '/api/admin/charging/package',
        method: 'DELETE',
        params: param
    });
}
//套餐明细
export function PackageDetail(param) {
    return fetch({
        url: '/api/admin/charging/package/userPackage/detail',
        method: 'GET',
        params: param
    });
}
//总体报表
export function allReport(param) {
    return fetch({
        url: '/api/admin/charging/package/userPackage/report/all',
        method: 'GET',
        params: param
    });
}
//套餐报表
export function packageReport(param) {
    return fetch({
        url: '/api/admin/charging/package/userPackage/report/category',
        method: 'GET',
        params: param
    });
}
//套餐明细(总体报表)
export function allReportDetail(param) {
    return fetch({
        url: '/api/admin/charging/package/userPackage/detail/day',
        method: 'GET',
        params: param
    });
}
//套餐明细(套餐报表)
export function packageReportDetail(param) {
    return fetch({
        url: '/api/admin/charging/package/userPackage/detail/package',
        method: 'GET',
        params: param
    });
}
//导出所有套餐报表
export function downloadAllPackageReport(param) {
    return fetch({
        url: '/api/admin/charging/package/userPackage/report/all/download',
        method: 'GET',
        params: param
    });
}
//按套餐类别导出报表
export function downloadPackageReport(param) {
    return fetch({
        url: '/api/admin/charging/package/userPackage/report/category/download',
        method: 'GET',
        params: param
    });
}