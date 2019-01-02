import {fetch} from 'utils/fetch';

//重启redns服务
export function restartRedns() {
    return fetch ({
        url: '/api/dns/redns',
        method: 'GET'
    })
}

//获取域名 列表(分页)
export function getDomainList(param) {
    return fetch ({
        url: '/api/dns/dnsDomain',
        method: 'GET',
        params: param
    })
}

//获取别名 列表(分页)
export function getBynameList(param) {
    return fetch ({
        url: '/api/admin/tobedefined',
        method: 'GET',
        params: param
    })
}

//批量删除域名
export function deleteDomain(param) {
    return fetch ({
        url: '/api/dns/dnsDomain',
        method: 'DELETE',
        params: param
    })
}
//新建域名
export function addDomain(param) {
    return fetch ({
        url: '/api/dns/dnsDomain',
        method: 'POST',
        body:param
    })
}

//编辑域名
export function updateDomain(param) {
    return fetch ({
        url: '/api/dns/dnsDomain',
        method: 'PUT',
        body: param
    })
}

//启动或者停止智能解析
export function setAutoAnalyzeStatus(param) {
    return fetch ({
        url: '/api/dns/dnsDomain/parseType/batch',
        method: 'PUT',
        params: param
    })
}
//开启或关闭状态
export function stopAnalyze(param) {
    return fetch ({
        url: '/api/dns/dnsDomain/stop',
        method: 'PUT',
        params: param
    })
}
//域名导出
export function exportDomain(param) {
    return fetch ({
        url: '/api/dns/dnsRecord/download',
        method: 'GET',
        params: param
    })
}
//模板下载
export function downloadModel(param) {
    return fetch ({
        url: '/api/dns/dnsRecord/templet',
        method: 'GET',
        params: param
    })
}
//==================record部分===========================

//获取记录 列表(分页)
export function getRecordListForAll(param1, param2) {
    return fetch ({
        url: '/api/dns/dnsRecord/getRecordList',
        method: 'POST',
        params: param1,
        body: param2
    })
}

//获取某域名下的记录 列表(分页)
export function getRecordList(param) {
    return fetch ({
        url: '/api/dns/dnsRecord',
        method: 'GET',
        params: param
    })
}
//获取记录 列表(分页)  带查询条件对象
export function queryRecord(param) {
    return fetch ({
        url: '/api/admin/tobedefined',
        method: 'GET',
        params: param
    })
}

//获取域名名称列表 供选择
export function getDomainNameList(param) {
    return fetch ({
        url: '/api/dns/dnsDomain/all',
        method: 'GET',
        params: param
    })
}

//获取线路名称列表 供选择
export function getLineNameList(param) {
    return fetch ({
        url: '/api/dns/dnsLine/all',
        method: 'GET',
        params: param
    })
}


//批量删除记录
export function deleteRecord(param) {
    return fetch ({
        url: '/api/dns/dnsRecord',
        method: 'DELETE',
        params: param
    })
}
//新建记录
export function addRecord(param) {
    return fetch ({
        url: '/api/dns/dnsRecord',
        method: 'POST',
        body:param
    })
}

//编辑记录
export function updateRecord(param) {
    return fetch ({
        url: '/api/dns/dnsRecord',
        method: 'PUT',
        body: param
    })
}


//新建备注
export function addRemark(param) {
    return fetch ({
        url: '/api/admin/remark',
        method: 'POST',
        body:param
    })
}

//获取记录备注 列表(分页)
export function getRemarkList(param) {
    return fetch ({
        url: '/api/admin/tobedefined',
        method: 'GET',
        params: param
    })
}

//设置域名 启动/停止
export function setDomainStatus(param) {
    return fetch ({
        url: '/api/admin/tobedefined',
        method: 'PUT',
        params: param
    })
}

//设置记录 启动/停止
export function setRecordStatus(param) {
    return fetch ({
        url: '/api/admin/tobedefined',
        method: 'PUT',
        params: param
    })
}

//===================安全配置====================
//获取同域名下不同记录值的记录权重列表 用以设置轮询优先级
export function getPollingList(param) {
    return fetch ({
        url: '/api/dns/dnsRecord/recordPolling',
        method: 'GET',
        params: param
    })
}

//设置轮询优先级
export function changeWeight(param) {
    return fetch ({
        url: '/api/admin/tobedefined',
        method: 'PUT',
        params: param
    })
}

//保存轮询设置
export function saveLunxunConfig(param) {
    return fetch ({
        url: '/api/dns/dnsRecord/recordPolling',
        method: 'POST',
        body: param
    })
}

//开启或关闭状态
export function stopRecordAnalyze(param) {
    return fetch ({
        url: '/api/dns/dnsRecord/stop',
        method: 'PUT',
        params: param
    })
}
//安全设置线路下拉列表
export function getLineListForSecurity(param) {
    return fetch ({
        url: '/api/dns/dnsRecord/jumpLine',
        method: 'GET',
        params: param
    })
}



