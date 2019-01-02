import {fetch} from 'utils/fetch';

//获取线路 列表(分页)
export function getLineList(param) {
    return fetch ({
        url: '/api/dns/dnsLine',
        method: 'GET',
        params: param
    })
}

//批量删除线路
export function deleteLine(param) {
    return fetch ({
        url: '/api/dns/dnsLine',
        method: 'DELETE',
        params: param
    })
}
//新建线路
export function addLine(param) {
    return fetch ({
        url: '/api/dns/dnsLine',
        method: 'POST',
        body:param
    })
}

//编辑线路
export function updateLine(param) {
    return fetch ({
        url: '/api/dns/dnsLine',
        method: 'PUT',
        body: param
    })
}


//验证线路是否已存在
export function isLineNameExist(param) {
    return fetch ({
        url: '/api/admin/tobedefined/name/exist',
        method: 'GET',
        params: param
    })
}
//上移或下移
export function upOrDown(param) {
    return fetch ({
        url: '/api/dns/dnsLine/shiftLine',
        method: 'PUT',
        params: param
    })
}
//清空线路内IP数量

export function cleanIpCount(param) {
    return fetch ({
        url: '/api/dns/dnsLine/clear',
        method: 'PUT',
        params: param
    })
}
//开启或关闭启用状态
export function stopLineStatus(param) {
    return fetch ({
        url: '/api/dns/dnsLine/stop',
        method: 'PUT',
        params: param
    })
}

//=====================地址=========================



//获取地址 列表(分页)
export function getAddressList(param) {
    return fetch ({
        url: '/api/dns/dnsIpRange',
        method: 'GET',
        params: param
    })
}

//批量删除地址
export function deleteAddress(param) {
    return fetch ({
        url: '/api/dns/dnsIpRange',
        method: 'DELETE',
        params: param
    })
}
//新建地址
export function addAddress(param) {
    return fetch ({
        url: '/api/dns/dnsIpRange',
        method: 'POST',
        body:param
    })
}

//编辑地址
export function updateAddress(param) {
    return fetch ({
        url: '/api/dns/dnsIpRange',
        method: 'PUT',
        body: param
    })
}


//验证地址是否已存在
export function isAddressNameExist(param) {
    return fetch ({
        url: '/api/admin/tobedefined/name/exist',
        method: 'GET',
        params: param
    })
}


//改变地址段屏蔽状态
export function setAddressShieldStatus(param) {
    return fetch ({
        url: '/api/dns/dnsIpRange/shield',
        method: 'PUT',
        params: param
    })
}

//获取线路列表 供选择
export function getLineNameList(param) {
    return fetch ({
        // url: '/api/dns/dnsLine/all',
        url: '/api/dns/dnsLine/notUserDefine',
        method: 'GET',
        params: param
    })
}

//获取区域列表 供选择
export function getRegionNameList(param) {
    return fetch ({
        url: '/api/dns/dnsArea/all',
        method: 'GET',
        params: param
    })
}

//开启或关闭状态
export function stopLineAnalyze(param) {
    return fetch ({
        url: '/api/dns/dnsIpRange/stop',
        method: 'PUT',
        params: param
    })
}


//=====================地址池=========================

//获取地址池 列表(分页)
export function getPoolList(param) {
    return fetch ({
        url: '/api/dns/dnsLinePool',
        method: 'GET',
        params: param
    })
}
//获取地址池列表(供选择)
export function getPoolListAll(param) {
    return fetch ({
        url: '/api/dns/dnsLinePool/all',
        method: 'GET',
        params: param
    })
}


//批量删除地址池
export function deletePool(param) {
    return fetch ({
        url: '/api/dns/dnsLinePool',
        method: 'DELETE',
        params: param
    })
}
//新建地址池
export function addPool(param) {
    return fetch ({
        url: '/api/dns/dnsLinePool',
        method: 'POST',
        body:param
    })
}

//编辑地址池
export function updatePool(param) {
    return fetch ({
        url: '/api/dns/dnsLinePool',
        method: 'PUT',
        body: param
    })
}