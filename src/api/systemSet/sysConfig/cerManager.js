/**
 * Created by Administrator on 2017/8/18.
 */
import { fetch } from 'utils/fetch';

//生成CA证书
export function createCA(param) {
    return fetch ({
        url: '/api/admin/createCA',
        method: 'POST',
        params: param
    })
}
//删除CA证书
export function deleteCA() {
    return fetch({
        url: '/api/admin/deleteCA',
        method: 'POST'
    })
}
//获取CA列表
export  function getCA() {
    return fetch({
        url: '/api/admin/getCA',
        method: 'POST'
    })

}

//生成服务器证书
export function createServerCer(param) {
    return fetch ({
        url: '/api/admin/createServerCER',
        method:'POST',
        params:param
    })
}
//删除服务器证书
export function deleteServerCer() {
    return fetch({
        url: '/api/admin/deleteServerCER',
        method:'POST'
    })
}
//获取服务器证书
export function getServerCer() {
    return fetch({
        url:'/api/admin/getServerCER',
        method:'POST'
    })
}
//获取客户端证书
export function getClientCer(param) {
    return fetch({
        url:'/api/admin/getClientCER',
        method:'POST',
        params:param
    })
}

//生成客户端证书
export function createClientCer(param) {
    return fetch({
        url:'/api/admin/createClientCER',
        method:'POST',
        params:param
    })
}
//删除客户端证书
export function deleteClientCer(param) {
    return fetch({
        url:'/api/admin/deleteClientCER',
        method:'POST',
        params:param
    })
}
