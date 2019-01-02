import {fetch} from 'utils/fetch';

//添加资源转发
export function addResourceTransmit(param) {
    return fetch ({
        url: '/api/dns/enwasResource',
        method: 'POST',
        body: param
    })
}

//获取资源转发列表
export function getResourceTransmit(param) {
    return fetch ({
        url: '/api/dns/enwasResource',
        method: 'GET',
        params: param
    })
}
//删除资源转发
export function deleteResourceTransmit(param) {
    return fetch ({
        url: '/api/dns/enwasResource',
        method: 'DELETE',
        params: param
    })
}
//获取监听设备列表
export function getMonitorDevice(param) {
    return fetch ({
        url: '/api/dns/deviceResource',
        method: 'GET',
        params: param
    })
}
//改变监听设备启用状态
export function changeDeviceStatus(param) {
    return fetch ({
        url: '/api/dns/deviceResource/status',
        method: 'PUT',
        body: param
    })
}