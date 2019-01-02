import {fetch} from 'utils/fetch';

//获取dataSync 列表
export function getDataSyncList(param) {
    return fetch ({
        url: '/api/admin/syncServer',
        method: 'GET',
        params: param
    })
}

//保存dataSync 设置列表
export function saveSyncList(param) {
    return fetch ({
        url: '/api/admin/syncServer',
        method: 'POST',
        body: param
    })
}

//关闭服务
export function closeSync(param) {
    return fetch ({
        url: '/api/admin/syncServer/closeMysqlCluster',
        method: 'GET',
        params: param
    })
}


//重启服务
export function restartSync(param) {
    return fetch ({
        url: '/api/admin/syncServer/mysqlCluster',
        method: 'GET',
        params: param
    })
}









