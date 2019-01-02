/**
 * Created by zaf on 2017/8/2.
 */
import {fetch} from 'utils/fetch';

//        ---------静态路由---------
export function getStaRoutesList(param) {
    return fetch ({
        url: '/api/admin/getStaticRoutesList',
        // method: 'POST',
        method: 'get',
        params: param
    })
}

export function addStaRoutes(ipType,staticRouteList) {
    return fetch ({
        url: '/api/admin/editStaticRoutes',
        // method: 'POST',
        method: 'post',
        params: {
            ipType:ipType
        },
        body:staticRouteList
    })
}
export function editStaRoutes(ipType,staticRouteList) {
    return fetch ({
        url: '/api/admin/editStaticRoutes',
        // method: 'POST',
        method: 'post',
        params: {
            ipType:ipType
        },
        body:staticRouteList
    })
}
export function delStaRoutes(staticRouteList) {
    return fetch ({
        url: '/api/admin/deleteStaticRoutes',
        // method: 'POST',
        method: 'post',
        // params: {
        //     ipType:ipType
        // },
        body:staticRouteList
    })
}
//        ---------策略路由---------
export function getPolRoutesList(param) {
    return fetch ({
        url: '/api/admin/getPolicyRoutes',
        method: 'get',
        params: param
    })
}
//获取去接口名
export function getEntityNetName(param) {
    return fetch ({
        url: '/api/admin/getNetNameList',
        method: 'get',
        params: param
    })
}
export function addPolRoutes(iptype,polRouteList) {
    return fetch ({
        url: '/api/admin/createPolicyRoutes',
        method: 'post',
        params:{
            ipType:iptype
        },
        body:polRouteList
    })
}
export function editPolRoutes(params) {
    return fetch ({
        url: '/api/admin/editPolicyRoutes',
        method: 'post',
        params: params
        // body:polRouteList
    })
}
export function delPolRoutes( params) {
    return fetch ({
        url: '/api/admin/deletePolicyRoutes',
        method: 'post',
        params:  params

    })
}
