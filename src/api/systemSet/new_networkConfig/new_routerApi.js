/**
 * Created by stone on 2017/8/31.
 */
import {fetch} from 'utils/fetch';

//        ---------策略路由---------
//获取策略路由
export function getPolRoutesList(currentPage,pageSize) {
    return fetch ({
        url: '/api/admin/route/policy',
        method: 'get',
        params: {
            'currentPage':currentPage,
            'pageSize':pageSize
        }
    })
}

//新建策略路由
export function addPolRoutes(polInfo) {
    return fetch ({
        url: '/api/admin/route/policy',
        method: 'post',
        body:polInfo
    })
}

//删除策略路由
export function delPolRoutes(id) {
    return fetch ({
        url: '/api/admin/route/policy',
        method: 'DELETE',
        params:{
            'ids':id
        }
    })
}

//获取所有物理接口和虚拟接口
export function getAllNetNameList() {
    return fetch ({
        url: '/api/admin/netInterface/name/all',
        method: 'get'
    })
}

//        ---------静态路由---------

//获取静态路由列表
export function getStaRoutesList(currentPage,pageSize) {
    return fetch ({
        url: '/api/admin/route/static',
        method: 'get',
        params: {
            'currentPage':currentPage,
            'pageSize':pageSize
        }
    })
}

//删除静态路由
export function delStaRoutes(staticInfo) {
    return fetch ({
        url: '/api/admin/route/static',
        method: 'DELETE',
        body:staticInfo
    })
}

//新增静态路由
export function addStaRoutes(staticInfo) {
    return fetch ({
        url: '/api/admin/route/static',
        method: 'post',
        body:staticInfo
    })
}



