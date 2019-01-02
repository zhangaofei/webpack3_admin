import {fetch} from 'utils/fetch';

//获取区域统计图
export function getRegionStatic(param) {
    return fetch ({
        url: '/api/dns/dnsAreaMonitor/areaPie',
        method: 'GET',
        params: param
    })
}

//获取区域地图
export function getRegionMap(param) {
    return fetch ({
        url: '/api/dns/dnsAreaMonitor/areaMap',
        method: 'GET',
        params: param
    })
}

//获取域名统计图
export function getDomainStatic(param) {
    return fetch ({
        url: '/api/dns/dnsDomainMonitor',
        method: 'GET',
        params: param
    })
}

//获取线路统计图
export function getLineStatic(param) {
    return fetch ({
        url: '/api/dns/dnsLineMonitor',
        method: 'GET',
        params: param
    })
}

//获取类型统计图
export function getTypeStatic(param) {
    return fetch ({
        url: '/api/dns/dnsTypeMonitor',
        method: 'GET',
        params: param
    })
}

//获取查询统计图
export function getQueryStatic(param) {
    return fetch ({
        url: '/api/dns/queryMonitor',
        method: 'GET',
        params: param
    })
}
//获取服务器时间
export function getServerTime(param) {
    return fetch ({
        url: '/api/dns/dnsArea/getCurrentTime',
        method: 'GET',
        params: param
    })
}