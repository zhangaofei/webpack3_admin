import {fetch} from 'utils/fetch';

//获取域名访问统计列表
export function getDomainVisitList(param) {
    return fetch ({
        url: '/api/dns/dnsDomainVisit/all',
        method: 'GET',
        params: param
    })
}
//获取详细域名访问统计
export function getDetailDomainVisit(param) {
    return fetch ({
        url: '/api/dns/dnsDomainVisit/detail',
        method: 'GET',
        params: param
    })
}
//获取IP访问统计列表
export function getIPVisitList(param) {
    return fetch ({
        url: '/api/dns/dnsIpSource/all',
        method: 'GET',
        params: param
    })
}
//获取详细IP访问统计
export function getDetailIPVisit(param) {
    return fetch ({
        url: '/api/dns/dnsIpSource/detail',
        method: 'GET',
        params: param
    })
}