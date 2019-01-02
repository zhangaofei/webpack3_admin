import {fetch} from 'utils/fetch';

//获取ipsec 列表(分页)
export function getIpsecList(param) {
    return fetch ({
        url: '/api/admin/ipsec',
        method: 'GET',
        params: param
    })
}


//批量删除ipsec 
export function deleteIpsec(ipsec) {
    return fetch ({
        url: '/api/admin/ipsec',
        method: 'DELETE',
        params: ipsec
    })
}
//新建ipsec 
export function addIpsec(ipsec) {
    return fetch ({
        url: '/api/admin/ipsec',
        method: 'POST',
        body: ipsec
    })
}

//编辑ipsec 
export function updateIpsec(ipsec) {
    return fetch ({
        url: '/api/admin/ipsec',
        method: 'PUT',
        body: ipsec
    })
}


//验证ipsec 名称是否已存在
export function isNameExist(param) {
    return fetch ({
        url: '/api/admin/ipsec/name/exist',
        method: 'GET',
        params: param
    })
}

//启动或者停止某条隧道
export function setIpsecStatus(param) {
    return fetch ({
        url: '/api/admin/ipsec/status',
        method: 'PUT',
        params: param
    })
}

//获取ipsec 隧道信息详情
export function getIpsecInfo(param) {
    return fetch ({
        url: '/api/admin/ipsec/connection/detail',
        method: 'GET',
        params: param
    })
}



//获取ipsec 日志信息
export function getIpsecDairy(param) {
    return fetch ({
        url: '/api/admin/ipsec/dairy',
        method: 'GET',
        params: param
    })
}



//获取带有ip地址的 接口列表
export function getEthWithIp(param) {
    return fetch ({
        url: '/api/admin/netInterface/entityNet/list',
        method: 'GET',
        params: param
    })
}

//获取本地私钥 文件名列表
export function getPrivateList(param) {
    return fetch ({
        url: '/api/admin/ipsec/privatelist',
        method: 'GET',
        params: param
    })
}

//获取根证书 文件名列表
export function getRootCertList(param) {
    return fetch ({
        url: '/api/admin/ipsec/rootcertlist',
        method: 'GET',
        params: param
    })
}

//获取本地/远程证书 文件名列表
export function getCertList(param) {
    return fetch ({
        url: '/api/admin/ipsec/certlist',
        method: 'GET',
        params: param
    })
}






